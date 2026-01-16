import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1, "title is required"),

  overview: z.string().optional(),
  poster_path: z.string().optional(),
  backdrop_path: z.string().optional(),
  release_date: z.coerce.date().optional(),
  vote_average: z.number().min(0).max(10).optional(),
  runtime: z.number().int().positive().optional(),
  status: z.string().optional(),
  budget: z.number().int().nonnegative().optional(),
  revenue: z.number().int().nonnegative().optional(),
  tagline: z.string().optional(),
});

/**
 * IMPORTANT:
 * - no `id` field here → client cannot send it
 */
