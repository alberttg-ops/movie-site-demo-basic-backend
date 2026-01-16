import { Router } from "express";
import authMiddleware from "../middlewares/auth0.middleware.ts"
import validate from "../middlewares/validate.middleware.ts"
import {MovieIdParamsSchema, 
  MovieListTypeParamsSchema, 
  PaginationQuerySchema, 
  MoviePutBodySchema,
  MovieSearchQuerySchema
} from "../schema/index.ts"
import {
  getMovies,
  getMovieById,
  searchMovies,
  getMovieList,
  getMovieCast,
  getMovieKeywords,
  getMovieVideos,
  updateMovieController,
  createMovieHandler
} from "../controllers/movie.controller.ts";

const router = Router();

router.get("/", getMovies);
router.get("/search", validate( MovieSearchQuerySchema , "query"), authMiddleware, searchMovies);
router.get("/:id", validate(MovieIdParamsSchema, "params") , authMiddleware,  getMovieById);
router.get("/cast/:id", validate(MovieIdParamsSchema, "params") , authMiddleware, getMovieCast);
router.get("/list/:listType",  validate(MovieListTypeParamsSchema , "params"), validate( PaginationQuerySchema , "query"),   getMovieList);

router.get("/keyword/:id", validate(MovieIdParamsSchema, "params") , authMiddleware, getMovieKeywords);
router.get("/videos/:id", validate(MovieIdParamsSchema, "params") , authMiddleware, getMovieVideos);

router.put(  "/put/:id", validate(MovieIdParamsSchema, "params"), validate(MoviePutBodySchema, "body"), authMiddleware, updateMovieController);

router.post("/post/", validate(MoviePutBodySchema, "body"), authMiddleware, createMovieHandler);

export default router;
