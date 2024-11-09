import axios from "axios";
import apiClient from "../../../config/apiClient";
import ReservationSource from "../domain/dataresources/reservationsource";
import { ReservationPayment } from "../domain/entities/payment";
import { ReservationSeat } from "../domain/entities/seat";
import { Reservation } from "../domain/entities/reservation";
import { Excursion } from "../../excursion/domain/excursion";

class ReservationDatasorceImp implements ReservationSource {
    async getReservationId(token: string): Promise<any> {
      try {
        const response = await apiClient.get('reservations/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        // Mapear todas las reservas y transformarlas en objetos de tipo Reservation
        const reservations = response.data.map((data: any) => {
          const payment = data.payment
            ? new ReservationPayment(
                data.payment[0]?.id,
                data.payment[0]?.reservationId,
                data.payment[0]?.date,
                data.payment[0]?.totalCost,
                data.payment[0]?.alreadyPay,
                data.payment[0]?.partialPay,
                data.payment[0]?.status,
                data.payment[0]?.dateCompleted,
                data.payment[0]?.reference
              )
            : null;
  
          const seat = data.seats
            ? new ReservationSeat(
                data.seats[0]?.id,
                data.seats[0]?.reservationId,
                data.seats[0]?.seatNumber
              )
            : null;
  
          const excursion = data.excursion
            ? new Excursion(
                data.excursion.id,
                data.excursion.name,
                data.excursion.description,
                data.excursion.departureDate,
                data.excursion.arrivalDate,
                data.excursion.price,
                data.excursion.duration,
                data.excursion.transportId,
                data.excursion.outPoint,
                data.excursion.status,
                data.excursion.likes
              )
            : null;
  
          return new Reservation(
            data.id,
            data.userId,
            data.excursionId,
            data.date,
            data.statusReserv,
            payment,
            seat,
            excursion
          );
        });
  
        // Retornamos todas las reservas
        return reservations;
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