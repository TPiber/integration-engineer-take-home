import express from "express";

import {
  getTasksController,
  getTaskController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
} from "@/controllers/task.controller";

const router = express.Router();

router.get("/tasks", getTasksController);
router.post("/tasks", createTaskController);
router.get("/tasks/:id", getTaskController);
router.delete("/tasks/:id", deleteTaskController);
router.put("/tasks/:id", updateTaskController);

export default router;
