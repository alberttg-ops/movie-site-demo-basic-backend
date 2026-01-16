import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.ts";
import errorHandler from "./middlewares/error.middleware.ts";
import { initDb } from "./db/init.ts";

dotenv.config();
console.log("AUTH0_DOMAIN =", process.env.AUTH0_DOMAIN);
console.log("AUTH0_AUDIENCE =", process.env.AUTH0_AUDIENCE);

const app = express();

app.use(cors());
app.use(express.json());

await initDb();

app.use("/api", routes);

app.use(errorHandler);

export default app;
