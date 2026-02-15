"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/api";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface DeleteTaskButtonProps {
  taskId: number;
  taskTitle: string;
  onDeleted?: (taskId: number) => void;
}

// reusable delete button + confirmation dialog for tasks.
export function DeleteTaskButton({ taskId, taskTitle, onDeleted, }: DeleteTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await deleteTask(taskId);
      toast({ title: "Task Deleted!", description: `"${taskTitle}" has been permanently removed.`, variant: "destructive", });
      onDeleted?.(taskId);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast({ title: "Error deleting task!", description: "There was an error while trying to delete the task. Please try again.", variant: "destructive", });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 hover:bg-destructive/10 hover:text-destructive"
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{taskTitle}"? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={loading} >
              {loading ? "Deleting…" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

