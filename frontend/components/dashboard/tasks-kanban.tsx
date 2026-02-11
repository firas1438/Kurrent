"use client";

import { useState, useEffect } from "react";
import * as Kanban from "@/components/ui/kanban";
import { Badge } from "@/components/ui/badge";
import { DeleteTaskButton } from "./modals/delete-task";
import { Spinner } from "@/components/ui/spinner";
import { getTasks, updateTask } from "@/api";
import { toast } from "@/hooks/use-toast";
import type { Task } from "@/types/task";

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
  refreshTrigger?: number;
}

export default function KanbanRender({ refreshTrigger = 0 }: KanbanRenderProps) {
  const [columns, setColumns] = useState<Columns>(() => groupTasksByStatus([]));
  const [loading, setLoading] = useState(true);

  // load all tasks on mount and when refreshTrigger changes (e.g. after creating a task).
  useEffect(() => {
    let cancelled = false;
    getTasks()
      .then((res) => {
        if (!cancelled) setColumns(groupTasksByStatus(res.data));
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err);
          toast({ title: "Error fetching tasks", description: "There was an error while trying to fetch your tasks.", variant: "destructive", duration: 7000, });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshTrigger]);

  // when a card is moved to another column, persist the new status to the API.
  const onColumnsChange = (next: Record<string, Task[]>) => {
    const nextCols: Columns = {
      NEW: next.NEW ?? [],
      INPROGRESS: next.INPROGRESS ?? [],
      DELAYED: next.DELAYED ?? [],
      COMPLETED: next.COMPLETED ?? [],
    };
    setColumns((prev) => {
      for (const status of COLUMN_ORDER) {
        for (const task of nextCols[status]) {
          const oldStatus = COLUMN_ORDER.find((s) => prev[s].some((t: Task) => t.id === task.id));
          if (oldStatus !== status) {
            updateTask(task.id, { status }).catch((err) => {
              console.error(err);
              toast({ title: "Error updating task", description: "Failed to update task status.", variant: "destructive", duration: 5000 });
            });
          }
        }
      }
      return nextCols;
    });
  };

  // show spinner while tasks are loading.
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <Spinner className="size-12 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* draggable board: columns = status; moving a card updates task status on the server. */}
      <Kanban.Root value={columns} onValueChange={onColumnsChange} getItemValue={(item) => item.id.toString()}>
        <Kanban.Board className="grid auto-rows-fr sm:grid-cols-4 gap-6 sm:gap-4">
          {COLUMN_ORDER.map((columnValue) => {
            const tasks = columns[columnValue] ?? [];
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
                <div className="flex flex-col gap-2 p-0.5">
                  {tasks.map((task) => (
                    <Kanban.Item key={task.id} value={task.id.toString()} asChild>
                      <div className="bg-card rounded-md border p-3 shadow-xs transition-shadow hover:shadow-sm">
                        <div className="flex flex-col gap-2">
                          <Kanban.ItemHandle asChild>
                            <div className="flex flex-col gap-1">
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
                      </div>
                    </Kanban.Item>
                  ))}
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
