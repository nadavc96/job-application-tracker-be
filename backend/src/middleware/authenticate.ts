import { Request, Response, NextFunction } from "express";
import { getAccessTokenPayload } from "../utils/jwt";
import { AppError } from "../app-error";

declare global {
  namespace Express {
    interface Request {
      userid?: string;
    }
  }
}

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("No token provided.", 401);
  }

  const token = authHeader.split(" ")[1] as string;

  const payload = getAccessTokenPayload(token);
  req.userid = payload;

  next();
}
