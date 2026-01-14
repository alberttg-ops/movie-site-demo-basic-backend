import { Router } from "express";
import movieRoutes from "./movie.routes.ts";

const router = Router();

router.use("/movies", movieRoutes);

export default router;
