import axios from "axios";
import Excursionsource from "../../domain/dataresources/excursionsource";
import apiClient from "../../../../config/apiClient";
import { ExcursionPhotos } from "../../domain/entities/photos";
import { Excursion } from "../../domain/entities/excursion";
import { ExcursionStopPoints } from "../../domain/entities/stopPoints";
import { ExcursionActivities } from "../../domain/entities/activities";
import { ExcursionTransport } from "../../domain/entities/transport";

class ExcursionDatasourceImp implements Excursionsource {
    async getExcursions(token: string): Promise<any> {
        try {
            const response = await apiClient.get("excursions/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const excursions = response.data.map((data: any) => {
                const photos = data.photos && Array.isArray(data.photos)
                    ? new ExcursionPhotos(data.photos.map((photo: any) => photo.imageUrl))
                    : null;

                return new Excursion(
                    data.id,
                    data.name,
                    data.description || '',
                    data.departureDate,
                    data.arrivalDate || '',
                    data.price,
                    data.duration || 0,
                    data.transportId || '',
                    data.outPoint || '',
                    data.status,
                    data.likes,
                    photos,
                    data.stopPoints,
                    data.trasport
                );
            });

            return excursions;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Fallo en la consulta de excursiones");
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Ocurrió un error desconocido");
            }
        }
    }

    async getExcursionsId(token: string, id: number): Promise<any> {
        try {
            const response = await apiClient.get(`excursions/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

        const data = response.data;

        const photos = data.photos && Array.isArray(data.photos)
            ? data.photos.map((photo: any) => photo.imageUrl)
            : [];

        const stopPoints = data.stopPoints && Array.isArray(data.stopPoints)
            ? data.stopPoints.map((stopPoint: any) => {
                const activities = stopPoint.activities.map((activity: any) => ({
                    id: activity.id,
                    name: activity.name,
                    description: activity.description,
                }));

                return {
                    id: stopPoint.id,
                    name: stopPoint.name,
                    activities: activities,
                };
            })
            : [];

        const transport = data.transport ? {
            id: data.transport.id,
            brand: data.transport.brand,
            model: data.transport.model,
            type: data.transport.type,
            capacity: data.transport.capacity,
        } : null;

        const excursion = {
            id: data.id,
            name: data.name,
            description: data.description,
            departureDate: data.departureDate,
            arrivalDate: data.arrivalDate,
            price: data.price,
            duration: data.duration,
            transportId: data.transportId,
            outPoint: data.outPoint,
            status: data.status,
            likes: data.likes,
            photos: photos,
            stopPoints: stopPoints,
            transport: transport,
        };

        return excursion;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Fallo en la consulta de excursiones");
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Ocurrió un error desconocido");
            }
        }
    }
}

export default ExcursionDatasourceImp;
