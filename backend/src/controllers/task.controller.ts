import type { Request, Response } from "express";

import {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} from "@/services/task.service";

export const createTaskController = async (req: Request, res: Response) => {
  const task = req.body;

  if (!task.title || !task.description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    const result = await createTask(task);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTasksController = async (_: Request, res: Response) => {
  try {
    const tasks = await getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await deleteTask(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const task = req.body;

  if (!task.title || !task.description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    const result = await updateTask(id, task);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTaskController = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await getTask(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
