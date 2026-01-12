import pool from "../db/pool.js"

import { Movie } from "../types/movie.js"

export type DiscoverParams = {
  genres?: number[]
  minRating?: number
  fromDate?: string
  page?: number
  limit?: number
}

export type Keyword = {
  id: number
  name: string
}
export type MovieVideo = {
  id: string
  name: string
  key: string
  site: string
  type: string
  size: number | null
  official: boolean | null
  published_at: string | null
  iso_639_1: string | null
  iso_3166_1: string | null
}



export type CastMember = {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export const fetchMovies = async (): Promise<Movie[]> => {
  const { rows } = await pool.query(
    `SELECT id, title, vote_average AS rating
     FROM movies
     ORDER BY release_date DESC`
  )

  return rows
}

export const fetchMovieById = async (
  id: number
): Promise<Movie | null> => {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      title,
      overview,
      poster_path,
      backdrop_path,
      release_date,
      vote_average,
      runtime,
      status,
      budget,
      revenue,
      tagline
    FROM movies
    WHERE id = $1
    `,
    [id]
  )

  return rows[0] ?? null
}

export const searchMoviesService = async (
  query: string
): Promise<Movie[]> => {
  const { rows } = await pool.query(
    `SELECT id, title, vote_average AS rating
     FROM movies
     WHERE title ILIKE $1
     ORDER BY vote_average DESC`,
    [`%${query}%`]
  )

  return rows
}

export const discoverMovies = async ({
  genres,
  minRating,
  fromDate,
  page = 1,
  limit = 20
}: {
  genres?: number[]
  minRating?: number
  fromDate?: string
  page?: number
  limit?: number
}) => {
  const offset = (page - 1) * limit

  const conditions: string[] = []
  const values: any[] = []
  let idx = 1

  if (minRating) {
    conditions.push(`m.vote_average >= $${idx++}`)
    values.push(minRating)
  }

  if (fromDate) {
    conditions.push(`m.release_date >= $${idx++}`)
    values.push(fromDate)
  }

  if (genres && genres.length) {
    conditions.push(`
      m.id IN (
        SELECT movie_id
        FROM movie_genres
        WHERE genre_id = ANY($${idx++})
      )
    `)
    values.push(genres)
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""

  const { rows } = await pool.query(
    `
    SELECT
      m.id,
      m.title,
      m.poster_path,
      m.release_date,
      m.vote_average
    FROM movies m
    ${where}
    ORDER BY m.vote_average DESC
    LIMIT $${idx++} OFFSET $${idx}
    `,
    [...values, limit, offset]
  )

  return rows
}

export const fetchMovieList = async (
  listType: string,
  page = 1,
  limit = 20
) => {
  const offset = (page - 1) * limit

  let where = ""
  let orderBy = "vote_average DESC"

  switch (listType) {
    case "popular":
      orderBy = "vote_average DESC"
      break
    case "top_rated":
      orderBy = "vote_average DESC"
      break
    case "upcoming":
      orderBy = "release_date ASC"
      break
    case "now_playing":
      where = "WHERE release_date <= CURRENT_DATE"
      orderBy = "release_date DESC"
      break
  }

  const { rows } = await pool.query<Movie>(
    `
    SELECT
      id::int AS id,
      title,
      poster_path,
      to_char(release_date, 'YYYY-MM-DD') AS release_date,
      vote_average::float AS vote_average
    FROM movies
    ${where}
    ORDER BY ${orderBy}
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  )
  return rows
}



export const fetchMovieCastByMovieId = async (
  movieId: number
): Promise<CastMember[]> => {
  const { rows } = await pool.query<CastMember>(
    `
    SELECT
      p.id,
      p.name,
      mc.character,
      mc.profile_path
    FROM movie_cast mc
    JOIN persons p ON p.id = mc.person_id
    WHERE mc.movie_id = $1
    ORDER BY p.popularity DESC NULLS LAST
    `,
    [movieId]
  )

  return rows
}



export const fetchMovieKeywordsByMovieId = async (
  movieId: number
): Promise<Keyword[]> => {
  const { rows } = await pool.query<Keyword>(
    `
    SELECT
      k.id,
      k.name
    FROM movie_keywords mk
    JOIN keywords k
      ON k.id = mk.keyword_id
    WHERE mk.movie_id = $1
    ORDER BY k.name ASC
    `,
    [movieId]
  )

  return rows
}

export const fetchMovieVideosByMovieId = async (
  movieId: number
): Promise<MovieVideo[]> => {
  const { rows } = await pool.query<MovieVideo>(
    `
    SELECT
      v.id,
      v.name,
      v.key,
      v.site,
      v.type,
      v.size,
      v.official,
      v.published_at,
      v.iso_639_1,
      v.iso_3166_1
    FROM movie_videos mv
    JOIN videos v
      ON v.id = mv.video_id
    WHERE mv.movie_id = $1
    ORDER BY
      v.official DESC,
      v.published_at DESC NULLS LAST
    `,
    [movieId]
  )

  return rows
}