import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import env from "../config/env";
import { AppError } from "../app-error";

export function generateTokens(userid: string) {
  const accessToken = jwt.sign({ userid: userid }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY as StringValue,
  });

  const refreshToken = jwt.sign({ userid: userid }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY as StringValue,
  });

  return { accessToken, refreshToken };
}

function verifyToken(token: string, secret: string) {
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET);

  if (typeof payload === "string") {
    throw new AppError("Invalid token payload", 401);
  }

  return payload.userid;
}

export function getAccessTokenPayload(token: string) {
  return verifyToken(token, env.JWT_ACCESS_SECRET);
}

export function getRefreshTokenPayload(token: string) {
  return verifyToken(token, env.JWT_REFRESH_SECRET);
}
