import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getPriorityVariant, formatDate } from "@/lib/task-helpers";
import { DeleteTaskButton } from "@/components/dashboard/modals/delete-task";
import type { Task } from "@/types/task";

interface TaskCardsProps {
  tasks: Task[];
  onDeleted: (taskId: number) => void;
}

export function TaskCards({ tasks, onDeleted }: TaskCardsProps) {
  return (
    <div className="md:hidden space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">#{task.id}</span>
                <h3 className="font-semibold text-sm">{task.title}</h3>
              </div>
              {task.description && (
                <p className="text-sm text-muted-foreground line-clamp-5">
                  {task.description}
                </p>
              )}
            </div>
          </div>
                
          <Badge variant={getPriorityVariant(task.priority)}>
            {task.priority}
          </Badge>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {formatDate(task.createdAt)}
            </p>
            <DeleteTaskButton
              taskId={task.id}
              taskTitle={task.title}
              onDeleted={onDeleted}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}