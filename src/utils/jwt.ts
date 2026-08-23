import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import env from "../config/env";

export function generateTokens(userid: string) {
  const accessToken = jwt.sign({ userid: userid }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY as StringValue,
  });

  const refreshToken = jwt.sign({ userid: userid }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY as StringValue,
  });

  return { accessToken, refreshToken };
}

export function getRefreshTokenPayload(token: string) {
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET);

  if (typeof payload === "string") {
    throw new Error("Invalid token payload");
  }

  return payload.userid;
}
