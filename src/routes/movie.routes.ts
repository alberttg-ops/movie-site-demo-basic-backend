import { Router } from "express"
import {
  getMovies,
  getMovieById,
  searchMovies,
  getMovieList,
  getMovieCast,
  getMovieKeywords,
  getMovieVideos
} from "../controllers/movie.controller.js"

const router = Router()

router.get("/", getMovies)
router.get("/search", searchMovies)
router.get("/:id", getMovieById)
router.get("/cast/:id",getMovieCast)
router.get("/list/:listType", getMovieList)

router.get("/keyword/:id", getMovieKeywords)
router.get("/videos/:id", getMovieVideos)

export default router
