import {
    RecommendationPreferences,
    RecommendedCar,
} from "../models/recommendation";
import * as repository from "../repositories/recommendationRepository";

function normalize(value?: string): string | undefined {
    return value?.trim().toLowerCase();
}

export async function recommendCars(
    preferences: RecommendationPreferences
): Promise<RecommendedCar[]> {
    const cars = await repository.getAvailableCars();

    const preferredCategory = normalize(preferences.category);
    const preferredTransmission = normalize(preferences.transmission);
    const preferredFuelType = normalize(preferences.fuelType);

    const scoredCars = cars.map((car) => {
        let score = 0;

        if (
            preferredCategory &&
            normalize(car.category_name) === preferredCategory
        ) {
            score += 40;
        }

        if (
            preferences.maxPrice !== undefined &&
            Number(car.daily_rate) <= preferences.maxPrice
        ) {
            score += 25;
        }

        if (
            preferences.seats !== undefined &&
            car.seats >= preferences.seats
        ) {
            score += 15;
        }

        if (
            preferredTransmission &&
            normalize(car.transmission) === preferredTransmission
        ) {
            score += 10;
        }

        if (
            preferredFuelType &&
            normalize(car.fuel_type) === preferredFuelType
        ) {
            score += 10;
        }

        return {
            ...car,
            recommendation_score: score,
        };
    });

    return scoredCars
        .filter((car) => car.recommendation_score > 0)
        .sort((a, b) => {
            if (b.recommendation_score !== a.recommendation_score) {
                return b.recommendation_score - a.recommendation_score;
            }

            return Number(a.daily_rate) - Number(b.daily_rate);
        })
        .slice(0, 5);
}