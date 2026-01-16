import { z } from "zod";
import { Request, Response, NextFunction } from "express";
const validate =
  (schema: z.ZodTypeAny, property: "body" | "params" | "query") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid request",
        details: z.treeifyError(result.error),
      });
    }

    req[property] = result.data;
    next();
  };

  export default validate;