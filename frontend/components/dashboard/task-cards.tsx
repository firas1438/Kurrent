import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { getPriorityVariant, formatDate } from "@/lib/task-helpers";

type Task = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  userId: number;
  createdAt: string;
};

interface TaskCardsProps {
  tasks: Task[];
  onDelete: (task: Task) => void;
}

export function TaskCards({ tasks, onDelete }: TaskCardsProps) {
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
            <Button variant="ghost" size="icon" onClick={() => onDelete(task)} className="h-5 w-5 hover:bg-destructive/10 hover:text-destructive" >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}