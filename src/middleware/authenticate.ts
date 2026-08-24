import { Request, Response, NextFunction } from "express";
import { getRefreshTokenPayload } from "../utils/jwt";

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
    return res.status(401).json({ error: "No token provided." });
  }

  const token = authHeader.split(" ")[1] as string;

  try {
    const payload = getRefreshTokenPayload(token);
    req.userid = payload;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
