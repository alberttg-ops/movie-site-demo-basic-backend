import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    if (!process.env.DB_HOST) {
      throw new Error("DB_HOST is not defined");
    }

    console.log("Creating DB pool with host:", process.env.DB_HOST);

    pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  }

  return pool;
}
