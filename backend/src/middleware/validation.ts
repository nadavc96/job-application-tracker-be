import { Request, Response, NextFunction } from "express";
import { authSchema } from "../schemas/auth-schema";
import {
  addApplicationSchema,
  deleteApplicationSchema,
  editApplicationSchema,
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

export function validateAddApplication(
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

export function validateDeleteApplication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = deleteApplicationSchema.safeParse(req.params);

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

export function validateEditApplication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = editApplicationSchema.safeParse(req.body);

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
