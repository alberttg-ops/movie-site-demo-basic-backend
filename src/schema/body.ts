import { z } from "zod";

export const CreateMovieBodySchema = z.object({
  title: z.string().min(1),
});

export const UpdateMovieBodySchema = z
  .object({
    title: z.string().min(1).optional(),
  })
  .refine(v => Object.keys(v).length > 0);
