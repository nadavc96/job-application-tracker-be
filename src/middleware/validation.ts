import { Request, Response, NextFunction } from "express";
import { authSchema } from "../schemas/auth-schema";

export function validateAuth(req: Request, res: Response, next: NextFunction) {
  const result = authSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    });
  }

  next();
}
