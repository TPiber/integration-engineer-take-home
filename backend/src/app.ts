import express from "express";
import cors from "cors";

import router from "./routes";
import { default as taskRouter } from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(taskRouter);

export default app;
