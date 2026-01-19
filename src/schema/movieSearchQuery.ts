import { z } from "zod";

export const MovieSearchQuerySchema = z.object({
  query: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9].*$/, {
      message: "Search must start with a letter or number",
    }),
});
