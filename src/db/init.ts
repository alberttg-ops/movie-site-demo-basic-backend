import { getPool } from "./pool.ts";

export const initDb = async () => {
    const pool = getPool();

  await pool.query("SELECT * FROM app.movies;")
}
