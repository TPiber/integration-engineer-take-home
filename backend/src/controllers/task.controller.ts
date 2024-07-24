import type { Request, Response } from "express";

import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "@/services/task.service";

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const task = req.body;
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
  try {
    const id = req.params.id;

    const result = await deleteTask(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const task = req.body;

    const result = await updateTask(id, task);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
