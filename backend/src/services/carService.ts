import * as repository from "../repositories/carRepository";

export async function getAllCars() {
    return repository.getAllCars();
}