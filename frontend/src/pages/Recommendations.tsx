import { useState } from "react";
import api from "../services/api";
import type { Car } from "../types/Car";
import CarCard from "../components/CarCard";

interface RecommendedCar extends Car {
    category_name: string;
    recommendation_score: number;
}

function Recommendations() {
    const [category, setCategory] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [seats, setSeats] = useState("");
    const [transmission, setTransmission] = useState("");
    const [fuelType, setFuelType] = useState("");

    const [cars, setCars] = useState<RecommendedCar[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    async function getRecommendations() {
        try {
            setLoading(true);
            setSearched(true);

            const response = await api.get("/recommendations", {
                params: {
                    category: category || undefined,
                    maxPrice: maxPrice || undefined,
                    seats: seats || undefined,
                    transmission: transmission || undefined,
                    fuelType: fuelType || undefined,
                },
            });

            setCars(response.data);
        } catch (error) {
            console.error("Failed to get recommendations:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>AI Car Recommendations</h1>

            <p>
                Enter your preferences and the system will rank the most suitable
                available cars.
            </p>

            <div className="filter-panel">
                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="">Any Category</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Luxury">Luxury</option>
                </select>

                <input
                    type="number"
                    placeholder="Maximum price"
                    min="0"
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Minimum seats"
                    min="1"
                    value={seats}
                    onChange={(event) => setSeats(event.target.value)}
                />

                <select
                    value={transmission}
                    onChange={(event) => setTransmission(event.target.value)}
                >
                    <option value="">Any Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                </select>

                <select
                    value={fuelType}
                    onChange={(event) => setFuelType(event.target.value)}
                >
                    <option value="">Any Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>

                <button type="button" onClick={getRecommendations}>
                    Get Recommendations
                </button>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"/>
                    <span>Generating recommendations...</span>
                </div>
            ) : searched && cars.length === 0 ? (
                <div className="empty-state">
                    <h3>No recommendations found</h3>
                    <p>Try changing your preferences or increasing the maximum price.</p>
                </div>
            ) : (
                <div className="car-grid">
                    {cars.map((car) => (
                        <div key={car.car_id}>
                        <CarCard car={car} />
                            <p>
                                <strong>Recommendation Score:</strong>{" "}
                                {car.recommendation_score}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Recommendations;