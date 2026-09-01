import bcrypt from "bcrypt";
import crypto from "node:crypto";
import {
  userExistsByEmail,
  addUserToDB,
  getUserByEmail,
  userExistByID,
} from "../repositories/auth-repo";
import { PublicUser, User } from "../types/user";
import { generateTokens, getRefreshTokenPayload } from "../utils/jwt";
import { AppError } from "../app-error";
import {
  cacheRefreshToken,
  deleteRefreshToken,
  getRefreshTokenUserId,
} from "../repositories/refresh-token-repo";

const saltRounds: number = 10;

function hashRefreshToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function registerUser(
  email: string,
  password: string,
): Promise<PublicUser> {
  const isEmailTaken: boolean = await userExistsByEmail(email);

  if (isEmailTaken) {
    throw new AppError("Email already in use.", 409);
  }

  const passwordHash = await bcrypt.hash(password, saltRounds);
  return await addUserToDB(email, passwordHash);
}

export async function login(
  email: string,
  password: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AppError("Email or password is incorrect.", 401);
  }

  const passwordMatch: boolean = await bcrypt.compare(
    password,
    user.passwordHash,
  );

  if (!passwordMatch) {
    throw new AppError("Email or password is incorrect.", 401);
  }

  const { accessToken, refreshToken } = generateTokens(user.id);

  const hashedToken = hashRefreshToken(refreshToken);
  await cacheRefreshToken(hashedToken, user.id);

  return { accessToken, refreshToken };
}

export async function rotateRefreshToken(
  tokenToVerify: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  if (!tokenToVerify) {
    throw new AppError("No refresh token provided", 401);
  }

  const hashedTokenToVerify = hashRefreshToken(tokenToVerify);
  const userId = await getRefreshTokenUserId(hashedTokenToVerify);

  if (!userId) {
    throw new AppError("Invalid refresh token.", 401);
  }

  const useridFromJWT = getRefreshTokenPayload(tokenToVerify);

  if (useridFromJWT !== userId) {
    throw new AppError(
      "Authorization error token does not belong to user.",
      401,
    );
  }
  const userExist = await userExistByID(userId);

  if (!userExist) {
    throw new AppError("Missing or invalid authentication token.", 401);
  }

  const { accessToken, refreshToken } = generateTokens(userId);
  const hashedNewToken = hashRefreshToken(refreshToken);
  await cacheRefreshToken(hashedNewToken, userId);
  await deleteRefreshToken(hashedTokenToVerify);

  return { accessToken, refreshToken };
}

export async function logout(token: string): Promise<void> {
  const hashedToken = hashRefreshToken(token);

  await deleteRefreshToken(hashedToken);
}
