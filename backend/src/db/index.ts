import { Pool } from "pg";
import env from "../config/env";
import { error } from "node:console";

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

pool.on("error", (err) => console.log("Postgres client error", err));

export async function connectPostgres() {
  await pool.query(`SELECT 1`);
  console.log("Postgres connected.");
}
