import { Request, Response } from "express";
import * as service from "../services/reservationService";

export async function createReservation(
    req: Request,
    res: Response
) {
    try {
        const {
            user_id,
            car_id,
            start_date,
            end_date,
        } = req.body;

        if (
            !user_id ||
            !car_id ||
            !start_date ||
            !end_date
        ) {
            return res.status(400).json({
                message:
                    "user_id, car_id, start_date, and end_date are required",
            });
        }

        const reservation =
            await service.createReservation({
                user_id: Number(user_id),
                car_id: Number(car_id),
                start_date,
                end_date,
            });

        return res.status(201).json(reservation);
    } catch (error) {
        console.error(
            "Failed to create reservation:",
            error
        );

        const message =
            error instanceof Error
                ? error.message
                : "Unable to create reservation";

        if (
            message.includes("not available") ||
            message.includes("Invalid") ||
            message.includes("earlier")
        ) {
            return res.status(400).json({
                message,
            });
        }

        return res.status(500).json({
            message: "Unable to create reservation",
        });
    }
}
export async function getReservations(
    _req: Request,
    res: Response
) {
    try {
        const reservations =
            await service.getAllReservations();

        return res.json(reservations);
    } catch (error) {
        console.error(
            "Failed to retrieve reservations:",
            error
        );

        return res.status(500).json({
            message: "Unable to retrieve reservations",
        });
    }
}

export async function getReservationById(
    req: Request,
    res: Response
) {
    try {
        const reservationId = Number(req.params.id);

        if (Number.isNaN(reservationId)) {
            return res.status(400).json({
                message: "Invalid reservation ID",
            });
        }

        const reservation =
            await service.getReservationById(
                reservationId
            );

        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found",
            });
        }

        return res.json(reservation);
    } catch (error) {
        console.error(
            "Failed to retrieve reservation:",
            error
        );

        return res.status(500).json({
            message: "Unable to retrieve reservation",
        });
    }
}
export async function cancelReservation(
    req: Request,
    res: Response
) {
    try {
        const reservationId = Number(req.params.id);

        if (Number.isNaN(reservationId)) {
            return res.status(400).json({
                message: "Invalid reservation ID",
            });
        }

        const reservation =
            await service.cancelReservation(reservationId);

        if (!reservation) {
            return res.status(404).json({
                message:
                    "Reservation not found or already cancelled",
            });
        }

        return res.json({
            message: "Reservation cancelled successfully",
            reservation,
        });
    } catch (error) {
        console.error(
            "Failed to cancel reservation:",
            error
        );

        return res.status(500).json({
            message: "Unable to cancel reservation",
        });
    }
}