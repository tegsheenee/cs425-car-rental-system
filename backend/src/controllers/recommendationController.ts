import { Request, Response } from "express";
import * as service from "../services/recommendationService";

export async function getRecommendations(
    req: Request,
    res: Response
) {
    try {
        const maxPrice =
            typeof req.query.maxPrice === "string"
                ? Number(req.query.maxPrice)
                : undefined;

        const seats =
            typeof req.query.seats === "string"
                ? Number(req.query.seats)
                : undefined;

        if (
            (maxPrice !== undefined && Number.isNaN(maxPrice)) ||
            (seats !== undefined && Number.isNaN(seats))
        ) {
            return res.status(400).json({
                message: "Invalid numeric recommendation parameter",
            });
        }

        const recommendations = await service.recommendCars({
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

        return res.json(recommendations);
    } catch (error) {
        console.error("Failed to recommend cars:", error);

        return res.status(500).json({
            message: "Unable to generate recommendations",
        });
    }
}