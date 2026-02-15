const express = require("express");
const router = express.Router();

const { getTaskSummary, getTaskCompletionTrend, getTasksByStatus, getTasksByPriority, getTaskCreationTrend, } = require("../controllers/stats.controller");
const { authenticate } = require("../middleware/auth.middleware");

// task statistics routes 
router.get("/tasks/summary", authenticate, getTaskSummary);
router.get("/tasks/completion-trend", authenticate, getTaskCompletionTrend);
router.get("/tasks/by-status", authenticate, getTasksByStatus);
router.get("/tasks/by-priority", authenticate, getTasksByPriority);
router.get("/tasks/creation-trend", authenticate, getTaskCreationTrend);

module.exports = router;
