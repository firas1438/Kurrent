const express = require("express");
const router = express.Router();
const { createTask, getTasks, getCompletedTasks, getTaskById, updateTask, deleteTask } = require("../controllers/task.controller");
const { authenticate } = require("../middleware/auth.middleware");

// task routes
router.post("/", authenticate, createTask);
router.get("/", authenticate, getTasks);
router.get("/completed", authenticate, getCompletedTasks);
router.get("/:id", authenticate, getTaskById);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

module.exports = router;
