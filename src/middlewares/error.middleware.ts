// error.middleware.ts (TEMPORARY)
import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("🔥 INTERNAL ERROR:");
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
    error: err?.message,
  });
}
