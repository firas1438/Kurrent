import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getPriorityVariant, formatDate } from "@/lib/task-helpers";
import { DeleteTaskButton } from "@/components/dashboard/modals/delete-task";
import type { Task } from "@/types/task";

interface TaskTableProps {
  tasks: Task[];
  onDeleted: (taskId: number) => void;
}

export function TaskTable({ tasks, onDeleted }: TaskTableProps) {
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
              <TableCell className="hidden lg:table-cell max-w-0 w-full truncate text-muted-foreground">
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
                <DeleteTaskButton
                  taskId={task.id}
                  taskTitle={task.title}
                  onDeleted={onDeleted}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}