import { Request, Response, NextFunction } from "express";
import { AppError } from "../app-error";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      error: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    error: "Internal server error.",
  });
}
