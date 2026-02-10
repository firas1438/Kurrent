"use client";

import { useState, useEffect } from "react";
import { TaskTable } from "@/components/dashboard/task-table";
import { TaskCards } from "@/components/dashboard/task-cards";
import { TaskPagination } from "@/components/dashboard/task-pagination";
import { usePagination } from "@/hooks/use-pagination";
import { DeleteTaskDialog } from "@/components/dashboard/modals/delete-task";
import { toast } from "@/hooks/use-toast";
import { Task } from "@/types/task";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle2 } from "lucide-react"; 
import { getCompletedTasks, deleteTask } from "@/api";


const ITEMS_PER_PAGE = 10;

export default function ArchivePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { currentPage, totalPages, currentData, goToPage } = usePagination({ data: tasks, itemsPerPage: ITEMS_PER_PAGE, });

  // fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const result = await getCompletedTasks();
        setTasks(result.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        toast({ title: "Error fetching tasks", description: "There was an error while trying to fetch your task archive.", variant: "destructive", duration: 7000, });
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // delete task
  const handleConfirmDelete = async () => {
    if (!selectedTask) return;
    try {
      await deleteTask(selectedTask.id);
      setTasks((prev) => prev.filter((task) => task.id !== selectedTask.id)); // update front after deletion
      toast({ title: "Task deleted successfully!", description: `"${selectedTask.title}" has been deleted permanently.`, variant: "secondary", duration: 7000 });
      console.log("Task deleted:", selectedTask.id);
    } catch (err) {
      console.error("Error deleting task:", err);
      toast({ title: "Error deleting task", description: "There was an error while trying to delete the task. Please try again.", variant: "destructive", duration: 5000, });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedTask(null);
    }
  };

  // open delete modal
  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-lg font-semibold">Task Archive</h1>
        <p className="text-sm text-muted-foreground">
          View the complete history of your completed tasks.
        </p>
      </div>

      {/* conditional rendering */}
      {loading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <Spinner className="mb-3 size-12 text-muted-foreground/50"/>
            <p className="text-sm font-medium text-muted-foreground"> Loading tasks... </p>
            <p className="mt-1 text-xs text-muted-foreground/70"> Completed tasks will appear here once they're loaded. </p>
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="mb-3 h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground"> No completed tasks yet </p>
            <p className="mt-1 text-xs text-muted-foreground/70"> New tasks will appear here once they're finished. </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <TaskTable tasks={currentData} onDelete={handleDelete} />
          <TaskCards tasks={currentData} onDelete={handleDelete} />
          <TaskPagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </div>
      )}

      {/* delete modal */}
      {selectedTask && (
        <DeleteTaskDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} taskTitle={selectedTask.title} onConfirm={handleConfirmDelete} />
      )}
    </div>
  );
}