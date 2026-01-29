import KanbanRender from "@/components/dashboard/tasks-kanban";

export default function TrackPage() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-xl font-bold">Track Tasks</h1>
        <p className="text-muted-foreground">
          Track the progress of your ongoing work.
        </p>
      </div>

      {/* content */}
      <div>
        <KanbanRender/>
      </div>

    </div>
  );
}
