import {
    NewReservation,
    Reservation,
} from "../models/reservation";
import * as repository from "../repositories/reservationRepository";

export async function createReservation(
    reservation: NewReservation
): Promise<Reservation> {
    const startDate = new Date(reservation.start_date);
    const endDate = new Date(reservation.end_date);

    if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime())
    ) {
        throw new Error("Invalid reservation dates");
    }

    if (endDate < startDate) {
        throw new Error(
            "End date cannot be earlier than start date"
        );
    }

    const conflict = await repository.hasDateConflict(
        reservation.car_id,
        reservation.start_date,
        reservation.end_date
    );

    if (conflict) {
        throw new Error(
            "The selected car is not available for those dates"
        );
    }

    return repository.createReservation(reservation);
}
export async function getAllReservations() {
    return repository.getAllReservations();
}

export async function getReservationById(
    reservationId: number
) {
    return repository.getReservationById(reservationId);
}

export async function getReservationsByUserId(
    userId: number
) {
    return repository.getReservationsByUserId(userId);
}
export async function cancelReservation(
    reservationId: number,
    userId: number,
    role: string
) {
    const reservation =
        await repository.getReservationById(reservationId);

    if (!reservation) {
        throw new Error("Reservation not found");
    }

    if (
        role !== "ADMIN" &&
        reservation.user_id !== userId
    ) {
        throw new Error(
            "You are not allowed to cancel this reservation"
        );
    }

    return repository.cancelReservation(reservationId);
}