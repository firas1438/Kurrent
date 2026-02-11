"use client";

import { useState } from "react";
import KanbanRender from "@/components/dashboard/tasks-kanban";
import { CreateTaskButton } from "@/components/dashboard/modals/create-task";

export default function TrackPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="space-y-8 sm:space-y-6">
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

      <div>
        <KanbanRender refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
