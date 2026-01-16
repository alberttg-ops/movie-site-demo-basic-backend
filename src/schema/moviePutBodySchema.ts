import { z } from "zod";



export const MoviePutBodySchema = z.object({
  title: z.string().min(1),
  poster_path: z.string().nullable().optional(),
  release_date: z.string().optional(),
  vote_average: z.number().optional(),
});
