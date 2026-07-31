export interface Car {
    car_id: number;
    brand: string;
    model: string;
    year: number;
    category_id: number;
    daily_rate: number;
    transmission: string;
    fuel_type: string;
    seats: number;
    available: boolean;
}

export interface NewCar {
    brand: string;
    model: string;
    year: number;
    category_id: number;
    daily_rate: number;
    transmission: string;
    fuel_type: string;
    seats: number;
    available: boolean;
}