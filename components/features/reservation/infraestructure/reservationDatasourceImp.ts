import axios from "axios";
import apiClient from "../../../config/apiClient";
import ReservationSource from "../domain/dataresources/reservationsource";
import { ReservationPayment } from "../domain/entities/payment";
import { ReservationSeat } from "../domain/entities/seat";
import { Reservation } from "../domain/entities/reservation";

class ReservationDatasorceImp implements ReservationSource{
    async getReservationId(token: string): Promise<any> {
        try {
            const response = await apiClient.get('reservations/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Extraemos los datos de la respuesta
            const data = response.data[0];  // Suponiendo que solo hay una reserva por solicitud

           
            const payment = data.payment ? new ReservationPayment(
                data.payment[0]?.id,
                data.payment[0]?.reservationId,
                data.payment[0]?.date,
                data.payment[0]?.totalCost,
                data.payment[0]?.alreadyPay,
                data.payment[0]?.partialPay,
                data.payment[0]?.status,
                data.payment[0]?.dateCompleted,
                data.payment[0]?.reference
            ) : null;

            const seat = data.seats ? new ReservationSeat(
                data.seats[0]?.id,
                data.seats[0]?.reservationId,
                data.seats[0]?.seatNumber
            ) : null;

           
            const reservation = new Reservation(
                data.id,
                data.userId,
                data.excursionId,
                data.date,
                data.statusReserv,
                payment, 
                seat     
            );

            // Retornamos la reserva junto con el pago y el asiento
            return reservation

        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Fallo en el registro');
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocurrió un error desconocido');
            }
        }
    }
}

export default ReservationDatasorceImp