import { Request, Response } from "express";
import * as service from "../services/carService";

export async function getCars(
    req: Request,
    res: Response
) {
    const cars = await service.getAllCars();

    res.json(cars);
}