"use client";

import { useEffect, useState } from "react";
import KanbanRender from "@/components/dashboard/tasks-kanban";
import { CreateTaskButton } from "@/components/dashboard/modals/create-task";
import { Spinner } from "@/components/ui/spinner";
import { CircleSlashIcon } from "lucide-react";
import { getTasks } from "@/api";
import { toast } from "@/hooks/use-toast";
import type { Task } from "@/types/task";
import Container from "@/components/global/container";

export default function TrackPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // fetch all tasks for the kanban board
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const result = await getTasks();
        setTasks(result.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        toast({ title: "Error fetching tasks", description: "There was an error while trying to fetch your tasks.", variant: "destructive", });
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [refreshTrigger]);

  return (
    <Container animation="fadeIn" delay={0.3} className="space-y-8 sm:space-y-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* header*/}
        <div>
          <h1 className="text-lg font-semibold">Track Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Track the progress of your ongoing work.
          </p>
        </div>
        {/* new task button */}
        <CreateTaskButton onSuccess={() => setRefreshTrigger((t) => t + 1)} />
      </div>

      {/* conditional rendering, similar to archive page */}
      {loading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <Spinner className="mb-3 size-12 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">
              Loading tasks...
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Your tasks will appear here once they&apos;re loaded.
            </p>
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <CircleSlashIcon className="mb-3 h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">
              No tasks to track yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              New tasks will appear here once you create them.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <KanbanRender tasks={tasks} />
        </div>
      )}
    </Container>
  );
}
