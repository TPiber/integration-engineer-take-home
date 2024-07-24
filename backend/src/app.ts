import express from "express";

import router from "./routes";
import { default as taskRouter } from "./routes/task.routes";

const app = express();

app.use(express.json());

app.use(router);
app.use(taskRouter);

export default app;
