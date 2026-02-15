"use client";

import { useState, useEffect, useRef } from "react";
import * as Kanban from "@/components/ui/kanban";
import { Badge } from "@/components/ui/badge";
import { DeleteTaskButton } from "./modals/delete-task";
import { updateTask } from "@/api";
import { toast } from "@/hooks/use-toast";
import type { Task } from "@/types/task";
import Container from "@/components/global/container";

// kanban columns are keyed by task status
type Status = "NEW" | "INPROGRESS" | "DELAYED" | "COMPLETED";
type Columns = Record<Status, Task[]>;

const COLUMN_ORDER: Status[] = ["NEW", "INPROGRESS", "DELAYED", "COMPLETED"];
const EMPTY_COLUMNS: Columns = { NEW: [], INPROGRESS: [], DELAYED: [], COMPLETED: [] };

// badge color per priority for task cards.
const PRIORITY_VARIANT: Record<string, "destructive" | "default" | "secondary"> = {
  HIGH: "destructive",
  MEDIUM: "default",
  LOW: "secondary",
};

// splits a flat task list into columns by status.
function groupTasksByStatus(tasks: Task[]): Columns {
  const out = { ...EMPTY_COLUMNS };
  for (const key of COLUMN_ORDER) {
    out[key] = [];
  }
  for (const task of tasks) {
    const status = COLUMN_ORDER.includes(task.status as Status) ? (task.status as Status) : "NEW";
    out[status].push(task);
  }
  return out;
}

interface KanbanRenderProps {
  tasks: Task[];
}

