import { Request, Response } from "express";
import * as service from "../services/carService";

export async function getCars(
    req: Request,
    res: Response
) {
    const cars = await service.getAllCars();

    res.json(cars);
}
export async function getCarById(
    req: Request,
    res: Response
) {
    try {
        const carId = Number(req.params.id);

        if (Number.isNaN(carId)) {
            return res.status(400).json({
                message: "Invalid car ID",
            });
        }

        const car = await service.getCarById(carId);

        if (!car) {
            return res.status(404).json({
                message: "Car not found",
            });
        }

        return res.json(car);
    } catch (error) {
        console.error("Failed to retrieve car:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
export async function searchCars(
    req: Request,
    res: Response
) {
    try {
        const maxPrice = req.query.maxPrice
            ? Number(req.query.maxPrice)
            : undefined;

        const seats = req.query.seats
            ? Number(req.query.seats)
            : undefined;

        if (
            (maxPrice !== undefined && Number.isNaN(maxPrice)) ||
            (seats !== undefined && Number.isNaN(seats))
        ) {
            return res.status(400).json({
                message: "Invalid numeric search parameter",
            });
        }

        const cars = await service.searchCars({
            category:
                typeof req.query.category === "string"
                    ? req.query.category
                    : undefined,
            maxPrice,
            seats,
            transmission:
                typeof req.query.transmission === "string"
                    ? req.query.transmission
                    : undefined,
            fuelType:
                typeof req.query.fuelType === "string"
                    ? req.query.fuelType
                    : undefined,
        });

        return res.json(cars);
    } catch (error) {
        console.error("Failed to search cars:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
export async function addCar(
    req: Request,
    res: Response
) {
    try {

        const newCar = await service.addCar(req.body);

        return res.status(201).json(newCar);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Unable to create car"
        });

    }
}

export async function updateCar(
    req: Request,
    res: Response
) {

    try {

        const carId = Number(req.params.id);

        const updatedCar =
            await service.updateCar(
                carId,
                req.body
            );

        if (!updatedCar) {

            return res.status(404).json({
                message: "Car not found"
            });

        }

        return res.json(updatedCar);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Unable to update car"
        });

    }

}
export async function deleteCar(
    req: Request,
    res: Response
) {
    try {
        const carId = Number(req.params.id);

        if (Number.isNaN(carId)) {
            return res.status(400).json({
                message: "Invalid car ID",
            });
        }

        const deleted = await service.deleteCar(carId);

        if (!deleted) {
            return res.status(404).json({
                message: "Car not found",
            });
        }

        return res.json({
            message: "Car deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete car:", error);

        return res.status(500).json({
            message: "Unable to delete car",
        });
    }
}