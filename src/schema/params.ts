import { z } from "zod";

export const MovieIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
