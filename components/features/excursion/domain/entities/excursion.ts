import { ExcursionPhotos } from "./photos";
import { ExcursionStopPoints } from "./stopPoints";
import { ExcursionTransport } from "./transport";

export class Excursion{
    id: number;
    name: string;
    description: string;
    departureDate: Date | null;
    arrivalDate: Date | null;
    price: number;
    duration: string;
    transportId: number | null;
    outPoint: string;
    status: string;
    likes: number;
    photos: ExcursionPhotos | null;
    stopPoints: ExcursionStopPoints | null;
    trasport: ExcursionTransport | null;

    constructor(
        id: number,
        name: string,
        description: string,
        departureDate: Date | null,
        arrivalDate: Date | null,
        price: number,
        duration: string,
        transportId: number | null,
        outPoint: string,
        status: string,
        likes: number,
        phothos: ExcursionPhotos | null,
        stopPoints: ExcursionStopPoints | null,
        trasport: ExcursionTransport | null,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.price = price;
        this.duration = duration;
        this.transportId = transportId;
        this.outPoint = outPoint;
        this.status = status;
        this.likes = likes;
        this.photos = phothos;
        this.stopPoints = stopPoints;
        this.trasport = trasport;
    }
}