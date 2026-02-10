import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface TaskTableProps {
  tasks: Task[];
  onDelete: (task: Task) => void;
}

export function TaskTable({ tasks, onDelete }: TaskTableProps) {
  return (
    <div className="hidden md:block rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden lg:table-cell">Description</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="hidden xl:table-cell">Created At</TableHead>
            <TableHead className="w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell className="hidden lg:table-cell truncate text-muted-foreground">
                {task.description || "—"}
              </TableCell>
              <TableCell>
                <Badge variant={getPriorityVariant(task.priority)}>
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">
                {formatDate(task.createdAt)}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => onDelete(task)} className="h-5 w-5 hover:bg-destructive/10 hover:text-destructive" >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}