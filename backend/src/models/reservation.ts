export interface Reservation {
    reservation_id: number;
    user_id: number;
    car_id: number;
    start_date: string;
    end_date: string;
    status: string;
}

export interface NewReservation {
    user_id: number;
    car_id: number;
    start_date: string;
    end_date: string;
}