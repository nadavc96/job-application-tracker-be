import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../types/user";
import {
  userExistsByEmail,
  addUserToDB,
  getUserByEmail,
} from "../repositories/auth-repo";
import { generateTokens } from "../utils/jwt";

const saltRounds: number = 10;
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const isEmailTaken: boolean = await userExistsByEmail(email);

    if (isEmailTaken) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);
    await addUserToDB(email, passwordHash);

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred. Could not create user." });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user: User | undefined = await getUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    res.cookie("refresh_token", refreshToken, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/auth/refresh",
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred. Could not login." });
  }
}
