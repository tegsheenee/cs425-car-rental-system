export interface Reservation {
    reservation_id: number;
    user_id: number;
    car_id: number;
    start_date: string;
    end_date: string;
    status: string;
    first_name?: string;
    last_name?: string;
    brand?: string;
    model?: string;
}