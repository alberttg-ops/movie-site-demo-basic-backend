import pool from "./pool.js"

export const initDb = async () => {
  await pool.query("SET search_path TO app")
}
