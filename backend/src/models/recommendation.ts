export interface RecommendationPreferences {
    category?: string;
    maxPrice?: number;
    seats?: number;
    transmission?: string;
    fuelType?: string;
}

export interface RecommendedCar {
    car_id: number;
    brand: string;
    model: string;
    year: number;
    category_id: number;
    category_name: string;
    daily_rate: number;
    transmission: string;
    fuel_type: string;
    seats: number;
    available: boolean;
    recommendation_score: number;
}