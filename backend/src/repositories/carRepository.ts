import { pool } from "../db/database";
import { Car, NewCar } from "../models/car";

export async function addCar(car: NewCar): Promise<Car> {
    const result = await pool.query<Car>(
        `
        INSERT INTO cars
        (
            brand,
            model,
            year,
            category_id,
            daily_rate,
            transmission,
            fuel_type,
            seats,
            available
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `,
        [
            car.brand,
            car.model,
            car.year,
            car.category_id,
            car.daily_rate,
            car.transmission,
            car.fuel_type,
            car.seats,
            car.available
        ]
    );

    return result.rows[0];
}

export async function getAllCars(): Promise<Car[]> {
    const result = await pool.query<Car>(
        `
        SELECT *
        FROM cars
        ORDER BY brand, model
        `
    );

    return result.rows;
}

export async function getCarById(carId: number): Promise<Car | null> {
    const result = await pool.query<Car>(
        `
        SELECT *
        FROM cars
        WHERE car_id = $1
        `,
        [carId]
    );

    return result.rows[0] ?? null;
}

export interface CarSearchFilters {
    category?: string;
    maxPrice?: number;
    seats?: number;
    transmission?: string;
    fuelType?: string;
}

export async function searchCars(
    filters: CarSearchFilters
): Promise<Car[]> {
    const conditions: string[] = ["c.available = TRUE"];
    const values: unknown[] = [];

    if (filters.category) {
        values.push(filters.category);
        conditions.push(`cat.category_name = $${values.length}`);
    }

    if (filters.maxPrice !== undefined) {
        values.push(filters.maxPrice);
        conditions.push(`c.daily_rate <= $${values.length}`);
    }

    if (filters.seats !== undefined) {
        values.push(filters.seats);
        conditions.push(`c.seats >= $${values.length}`);
    }

    if (filters.transmission) {
        values.push(filters.transmission);
        conditions.push(`c.transmission = $${values.length}`);
    }

    if (filters.fuelType) {
        values.push(filters.fuelType);
        conditions.push(`c.fuel_type = $${values.length}`);
    }

    const query = `
        SELECT
            c.*,
            cat.category_name
        FROM cars c
        JOIN categories cat
            ON c.category_id = cat.category_id
        WHERE ${conditions.join(" AND ")}
        ORDER BY c.daily_rate
    `;

    const result = await pool.query<Car>(query, values);

    return result.rows;
}
export async function updateCar(
    carId: number,
    car: NewCar
): Promise<Car | null> {

    const result = await pool.query(
        `
        UPDATE cars
        SET
            brand = $1,
            model = $2,
            year = $3,
            category_id = $4,
            daily_rate = $5,
            transmission = $6,
            fuel_type = $7,
            seats = $8,
            available = $9
        WHERE car_id = $10

        RETURNING *
        `,
        [
            car.brand,
            car.model,
            car.year,
            car.category_id,
            car.daily_rate,
            car.transmission,
            car.fuel_type,
            car.seats,
            car.available,
            carId
        ]
    );

    return result.rows[0] ?? null;
}
export async function deleteCar(carId: number): Promise<boolean> {
    const result = await pool.query(
        `
    DELETE FROM cars
    WHERE car_id = $1
    `,
        [carId]
    );

    return (result.rowCount ?? 0) > 0;
}