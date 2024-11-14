export class ReservationSeat{
    id: number;
    reservationId: number;
    seatNumber: string;

    constructor(
        id: number,
        reservationId: number,
        seatNumber: string,
    ){
        this.id = id;
        this.reservationId = reservationId;
        this.seatNumber = seatNumber;
    }
}