import { Text, View, FlatList, StyleSheet } from "react-native";
import { useState } from "react";

export function ReservationView() {
  // Simulación de reservaciones
  const [reservations, setReservations] = useState([
    { id: '1', excursion: 'Excursión a la montaña', activities: 'Caminata', transport: "Autobus" },
    { id: '2', excursion: 'Excursión al lago', activities: 'Paseo en lancha', transport: "Autobus" },
    { id: '3', excursion: 'Excursión a la ciudad', activities: 'Tour por el parque del centro', transport: "Combi" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus reservaciones</Text>

      {/* Lista de reservaciones */}
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reservationCard}>
            <Text style={styles.excursion}>{item.excursion}</Text>
            <Text style={styles.activities}>Actividades: {item.activities}</Text>
            <Text style={styles.transport}>Transporte: {item.transport}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f0c29',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
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
  activities: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
  transport: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
});
