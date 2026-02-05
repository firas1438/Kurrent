import api from "@/lib/api";

export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: "NEW" | "INPROGRESS" | "DELAYED" | "COMPLETED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
}

// get all tasks
export const getTasks = () => {
  return api.get("/tasks");
};

// get a single task by ID
export const getTaskById = (id: number) => {
  return api.get(`/tasks/${id}`);
};

// create a new task
export const createTask = (data: CreateTaskPayload) => {
  return api.post("/tasks", data);
};

// update a task
export const updateTask = (id: number, data: UpdateTaskPayload) => {
  return api.put(`/tasks/${id}`, data);
};

// delete a task
export const deleteTask = (id: number) => {
  return api.delete(`/tasks/${id}`);
};
