import { z } from "zod";

export const MovieListTypeParamsSchema = z.object({
  listType: z.enum([
    "popular",
    "top_rated",
    "upcoming",
    "now_playing",
  ]),
});
