import { pool } from "../db/index";
import { User } from "../types/user";

export async function userExistsByEmail(email: string): Promise<boolean> {
  const result = await pool.query(
    `SELECT *
    FROM users
    WHERE email = $1`,
    [email],
  );

  return result.rows.length > 0;
}

export async function addUserToDB(
  email: string,
  passwordHash: string,
): Promise<void> {
  await pool.query(`INSERT INTO users (email, password_hash) VALUES ($1, $2)`, [
    email,
    passwordHash,
  ]);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const result = await pool.query(
    `SELECT id, email, password_hash as "passwordHash"
    FROM users
    WHERE email = $1`,
    [email],
  );

  return result.rows[0];
}
