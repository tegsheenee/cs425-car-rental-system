import * as repository from "../repositories/carRepository";
import { NewCar } from "../models/car";

export async function getAllCars() {
    return repository.getAllCars();
}

export async function getCarById(carId: number) {
    return repository.getCarById(carId);
}

export async function searchCars(
    filters: repository.CarSearchFilters
) {
    return repository.searchCars(filters);
}

export async function addCar(car: NewCar) {
    return repository.addCar(car);
}
export async function updateCar(
    carId: number,
    car: NewCar
) {
    return repository.updateCar(carId, car);
}
export async function deleteCar(carId: number) {
    return repository.deleteCar(carId);
}