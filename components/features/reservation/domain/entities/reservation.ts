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

    constructor(
        id: number,
        userId: number,
        excursionId: number,
        date: Date,
        statusReserv:string,
        payment: ReservationPayment | null,
        seats: ReservationSeat | null,
    ){
        this.id = id;
        this.userId = userId;
        this.excursionId = excursionId;
        this.date = date;
        this.statusReserv = statusReserv;
        this.payment = payment;
        this.seats = seats;
    }
}