import { Pool, PoolClient } from "pg";
import env from "../config/env";

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

pool.on("error", (err) => console.error("Postgres client error", err));

export async function connectPostgres() {
  await pool.query(`SELECT 1`);
  console.log("Postgres connected.");
}

export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
