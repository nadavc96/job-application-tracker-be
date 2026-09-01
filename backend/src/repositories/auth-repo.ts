import { pool } from "../db/index";
import { PublicUser, User } from "../types/user";

export async function userExistsByEmail(email: string): Promise<boolean> {
  const result = await pool.query(
    `SELECT 1
    FROM users
    WHERE email = $1`,
    [email],
  );

  return result.rows.length > 0;
}

export async function addUserToDB(
  email: string,
  passwordHash: string,
): Promise<PublicUser> {
  const result = await pool.query<PublicUser>(
    `INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email`,
    [email, passwordHash],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Failed to create user.");
  }

  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<User>(
    `SELECT id, email, password_hash AS "passwordHash"
    FROM users
    WHERE email = $1`,
    [email],
  );

  return result.rows[0] ?? null;
}

export async function userExistByID(userid: string): Promise<boolean> {
  const result = await pool.query(
    `SELECT 1
    FROM users
    WHERE id = $1`,
    [userid],
  );

  return result.rowCount !== 0;
}
