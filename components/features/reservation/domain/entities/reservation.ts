import { Excursion } from "../../../excursion/domain/entities/excursion";
import { ReservationPayment } from "./payment";
import { ReservationSeat } from "./seat";

export class Reservation{
    id: number;
    userId: number;
    excursionId: number;
    date: Date;
    statusReserv:string;
    payment: ReservationPayment | null;
    seats: ReservationSeat | null;
    excursion: Excursion | null;

    constructor(
        id: number,
        userId: number,
        excursionId: number,
        date: Date,
        statusReserv:string,
        payment: ReservationPayment | null,
        seats: ReservationSeat | null,
        excursion: Excursion | null,
    ){
        this.id = id;
        this.userId = userId;
        this.excursionId = excursionId;
        this.date = date;
        this.statusReserv = statusReserv;
        this.payment = payment;
        this.seats = seats;
        this.excursion = excursion
    }
}