import { Response } from "express";
import {
    AuthenticatedRequest,
} from "../middleware/authMiddleware";

import * as reservationService
    from "../services/reservationService";

export async function getReservations(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        let reservations;

        if (req.user.role === "ADMIN") {
            reservations =
                await reservationService.getAllReservations();
        } else {
            reservations =
                await reservationService.getReservationsByUserId(
                    req.user.userId
                );
        }

        return res.status(200).json(reservations);
    } catch (error) {
        console.error("Failed to load reservations:", error);

        return res.status(500).json({
            message: "Unable to load reservations",
        });
    }
}

export async function createReservation(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const reservation =
            await reservationService.createReservation({
                user_id: req.user.userId,
                car_id: Number(req.body.car_id),
                start_date: req.body.start_date,
                end_date: req.body.end_date,
            });

        return res.status(201).json(reservation);
    } catch (error) {
        console.error("Failed to create reservation:", error);

        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Unable to create reservation",
        });
    }
}

export async function cancelReservation(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const reservationId = Number(req.params.id);

        await reservationService.cancelReservation(
            reservationId,
            req.user.userId,
            req.user.role
        );

        return res.status(200).json({
            message: "Reservation cancelled successfully",
        });
    } catch (error) {
        return res.status(403).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Unable to cancel reservation",
        });
    }
}