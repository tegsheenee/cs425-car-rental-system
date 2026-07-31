import { pool } from "../db/database";
import { Car } from "../models/car";

export async function getAllCars(): Promise<Car[]> {
    const result = await pool.query(
        `SELECT *
         FROM cars
         ORDER BY brand, model`
    );

    return result.rows;
}