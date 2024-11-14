export default interface ReservationSource{
    getReservationId(token: string): Promise<any>;
}