import { pool } from "../db/index";

export async function userExistsByEmail(email: string): Promise<boolean> {
  const result = await pool.query(
    `SELECT *
        FROM users
        WHERE email = ($1)`,
    [email],
  );

  return result.rows.length > 0;
}

export async function addUserToDB(
  email: string,
  passwordHash: string,
): Promise<void> {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash) VALUES ($1, $2)`,
    [email, passwordHash],
  );

  return result.rows[0];
}
