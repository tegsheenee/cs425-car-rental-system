export function getCarImage(
    brand: string,
    model: string
): string {

    const key =
        `${brand}-${model}`
            .toLowerCase()
            .replace(/\s+/g, "-");

    switch (key) {

        case "toyota-camry":
            return "/images/toyota_camry.png";

        case "honda-cr-v":
            return "/images/honda-crv.png";

        case "ford-f-150":
            return "/images/ford-f150.png";

        case "bmw-x5":
            return "/images/bmw-x5.png";

        case "tesla-model-3":
            return "/images/tesla-model3.png";

        default:
            return "/images/default-car.png";
    }
}