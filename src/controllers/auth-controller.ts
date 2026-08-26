import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../types/user";
import {
  userExistsByEmail,
  addUserToDB,
  getUserByEmail,
  userExistByID,
} from "../repositories/auth-repo";
import * as authService from "../services/auth-service";
import { generateTokens, getRefreshTokenPayload } from "../utils/jwt";
import { setRefreshTokenCookie } from "../utils/cookies";
import { AppError } from "../app-error";

const saltRounds: number = 10;

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await authService.registerUser(email, password);

  return res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const tokens = await authService.login(email, password);

  setRefreshTokenCookie(res, tokens.refreshToken);

  return res.status(200).json({ accessToken: tokens.accessToken });
}

export async function refresh(req: Request, res: Response) {
  const tokenToVerify = req.cookies.refresh_token;

  if (!tokenToVerify) {
    throw new AppError("No refresh token provided", 401);
  }

  const userid = getRefreshTokenPayload(tokenToVerify);
  const userExist = await userExistByID(userid);

  if (!userExist) {
    throw new AppError("Missing or invalid authentication token.", 401);
  }

  const { accessToken, refreshToken } = generateTokens(userid);
  setRefreshTokenCookie(res, refreshToken);

  return res.status(200).json({ accessToken });
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("refresh_token", { path: "/auth/refresh" });

  return res.status(200).json({ message: "Logged out successfully." });
}
