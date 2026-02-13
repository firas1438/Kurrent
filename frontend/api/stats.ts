import api from "@/lib/api";

// task summary metrics for the dashboard
export const getTaskSummary = () => {
  return api.get("/stats/tasks/summary");
};

// completion trend data for area chart
export const getTaskCompletionTrend = () => {
  return api.get("/stats/tasks/completion-trend");
};

// tasks grouped by status for bar chart
export const getTasksByStatus = () => {
  return api.get("/stats/tasks/by-status");
};

// tasks grouped by priority for bar chart
export const getTasksByPriority = () => {
  return api.get("/stats/tasks/by-priority");
};

// creation trend data for line chart
export const getTaskCreationTrend = () => {
  return api.get("/stats/tasks/creation-trend");
};
