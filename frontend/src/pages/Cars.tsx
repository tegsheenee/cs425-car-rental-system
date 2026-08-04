import { useEffect, useState } from "react";
import api from "../services/api";
import type { Car } from "../types/Car";
import CarCard from "../components/CarCard";

function Cars() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    const [category, setCategory] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [seats, setSeats] = useState("");
    const [transmission, setTransmission] = useState("");
    const [fuelType, setFuelType] = useState("");

    useEffect(() => {
        loadCars();
    }, []);

    async function loadCars() {
        try {
            setLoading(true);

            const response = await api.get("/cars");
            setCars(response.data);
        } catch (error) {
            console.error("Failed to load cars:", error);
        } finally {
            setLoading(false);
        }
    }

    async function searchCars() {
        try {
            setLoading(true);

            const response = await api.get("/cars/search", {
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
            console.error("Failed to search cars:", error);
        } finally {
            setLoading(false);
        }
    }

    function clearFilters() {
        setCategory("");
        setMaxPrice("");
        setSeats("");
        setTransmission("");
        setFuelType("");

        void loadCars();
    }

    return (
        <>
            <h1>Browse Cars</h1>

            <div className="filter-panel">
                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="">All Categories</option>
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

                <button type="button" onClick={searchCars}>
                    Search
                </button>

                <button type="button" onClick={clearFilters}>
                    Clear
                </button>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"/>
                    <span>Loading cars...</span>
                </div>
            ) : cars.length === 0 ? (
                <div className="empty-state">
                    <h3>No cars found</h3>
                    <p>Try changing your search filters.</p>
                </div>
            ) : (
                <div className="car-grid">
                    {cars.map((car) => (
                        <CarCard key={car.car_id} car={car} />
                    ))}
                </div>
            )}
        </>
    );
}

export default Cars;