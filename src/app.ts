import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.ts";
import errorHandler from "./middlewares/error.middleware.ts";
import { initDb } from "./db/init.ts";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

await initDb();

app.use("/api", routes);

app.use(errorHandler);

export default app;
