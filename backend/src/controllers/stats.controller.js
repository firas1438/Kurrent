const prisma = require("../config/prisma");

// GET /stats/tasks/summary - overall metrics
const getTaskSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const [totalTasks, completedTasks, last7DaysCreated] = await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.task.count({ where: { userId, status: "COMPLETED" } }),
      prisma.task.count({
        where: { userId, createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), }, },
      }),
    ]);

    const completionRate =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    const dailyAverage =
      last7DaysCreated === 0 ? 0 : Number((last7DaysCreated / 7).toFixed(1));

    res.json({ totalTasks, completedTasks, completionRate, dailyAverage, });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch task summary statistics" });
  }
};

// GET /stats/tasks/completion-trend - daily completed tasks (last 14 days)
const getTaskCompletionTrend = async (req, res) => {
  try {
    const userId = req.user.id;
    const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const tasks = await prisma.task.findMany({
      where: { userId, status: "COMPLETED", createdAt: { gte: since }, },
      orderBy: { createdAt: "asc" },
    });
    const byDate = new Map();
    for (const task of tasks) {
      const key = task.createdAt.toISOString().slice(0, 10);
      byDate.set(key, (byDate.get(key) || 0) + 1);
    }
    const data = Array.from(byDate.entries()).map(([date, completed]) => ({ date, completed, }));
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch task completion trend" });
  }
};

// GET /stats/tasks/by-status - count of tasks grouped by status
const getTasksByStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await prisma.task.findMany({
      where: { userId },
      select: { status: true },
    });
    const counts = { NEW: 0, INPROGRESS: 0, DELAYED: 0, COMPLETED: 0, };
    for (const task of tasks) {
      counts[task.status] = (counts[task.status] || 0) + 1;
    }
    const data = Object.entries(counts).map(([status, count]) => ({ status, count, }));
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks by status" });
  }
};

// GET /stats/tasks/by-priority - count of tasks grouped by priority
const getTasksByPriority = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await prisma.task.findMany({
      where: { userId },
      select: { priority: true },
    });
    const counts = { LOW: 0, MEDIUM: 0, HIGH: 0, };
    for (const task of tasks) {
      counts[task.priority] = (counts[task.priority] || 0) + 1;
    }
    const data = Object.entries(counts).map(([priority, count]) => ({ priority, count, }));
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks by priority" });
  }
};

// GET /stats/tasks/creation-trend - daily created tasks (last 14 days)
const getTaskCreationTrend = async (req, res) => {
  try {
    const userId = req.user.id;
    const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const tasks = await prisma.task.findMany({
      where: { userId, createdAt: { gte: since }, },
      orderBy: { createdAt: "asc" },
    });
    const byDate = new Map();
    for (const task of tasks) {
      const key = task.createdAt.toISOString().slice(0, 10);
      byDate.set(key, (byDate.get(key) || 0) + 1);
    }
    const data = Array.from(byDate.entries()).map(([date, created]) => ({ date, created, }));
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch task creation trend" });
  }
};

module.exports = {
  getTaskSummary,
  getTaskCompletionTrend,
  getTasksByStatus,
  getTasksByPriority,
  getTaskCreationTrend,
};
