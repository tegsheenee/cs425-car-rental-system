import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import api from "../services/api";
import type { Car } from "../types/Car";
import type { Reservation } from "../types/Reservation";

interface ReservationLocationState {
    selectedCarId?: number;
    selectedCarName?: string;
}

function Reservations() {
    const location = useLocation();

    const locationState =
        location.state as ReservationLocationState | null;

    const selectedCarId =
        locationState?.selectedCarId !== undefined
            ? String(locationState.selectedCarId)
            : "";

    const [cars, setCars] = useState<Car[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const [carId, setCarId] = useState(selectedCarId);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        void loadPageData();
    }, []);

    useEffect(() => {
        if (selectedCarId) {
            setCarId(selectedCarId);
        }
    }, [selectedCarId]);

    function isPastReservation(endDateValue: string): boolean {
        const reservationEndDate = new Date(endDateValue);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return reservationEndDate < today;
    }

    async function loadPageData() {
        try {
            setLoading(true);

            const [carsResponse, reservationsResponse] =
                await Promise.all([
                    api.get<Car[]>("/cars"),
                    api.get<Reservation[]>("/reservations"),
                ]);

            setCars(carsResponse.data);
            setReservations(reservationsResponse.data);
        } catch (error) {
            console.error("Failed to load reservation page:", error);
            setMessage("Unable to load reservation information.");
        } finally {
            setLoading(false);
        }
    }

    async function loadReservations() {
        try {
            const response =
                await api.get<Reservation[]>("/reservations");

            setReservations(response.data);
        } catch (error) {
            console.error("Failed to load reservations:", error);
            setMessage("Unable to load reservations.");
        }
    }

    async function createReservation() {
        setMessage("");

        if (!carId || !startDate || !endDate) {
            setMessage("Please select a car and complete both dates.");
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            setMessage("End date cannot be earlier than start date.");
            return;
        }

        try {
            const userData = localStorage.getItem("user");

            if (!userData) {
                setMessage("Please log in before creating a reservation.");
                return;
            }

            await api.post("/reservations", {
                car_id: Number(carId),
                start_date: startDate,
                end_date: endDate,
            });

            setMessage("Reservation created successfully.");
            setCarId("");
            setStartDate("");
            setEndDate("");

            await loadReservations();
        } catch (error: unknown) {
            console.error("Failed to create reservation:", error);

            let errorMessage = "Unable to create reservation.";

            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
            ) {
                const responseError = error as {
                    response?: {
                        data?: {
                            message?: string;
                        };
                    };
                };

                errorMessage =
                    responseError.response?.data?.message ??
                    errorMessage;
            }

            setMessage(errorMessage);
        }
    }

    async function cancelReservation(reservationId: number) {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this reservation?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/reservations/${reservationId}`);

            setMessage("Reservation cancelled successfully.");
            await loadReservations();
        } catch (error) {
            console.error("Failed to cancel reservation:", error);
            setMessage("Unable to cancel reservation.");
        }
    }

    const activeReservations = reservations.filter(
        (reservation) =>
            reservation.status !== "Cancelled" &&
            !isPastReservation(reservation.end_date)
    );

    const pastReservations = reservations.filter(
        (reservation) =>
            reservation.status !== "Cancelled" &&
            isPastReservation(reservation.end_date)
    );

    const cancelledReservations = reservations.filter(
        (reservation) =>
            reservation.status === "Cancelled"
    );

    function renderReservationCard(
        reservation: Reservation,
        showCancelButton: boolean
    ) {
        return (
            <article
                className="reservation-card"
                key={reservation.reservation_id}
            >
                <h3>Reservation #{reservation.reservation_id}</h3>

                <p>
                    <strong>Customer:</strong>{" "}
                    {reservation.first_name &&
                    reservation.last_name
                        ? `${reservation.first_name} ${reservation.last_name}`
                        : `User ${reservation.user_id}`}
                </p>

                <p>
                    <strong>Car:</strong>{" "}
                    {reservation.brand && reservation.model
                        ? `${reservation.brand} ${reservation.model}`
                        : `Car ${reservation.car_id}`}
                </p>

                <p>
                    <strong>Start date:</strong>{" "}
                    {reservation.start_date.slice(0, 10)}
                </p>

                <p>
                    <strong>End date:</strong>{" "}
                    {reservation.end_date.slice(0, 10)}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {reservation.status === "Cancelled"
                        ? "Cancelled"
                        : isPastReservation(reservation.end_date)
                            ? "Completed"
                            : reservation.status}
                </p>

                {showCancelButton && (
                    <button
                        type="button"
                        onClick={() =>
                            cancelReservation(reservation.reservation_id)
                        }
                    >
                        Cancel Reservation
                    </button>
                )}
            </article>
        );
    }

    return (
        <>
            <h1>Reservations</h1>

            <section className="reservation-form">
                <h2>Make a Reservation</h2>

                <label>
                    Select car
                    <select
                        value={carId}
                        onChange={(event) => setCarId(event.target.value)}
                    >
                        <option value="">Choose a car</option>

                        {cars.map((car) => (
                            <option
                                key={car.car_id}
                                value={car.car_id}
                                disabled={!car.available}
                            >
                                {car.brand} {car.model} — ${car.daily_rate}/day
                                {!car.available ? " — Unavailable" : ""}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Start date
                    <input
                        type="date"
                        value={startDate}
                        onChange={(event) =>
                            setStartDate(event.target.value)
                        }
                    />
                </label>

                <label>
                    End date
                    <input
                        type="date"
                        value={endDate}
                        min={startDate || undefined}
                        onChange={(event) =>
                            setEndDate(event.target.value)
                        }
                    />
                </label>

                <button
                    type="button"
                    onClick={createReservation}
                >
                    Create Reservation
                </button>

                {message && (
                    <div
                        className={
                            message.toLowerCase().includes("success")
                                ? "alert alert-success"
                                : "alert alert-error"
                        }
                    >
                        {message}
                    </div>
                )}
            </section>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner" />
                    <span>Loading reservations...</span>
                </div>
            ) : (
                <>
                    <section>
                        <h2>Upcoming and Current Reservations</h2>

                        {activeReservations.length === 0 ? (
                            <div className="empty-state">
                                <h3>No active reservations</h3>
                                <p>
                                    Your upcoming reservations will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="reservation-list">
                                {activeReservations.map((reservation) =>
                                    renderReservationCard(reservation, true)
                                )}
                            </div>
                        )}
                    </section>

                    <section style={{ marginTop: "32px" }}>
                        <h2>Past Reservations</h2>

                        {pastReservations.length === 0 ? (
                            <div className="empty-state">
                                <h3>No past reservations</h3>
                                <p>
                                    Completed reservations will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="reservation-list">
                                {pastReservations.map((reservation) =>
                                    renderReservationCard(reservation, false)
                                )}
                            </div>
                        )}
                    </section>

                    <section style={{ marginTop: "32px" }}>
                        <h2>Cancelled Reservations</h2>

                        {cancelledReservations.length === 0 ? (
                            <div className="empty-state">
                                <h3>No cancelled reservations</h3>
                                <p>
                                    Cancelled reservations will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="reservation-list">
                                {cancelledReservations.map((reservation) =>
                                    renderReservationCard(reservation, false)
                                )}
                            </div>
                        )}
                    </section>
                </>
            )}
        </>
    );
}

export default Reservations;