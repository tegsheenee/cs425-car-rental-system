import { pool } from "../db/database";
import { RecommendedCar } from "../models/recommendation";

export async function getAvailableCars(): Promise<RecommendedCar[]> {
    const result = await pool.query<RecommendedCar>(
        `
    SELECT
      c.*,
      cat.category_name
    FROM cars c
    JOIN categories cat
      ON c.category_id = cat.category_id
    WHERE c.available = TRUE
    ORDER BY c.daily_rate
    `
    );

    return result.rows;
}