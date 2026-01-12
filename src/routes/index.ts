import { Router } from "express";
import movieRoutes from "./movie.routes.js";

const router = Router();

router.use("/movies", movieRoutes);

export default router;
