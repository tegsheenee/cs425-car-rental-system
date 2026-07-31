import { pool } from "../db/database";
import {
    NewReservation,
    Reservation,
} from "../models/reservation";

export async function hasDateConflict(
    carId: number,
    startDate: string,
    endDate: string
): Promise<boolean> {
    const result = await pool.query(
        `
    SELECT 1
    FROM reservations
    WHERE car_id = $1
      AND status = 'Reserved'
      AND start_date <= $3
      AND end_date >= $2
    LIMIT 1
    `,
        [carId, startDate, endDate]
    );

    return result.rowCount !== null && result.rowCount > 0;
}

export async function createReservation(
    reservation: NewReservation
): Promise<Reservation> {
    const result = await pool.query<Reservation>(
        `
    INSERT INTO reservations
      (user_id, car_id, start_date, end_date, status)
    VALUES
      ($1, $2, $3, $4, 'Reserved')
    RETURNING *
    `,
        [
            reservation.user_id,
            reservation.car_id,
            reservation.start_date,
            reservation.end_date,
        ]
    );

    return result.rows[0];
}
export async function getAllReservations(): Promise<Reservation[]> {
    const result = await pool.query<Reservation>(
        `
    SELECT
      r.*,
      u.first_name,
      u.last_name,
      c.brand,
      c.model
    FROM reservations r
    JOIN users u
      ON r.user_id = u.user_id
    JOIN cars c
      ON r.car_id = c.car_id
    ORDER BY r.reservation_id
    `
    );

    return result.rows;
}

export async function getReservationById(
    reservationId: number
): Promise<Reservation | null> {
    const result = await pool.query<Reservation>(
        `
    SELECT
      r.*,
      u.first_name,
      u.last_name,
      c.brand,
      c.model
    FROM reservations r
    JOIN users u
      ON r.user_id = u.user_id
    JOIN cars c
      ON r.car_id = c.car_id
    WHERE r.reservation_id = $1
    `,
        [reservationId]
    );

    return result.rows[0] ?? null;
}
export async function cancelReservation(
    reservationId: number
): Promise<Reservation | null> {
    const result = await pool.query<Reservation>(
        `
    UPDATE reservations
    SET status = 'Cancelled'
    WHERE reservation_id = $1
      AND status <> 'Cancelled'
    RETURNING *
    `,
        [reservationId]
    );

    return result.rows[0] ?? null;
}