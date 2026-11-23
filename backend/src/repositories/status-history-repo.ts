import { pool } from "../db";
import type { Queryable } from "../types/db";

export async function insertStatusHistory(
  appID: string,
  userID: string,
  status: string,
  db: Queryable = pool,
): Promise<void> {
  await db.query(
    `INSERT INTO status_history (app_id, user_id, status)
    VALUES ($1, $2, $3)`,
    [appID, userID, status],
  );
}
