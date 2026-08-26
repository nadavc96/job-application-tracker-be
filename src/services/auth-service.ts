import bcrypt from "bcrypt";
import {
  userExistsByEmail,
  addUserToDB,
  getUserByEmail,
} from "../repositories/auth-repo";
import { PublicUser, User } from "../types/user";
import { generateTokens } from "../utils/jwt";

const saltRounds: number = 10;

export async function registerUser(
  email: string,
  password: string,
): Promise<PublicUser> {
  const isEmailTaken: boolean = await userExistsByEmail(email);

  if (isEmailTaken) {
    throw new Error("Email already in use.");
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
    throw new Error("Email or password is incorrect.");
  }

  const passwordMatch: boolean = await bcrypt.compare(
    password,
    user.passwordHash,
  );

  if (!passwordMatch) {
    throw new Error("Email or password is incorrect.");
  }

  const { accessToken, refreshToken } = generateTokens(user.id);

  return { accessToken, refreshToken };
}
