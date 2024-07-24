import express from "express";

import {
  getTasksController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
} from "@/controllers/task.controller";

const router = express.Router();

router.get("/tasks", getTasksController);
router.post("/tasks", createTaskController);
router.delete("/tasks/:id", deleteTaskController);
router.put("/tasks/:id", updateTaskController);

export default router;
