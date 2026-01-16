import { z } from "zod";

export const MovieBaseSchema = z.object({
  id: z.number().int(),
  title: z.string(),
});
