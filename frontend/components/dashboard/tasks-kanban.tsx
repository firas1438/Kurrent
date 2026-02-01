"use client";

import * as React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import * as Kanban from "@/components/ui/kanban";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: "NEW" | "INPROGRESS" | "DELAYED" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  userId: number;
  createdAt: string; // ISO date string
}


const PRIORITY_COLORS: Record<string, "destructive" | "default" | "secondary"> = {
  "HIGH": "destructive",
  "MEDIUM": "default",
  "LOW": "secondary"
};

export default function KanbanRender() {
  const [columns, setColumns] = React.useState<Record<string, Task[]>>({
    "new": [
      {
        id: 1,
        title: "Setup Kubernetes cluster",
        description: "Deploy and configure Kubernetes for the task platform",
        status: "NEW",
        priority: "HIGH",
        userId: 1,
        createdAt: "2024-03-25T10:30:00Z"
      },
      {
        id: 2,
        title: "Implement user authentication",
        description: "Add JWT-based authentication with refresh tokens",
        status: "NEW",
        priority: "HIGH",
        userId: 1,
        createdAt: "2024-03-26T14:20:00Z"
      },
      {
        id: 3,
        title: "Design database schema",
        description: "Create Prisma schema for tasks and users",
        status: "NEW",
        priority: "MEDIUM",
        userId: 1,
        createdAt: "2024-03-27T09:15:00Z"
      }
    ],
    "inProgress": [
      {
        id: 4,
        title: "Build task API endpoints",
        description: "Create CRUD endpoints for task management",
        status: "INPROGRESS",
        priority: "HIGH",
        userId: 1,
        createdAt: "2024-03-20T11:45:00Z"
      },
      {
        id: 5,
        title: "Set up CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing and deployment",
        status: "INPROGRESS",
        priority: "MEDIUM",
        userId: 1,
        createdAt: "2024-03-22T16:30:00Z"
      }
    ],
    "delayed": [
      {
        id: 6,
        title: "Implement monitoring with Prometheus",
        description: "Set up metrics collection and dashboards",
        status: "DELAYED",
        priority: "MEDIUM",
        userId: 1,
        createdAt: "2024-03-15T13:00:00Z"
      }
    ],
    "completed": [
      {
        id: 7,
        title: "Initialize project structure",
        description: "Set up monorepo with backend and frontend",
        status: "COMPLETED",
        priority: "LOW",
        userId: 1,
        createdAt: "2024-03-10T08:00:00Z"
      },
      {
        id: 8,
        title: "Configure Docker containers",
        description: "Create Dockerfiles for all services",
        status: "COMPLETED",
        priority: "MEDIUM",
        userId: 1,
        createdAt: "2024-03-12T15:45:00Z"
      },
      {
        id: 9,
        title: "Set up Terraform for AWS",
        description: "Create infrastructure as code for cloud deployment.",
        status: "COMPLETED",
        priority: "HIGH",
        userId: 1,
        createdAt: "2024-03-18T12:30:00Z"
      }
    ]
  });

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div>
      <Kanban.Root value={columns} onValueChange={setColumns} getItemValue={(item) => item.id.toString()}>
        <Kanban.Board className="grid auto-rows-fr sm:grid-cols-4">
          {Object.entries(columns).map(([columnValue, tasks]) => (
            <Kanban.Column key={columnValue} value={columnValue}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    {columnValue}
                  </h3>
                  <Badge variant="secondary" className="pointer-events-none rounded-sm text-muted-foreground">
                    {tasks.length}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-0.5">
                {tasks.map((task) => (
                  <Kanban.Item key={task.id} value={task.id.toString()} asChild>
                    <div className="bg-card rounded-md border p-3 shadow-xs hover:shadow-sm transition-shadow">
                      <div className="flex flex-col gap-2">
                        <Kanban.ItemHandle asChild>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="line-clamp-2 text-sm font-medium flex-1 min-w-0">
                                {task.title}
                              </span>
                              <Badge variant={PRIORITY_COLORS[task.priority]}
                                className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] shrink-0"
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            {task.description && (
                              <p className="text-muted-foreground line-clamp-15 text-xs mt-1">
                                {task.description}
                              </p>
                            )}
                          </div>
                        </Kanban.ItemHandle>
                        <div className="flex items-center justify-between text-xs">
                          <Kanban.ItemHandle asChild>
                            <div className="text-muted-foreground flex-1"> Created: {formatDate(task.createdAt)} </div>
                          </Kanban.ItemHandle>
                            {/* delete button */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-destructive/10 hover:text-destructive" >
                                      <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure you want to delete this task?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This task will be permanently deleted. This action is irreversible.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel> Cancel </AlertDialogCancel>
                                  <AlertDialogAction> Delete </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </Kanban.Item>
                ))}
              </div>
            </Kanban.Column>
          ))}
        </Kanban.Board>
        <Kanban.Overlay>
          <div className="bg-primary/10 size-full rounded-md border-2 border-primary/20" />
        </Kanban.Overlay>
      </Kanban.Root>
    </div>
  );
}