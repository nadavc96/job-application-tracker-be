import { Response } from "express";

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export function setRefreshTokenCookie(res: Response, refreshToken: string) {
  res.cookie("refresh_token", refreshToken, {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/auth/refresh",
  });
}
