import { useNavigate } from "react-router-dom";
import type { Car } from "../types/Car";
import { getCarImage } from "../utils/carImages";

interface CarCardProps {
    car: Car;
}

function CarCard({ car }: CarCardProps) {
    const navigate = useNavigate();

    function reserveCar() {
        navigate("/reservations", {
            state: {
                selectedCarId: car.car_id,
                selectedCarName: `${car.brand} ${car.model}`,
            },
        });
    }

    return (
        <article className="car-card">
            <img
                className="car-image"
                src={getCarImage(car.brand, car.model)}
                alt={`${car.brand} ${car.model}`}
            />
            <div className="car-card-header">
                <div>
                    <p className="car-category">Vehicle</p>

                    <h3>
                        {car.brand} {car.model}
                    </h3>

                    <p className="car-year">{car.year}</p>
                </div>

                <div className="price-badge">
                    <strong>${car.daily_rate}</strong>
                    <span>per day</span>
                </div>
            </div>

            <div className="car-details">
                <p>
                    <span>👥</span>
                    <strong>Seats:</strong> {car.seats}
                </p>

                <p>
                    <span>⚙️</span>
                    <strong>Transmission:</strong> {car.transmission}
                </p>

                <p>
                    <span>⛽</span>
                    <strong>Fuel:</strong> {car.fuel_type}
                </p>
            </div>

            <div className="availability-row">
        <span
            className={
                car.available
                    ? "availability-badge available"
                    : "availability-badge unavailable"
            }
        >
          {car.available ? "Available" : "Unavailable"}
        </span>
            </div>

            <button
                type="button"
                className="reserve-button"
                onClick={reserveCar}
                disabled={!car.available}
            >
                {car.available ? "Reserve This Car" : "Not Available"}
            </button>
        </article>
    );
}

export default CarCard;