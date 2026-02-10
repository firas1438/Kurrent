export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  userId: number;
  createdAt: string;
};
