import { PoolClient } from "pg";

/**
 * Returns the lowest available id starting from 1
 */
export async function getNextMovieId(client: PoolClient): Promise<number> {
  const result = await client.query<{ id: number }>(`
    SELECT COALESCE(
      (
        SELECT MIN(t.id + 1)
        FROM movies t
        LEFT JOIN movies t2 ON t2.id = t.id + 1
        WHERE t2.id IS NULL
      ),
      1
    ) AS id
  `);

  return result.rows[0].id;
}
