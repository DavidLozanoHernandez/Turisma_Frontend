import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import ReservationDatasorceImp from "../../infraestructure/reservationDatasourceImp";
import { AuthContext } from "../../../auth/aplication/providers/authProvider";

const getreservation = new ReservationDatasorceImp();

type ReservationStatus = "PENDING" | "COMPLETE" | "CANCELED";

interface Reservation {
  id: string;
  excursion: string;
  startDate: string;
  endDate: string;
  status: ReservationStatus;
}

export function ReservationView() {
  const authContext = useContext(AuthContext);
  const token = authContext?.userToken;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const handleGetReservation = async () => {
      if (token) {
        try {
          setLoading(true);
          const data = await getreservation.getReservationId(token);

          //console.log("Respuesta de la API: ", data);

          if (Array.isArray(data)) {
            const formattedReservations = data.map((reservationData: any) => {
              const startDate = new Date(reservationData.excursion.departureDate);
              const endDate = new Date(reservationData.excursion.arrivalDate);
            
              if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
              }
            
              return {
                id: reservationData.id.toString(),
                excursion: reservationData.excursion.name,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                status: reservationData.statusReserv as ReservationStatus,
              };
            });
            

            setReservations(formattedReservations.filter((reservation) => reservation !== null));
          } else {
            setError("La respuesta no contiene datos válidos.");
          }
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Ocurrió un error desconocido');
          }
        } finally {
          setLoading(false);
        }
      }
    };

    handleGetReservation();
  }, [token]);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
  
    return date.toLocaleDateString("es-ES", options);
  };

  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case "PENDING":
        return "#FFD700";
      case "COMPLETE":
        return "#32CD32";
      case "CANCELED":
        return "#FF6347";
      default:
        return "#ccc";
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando reservaciones...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reservations}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.title}>Tus reservaciones</Text>
      }
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.reservationCard} onPress={() => console.log(`Reservación ${item.id} seleccionada`)}>
          <Text style={styles.excursion}>{item.excursion}</Text>
          <Text style={styles.date}>Salida: {item.startDate}</Text>
          <Text style={styles.date}>Regreso: {item.endDate}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Estatus: </Text>
            <Text style={[styles.statusValue, { color: getStatusColor(item.status) }]}>{item.status}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0f0c29',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 50,
    textAlign: 'center',
  },
  reservationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  excursion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusLabel: {
    fontSize: 16,
    color: '#fff',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0c29',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0c29',
  },
  errorText: {
    color: '#FF6347',
    fontSize: 18,
  },
});
