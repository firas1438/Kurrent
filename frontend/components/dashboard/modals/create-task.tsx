"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "@/api";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

interface CreateTaskButtonProps {
  onSuccess?: () => void;
}

export function CreateTaskButton({ onSuccess }: CreateTaskButtonProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", priority: "MEDIUM", },
  });

  const loading = form.formState.isSubmitting;

  const handleOpenChange = (next: boolean) => {
    if (!next) { form.reset(); }
    setOpen(next);
  };

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        title: values.title.trim(),
        description: values.description?.trim() || undefined,
        priority: values.priority,
      };
      await createTask(payload);
      toast({ title: "Task Created", description: `"${payload.title}" has been added to your Kanban board.`, variant: "secondary", });
      handleOpenChange(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast({ title: "Error creating task", description: "Please try again later.", variant: "destructive", });
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} size="lg">
        <Plus className="h-4 w-4" />
        New task
      </Button>
      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Create task</AlertDialogTitle>
            <AlertDialogDescription>
              Add a new task. Title is required; description and priority are optional.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form
              id="create-task-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Task title"
                        autoFocus
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add details..."
                        rows={3}
                        className="resize-none max-h-40 overflow-y-auto"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority (optional)</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Medium" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LOW">Low</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HIGH">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <AlertDialogFooter className="flex flex-row justify-end gap-3">
            <AlertDialogCancel type="button" disabled={loading}>
              Cancel
            </AlertDialogCancel>
            <Button type="submit" form="create-task-form" disabled={loading} >
              {loading ? "Creating…" : "Create"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
