import { Request, Response, NextFunction } from "express"

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message)

  res.status(500).json({
    message: "Internal Server Error"
  })
}
