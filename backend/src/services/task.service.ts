import { MongoDatabase } from "@/database/mongo.database";

const mongoDatabase = new MongoDatabase();

export const createTask = async (task: Task) => {
  await mongoDatabase.connect();
  const create = await mongoDatabase.create("tasks", task);
  const result = await mongoDatabase.getDocumentById(
    "tasks",
    create.toString()
  );
  return result;
};

export const getTasks = async () => {
  await mongoDatabase.connect();
  const tasks = (
    await mongoDatabase.getDocuments("tasks", {
      _id: -1,
    })
  ).map((task) => ({
    ...task,
    id: task._id,
  }));
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
