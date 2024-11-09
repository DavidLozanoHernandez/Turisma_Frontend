import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import ReservationDatasorceImp from "../../infraestructure/reservationDatasourceImp";
import { AuthContext } from "../../../auth/aplication/providers/authProvider";

const getreservation = new ReservationDatasorceImp

// Definir el tipo de status
type ReservationStatus = "Pendiente" | "Completa" | "Cancelada";

// Definir el tipo para cada reservación
interface Reservation {
  id: string;
  excursion: string;
  date: string;
  status: ReservationStatus;
}

export function ReservationView() {
  const authContext = useContext(AuthContext)
  const token = authContext?.userToken
  const [error, setError] = useState('');

  //useEffect(() => {
    const handleGetReservation = async () => {
      if (token) {
        try {
          const data = await getreservation.getReservationId(token);
          console.log("Datos de la reservacion", data.seats)
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Ocurrió un error desconocido');
        }
        }
      }
    };
    //handleGetReservation();
  //}, []);

  // Simulación de reservaciones con tipo definido
  const [reservations, setReservations] = useState<Reservation[]>([
    { id: '1', excursion: 'Zacatlán, Puebla', date: '12 al 14 de Noviembre 2024', status: "Pendiente" },
    { id: '2', excursion: 'Excursión al lago', date: '20 al 22 de Octubre 2024', status: "Completa" },
    { id: '3', excursion: 'Excursión a la ciudad', date: '30 al 2 de Diciembre 2024', status: "Cancelada" },
  ]);

  // Función para obtener color del estatus
  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case "Pendiente":
        return "#FFD700"; // Amarillo dorado
      case "Completa":
        return "#32CD32"; // Verde lima
      case "Cancelada":
        return "#FF6347"; // Rojo tomate
      default:
        return "#ccc"; // Gris claro
    }
  };

  return (
    <FlatList
      data={reservations}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.title}>Tus reservaciones</Text>
      }
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.reservationCard} onPress={() => console.log(`Reservación ${item.id} seleccionada`,)}>
          <Text style={styles.excursion}>{item.excursion}</Text>
          <Text style={styles.date}>Fecha: {item.date}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Estatus: </Text>
            <Text style={[styles.statusValue, { color: getStatusColor(item.status) }]}>{item.status}</Text>
          </View>
          <TouchableOpacity onPress={handleGetReservation}><Text>hola</Text></TouchableOpacity>
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
    color: '#fff', // Color blanco para la etiqueta "Estatus:"
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold', // Color dinámico para el valor del estatus
  },
});
