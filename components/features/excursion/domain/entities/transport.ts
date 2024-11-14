export class ExcursionTransport{
    id: number;
    brand: string;
    model: string;
    type: string;
    capacity: number;

    constructor(
        id: number,
        brand: string,
        model: string,
        type: string,
        capacity: number,
    ){
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.capacity =  capacity;
    }
}