// renders the kanban board for a given list of tasks.
export default function KanbanRender({ tasks }: KanbanRenderProps) {
  const [columns, setColumns] = useState<Columns>(() => groupTasksByStatus(tasks));
  const [completedTaskId, setCompletedTaskId] = useState<string | null>(null);
  const [completedTask, setCompletedTask] = useState<Task | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [columnHeight, setColumnHeight] = useState<number>(500);

  // rebuild columns whenever the incoming tasks list changes.
  useEffect(() => {
    setColumns(groupTasksByStatus(tasks));
  }, [tasks]);

  // Calculate column height based on viewport
  useEffect(() => {
    const calculateHeight = () => {
      if (boardRef.current) {
        const viewportHeight = window.innerHeight;
        const boardTop = boardRef.current.getBoundingClientRect().top;
        // Subtract padding and header space (approx 200px for header, margins, etc.)
        const availableHeight = viewportHeight - boardTop - 100;
        setColumnHeight(Math.max(400, availableHeight)); // Minimum 400px
      }
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  // Handle toast for completed tasks in a useEffect to avoid rendering issues
  useEffect(() => {
    if (completedTask) {
      toast({
        variant: "success",
        title: "Task Completed!",
        description: "You can now find it in your archive.",
        duration: 5000,
      });
      setCompletedTask(null);
    }
  }, [completedTask]);

  // when a card is moved to another column, persist the new status to the API.
  const onColumnsChange = (next: Record<string, Task[]>) => {
    const nextCols: Columns = {
      NEW: next.NEW ?? [],
      INPROGRESS: next.INPROGRESS ?? [],
      DELAYED: next.DELAYED ?? [],
      COMPLETED: next.COMPLETED ?? [],
    };
    
    setColumns((prev) => {
      // Find which tasks were moved to COMPLETED
      for (const task of nextCols.COMPLETED) {
        const wasNotInCompleted = !prev.COMPLETED.some((t: Task) => t.id === task.id);
        if (wasNotInCompleted) {
          // This task was just moved to COMPLETED
          setCompletedTaskId(task.id.toString());
          setCompletedTask(task); // This will trigger the toast in useEffect
          
          // Update the task status in the API
          updateTask(task.id, { status: "COMPLETED" }).catch((err) => {
            console.error(err);
            toast({ 
              title: "Error updating task", 
              description: "Failed to update task status.", 
              variant: "destructive", 
              duration: 5000 
            });
          });

          // Remove the task after animation
          setTimeout(() => {
            setCompletedTaskId(null);
          }, 200);
        }
      }

      // Handle regular status updates for other columns
      for (const status of COLUMN_ORDER.filter(s => s !== "COMPLETED")) {
        for (const task of nextCols[status]) {
          const oldStatus = COLUMN_ORDER.find((s) => prev[s].some((t: Task) => t.id === task.id));
          if (oldStatus && oldStatus !== status) {
            updateTask(task.id, { status }).catch((err) => {
              console.error(err);
              toast({ 
                title: "Error updating task", 
                description: "Failed to update task status.", 
                variant: "destructive", 
                duration: 5000 
              });
            });
          }
        }
      }

      // Filter out completed tasks from the COMPLETED column
      return {
        NEW: nextCols.NEW,
        INPROGRESS: nextCols.INPROGRESS,
        DELAYED: nextCols.DELAYED,
        COMPLETED: [], // Always keep COMPLETED column empty
      };
    });
  };

  return (
    <div ref={boardRef}>
      {/* draggable board: columns = status; moving a card updates task status on the server. */}
      <Kanban.Root value={columns} onValueChange={onColumnsChange} getItemValue={(item) => item.id.toString()}>
        <Kanban.Board className="grid auto-rows-fr sm:grid-cols-4 gap-6 sm:gap-4">
          {COLUMN_ORDER.map((columnValue) => {
            const tasks = columns[columnValue] ?? [];
            
            // Don't show any tasks in COMPLETED column
            if (columnValue === "COMPLETED") {
              return (
                <Kanban.Column key={columnValue} value={columnValue}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{columnValue}</h3>
                      <Badge variant="secondary" className="pointer-events-none rounded-sm text-muted-foreground">
                        0
                      </Badge>
                    </div>
                  </div>
                  <div 
                    className="flex flex-col border-2 border-dashed rounded-lg"
                    style={{ height: `${columnHeight}px` }}
                  >
                    {/* Empty state message that fills the entire column */}
                    <div className="flex-1 flex items-center justify-center p-4">
                      <p className="text-sm text-muted-foreground text-center">
                        Drop tasks here to mark them as completed.
                      </p>
                    </div>
                  </div>
                </Kanban.Column>
              );
            }
            
            // Show tasks in other columns
            return (
              <Kanban.Column key={columnValue} value={columnValue}>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{columnValue}</h3>
                    <Badge variant="secondary" className="pointer-events-none rounded-sm text-muted-foreground">
                      {tasks.length}
                    </Badge>
                  </div>
                </div>
                <div 
                  className="overflow-y-auto pr-1"
                  style={{ height: `${columnHeight}px` }}
                >
                  <div className="flex flex-col gap-2">
                    {tasks.map((task) => (
                      <Kanban.Item key={task.id} value={task.id.toString()} asChild>
                        <div className="bg-card rounded-md border p-3 shadow-xs transition-shadow hover:shadow-sm">
                          {completedTaskId === task.id.toString() ? (
                            <Container animation="fadeIn" className="w-full">
                              <div className="flex flex-col gap-2">
                                <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                                  <span className="line-clamp-2 flex-1 text-sm font-medium">{task.title}</span>
                                  <Badge variant={PRIORITY_VARIANT[task.priority] ?? "default"} className="h-5 shrink-0 rounded-sm px-1.5 text-[11px] pointer-events-none">
                                    {task.priority}
                                  </Badge>
                                </div>
                                {task.description && (
                                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{task.description}</p>
                                )}
                              </div>
                            </Container>
                          ) : (
                            <div className="flex flex-col ">
                              <Kanban.ItemHandle asChild>
                                <div className="flex flex-col gap-1 pb-2">
                                  <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                                    <span className="line-clamp-2 flex-1 text-sm font-medium">{task.title}</span>
                                    <Badge variant={PRIORITY_VARIANT[task.priority] ?? "default"} className="h-5 shrink-0 rounded-sm px-1.5 text-[11px] pointer-events-none">
                                      {task.priority}
                                    </Badge>
                                  </div>
                                  {task.description && (
                                    <p className="mt-1 line-clamp-8 text-xs text-muted-foreground">{task.description}</p>
                                  )}
                                </div>
                              </Kanban.ItemHandle>
                              <div className="flex items-center justify-between text-xs">
                                <Kanban.ItemHandle asChild>
                                  <span className="flex-1 text-muted-foreground">
                                    Created: {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                  </span>
                                </Kanban.ItemHandle>
                                <DeleteTaskButton
                                  taskId={task.id}
                                  taskTitle={task.title}
                                  onDeleted={(id: number) => {
                                    setColumns((prev) => {
                                      const out = { ...prev };
                                      for (const status of COLUMN_ORDER) {
                                        out[status] = prev[status].filter(
                                          (t) => t.id !== id
                                        );
                                      }
                                      return out;
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </Kanban.Item>
                    ))}
                  </div>
                </div>
              </Kanban.Column>
            );
          })}
        </Kanban.Board>
        <Kanban.Overlay>
          <div className="bg-primary/10 size-full rounded-md border-2 border-primary/20" />
        </Kanban.Overlay>
      </Kanban.Root>
    </div>
  );
}