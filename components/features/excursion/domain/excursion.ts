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
        likes: number
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
    }
}