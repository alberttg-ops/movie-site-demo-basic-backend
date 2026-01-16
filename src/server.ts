// ---------- ENV (MUST BE FIRST) ----------
import dotenv from "dotenv";
dotenv.config();

// ---------- CORE ----------
import express from "express";
import cors from "cors";

// ---------- ROUTES & MIDDLEWARE ----------
import routes from "./routes/index.ts";
import errorHandler from "./middlewares/error.middleware.ts";

// ---------- DB ----------
import { initDb } from "./db/init.ts";
import { initSetup } from "./db/initSetup.ts";

// ---------- BOOTSTRAP ----------
async function bootstrap() {
  console.log("AUTH0_DOMAIN =", process.env.AUTH0_DOMAIN);
  console.log("AUTH0_AUDIENCE =", process.env.AUTH0_AUDIENCE);

  // 1️⃣ Ensure DB + schema are ready
  await initSetup(); // schema / rebuild logic
 // await initDb();    // runtime DB connectivity

  // 2️⃣ Create app
  const app = express();

  app.use(cors());
  app.use(express.json());

  // 3️⃣ Routes
  app.use("/api", routes);

  // 4️⃣ Error handler (LAST)
  app.use(errorHandler);

  // 5️⃣ Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ---------- START ----------
bootstrap().catch(err => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
