import { Request, Response } from "express";
import bcrypt from "bcrypt";

const saltRounds: number = 10;

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
