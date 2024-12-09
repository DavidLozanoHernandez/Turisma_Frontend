export class ReservationPayment{
    id: number;
    reservationId: number;
    date: Date;
    totalCost: number;
    alreadyPay: number;
    partialPay: Boolean;
    status: Boolean;
    dateCompleted: Date;
    reference: string;

    constructor(
        id: number,
        reservationId: number,
        date: Date,
        totalCost: number,
        alreadyPay: number,
        partialPay: Boolean,
        status: Boolean,
        dateCompleted: Date,
        reference: string,
    ){
        this.id = id;
        this.reservationId = reservationId;
        this.date = date;
        this.totalCost = totalCost;
        this.alreadyPay = alreadyPay;
        this.partialPay = partialPay;
        this.status = status;
        this.dateCompleted = dateCompleted;
        this.reference = reference;
    }
}