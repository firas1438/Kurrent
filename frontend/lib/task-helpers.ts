export const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "destructive" as const;
    case "MEDIUM":
      return "default" as const;
    case "LOW":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};