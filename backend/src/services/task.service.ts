import { MongoDatabase } from "@/database/mongo.database";
import type { WithId } from "mongodb";

const mongoDatabase = new MongoDatabase();

export const createTask = async (task: Task) => {
  await mongoDatabase.connect();
  const create = await mongoDatabase.create("tasks", task);

  const { _id, ...rest } = (await mongoDatabase.getDocumentById(
    "tasks",
    create.toString()
  )) as WithId<Document>;

  const result = { ...rest, id: _id };

  return result;
};

export const getTasks = async () => {
  await mongoDatabase.connect();

  const tasks = (
    await mongoDatabase.getDocuments("tasks", {
      _id: -1,
    })
  ).map(({ _id, ...rest }) => ({ ...rest, id: _id }));

  return tasks;
};

export const deleteTask = async (id: string) => {
  await mongoDatabase.connect();

  const result = await mongoDatabase.delete("tasks", id);

  return result;
};

export const updateTask = async (id: string, task: Task) => {
  await mongoDatabase.connect();

  const result = await mongoDatabase.update("tasks", id, task);

  return result;
};

export const getTask = async (id: string) => {
  await mongoDatabase.connect();

  const result = await mongoDatabase.getDocumentById("tasks", id);

  return result;
};
