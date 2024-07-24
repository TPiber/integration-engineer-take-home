import { MongoDatabase } from "@/database/mongo.database";

const mongoDatabase = new MongoDatabase();

export const createTask = async (task: Task) => {
  await mongoDatabase.connect();
  const result = await mongoDatabase.create("tasks", task);
  await mongoDatabase.disconnect();
  return result;
};

export const getTasks = async () => {
  await mongoDatabase.connect();
  const tasks = await mongoDatabase.getDocuments("tasks");
  await mongoDatabase.disconnect();
  return tasks;
};

export const deleteTask = async (id: Uint8Array) => {
  await mongoDatabase.connect();
  const result = await mongoDatabase.delete("tasks", id);
  await mongoDatabase.disconnect();
  return result;
};

export const updateTask = async (id: Uint8Array, task: Task) => {
  await mongoDatabase.connect();
  const result = await mongoDatabase.update("tasks", id, task);
  await mongoDatabase.disconnect();
  return result;
};
