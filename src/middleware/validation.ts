import { Request, Response, NextFunction } from "express";
import { authSchema } from "../schemas/auth-schema";
import {
  addApplicationSchema,
  deleteApplicationSchema,
} from "../schemas/applications-schemas";

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

export function validateAddApplicationSchema(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = addApplicationSchema.safeParse(req.body);

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

export function validateDeleteApplicationSchema(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = deleteApplicationSchema.safeParse(req.body);

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
