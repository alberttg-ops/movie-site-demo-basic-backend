import { Request, Response, NextFunction } from "express"
import {
  
  fetchMovieById,
  searchMoviesService,
  discoverMovies,
  fetchMovieList,
  fetchMovieCastByMovieId,
  fetchMovieKeywordsByMovieId,
  fetchMovieVideosByMovieId
} from "../services/movie.service.ts"





export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movieId = Number(req.params.id)

    const movie = await fetchMovieById(movieId)

    if (!movie) {
      return res.status(404).json({
        movie: null,
        cast: [],
        trailer: null,
        keywords: [],
        notFound: true,
      })
    }

    res.json({
      movie,
      cast: [],
      trailer: null,
      keywords: [],
      notFound: false,
    })
  } catch (err) {
    next(err)
  }
}


export const searchMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const q = req.query.q as string
    const results = await searchMoviesService(q)
    res.json(results)
  } catch (err) {
    next(err)
  }
}

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await discoverMovies({
      genres: req.query.genres
        ? String(req.query.genres).split(",").map(Number)
        : undefined,
      minRating: req.query.minRating
        ? Number(req.query.minRating)
        : undefined,
      fromDate: req.query.fromDate
        ? String(req.query.fromDate)
        : undefined,
      page: req.query.page ? Number(req.query.page) : 1
    })

     res.json({
      results: movies
    })
  } catch (err) {
    next(err)
  }
}

export const getMovieList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await fetchMovieList(
      req.params.listType,
      req.query.page ? Number(req.query.page) : 1
    )
   res.json({
      results: movies
    })
  } catch (err) {
    next(err)
  }
}


export const getMovieCast = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movieId = Number(req.params.id)

    if (Number.isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid movie id" })
    }

    const cast = await fetchMovieCastByMovieId(movieId)

    res.json(cast)
  } catch (err) {
    next(err)
  }
}


export const getMovieKeywords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movieId = Number(req.params.id)

    if (Number.isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid movie id" })
    }

    const keywords = await fetchMovieKeywordsByMovieId(movieId)

    res.json(keywords)
  } catch (err) {
    next(err)
  }
}



export const getMovieVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movieId = Number(req.params.id)

    if (Number.isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid movie id" })
    }

    const videos = await fetchMovieVideosByMovieId(movieId)

    res.json(videos)
  } catch (err) {
    next(err)
  }
}
