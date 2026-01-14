import pool from "./pool.ts"

export const initDb = async () => {
  await pool.query("SELECT * FROM app.movies;")
}
