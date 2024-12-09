import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";

export function MakeReservationsView() {
  // Estado para almacenar los asientos seleccionados (array de strings, donde cada string es un identificador del asiento)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Simulación de asientos (true = ocupado, false = libre)
  const seats: boolean[][] = [
    [false, true, false, false],
    [false, false, true, false],
    [true, false, false, false],
    [false, false, false, true],
  ];

  // Función para manejar la selección de asientos
  const handleSelectSeat = (row: number, col: number) => {
    const seatId = `${row}-${col}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Función para verificar si un asiento está seleccionado
  const isSeatSelected = (row: number, col: number) => selectedSeats.includes(`${row}-${col}`);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Realiza tu reserva</Text>

        <TextInput
          style={styles.input}
          placeholder="Excursión"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Número de asientos"
          placeholderTextColor="#ccc"
        />

        <View style={styles.seatSelector}>
          <Text style={styles.seatText}>Tablero para elegir los asientos</Text>

          {/* Simulación del tablero de asientos */}
          <View style={styles.grid}>
            {seats.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((isOccupied, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={[
                      styles.seat,
                      isOccupied ? styles.occupiedSeat : styles.availableSeat,
                      isSeatSelected(rowIndex, colIndex) && styles.selectedSeat,
                    ]}
                    onPress={() => !isOccupied && handleSelectSeat(rowIndex, colIndex)}
                    disabled={isOccupied}
                  >
                    <Text style={styles.seatText}>{isOccupied ? "X" : "O"}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>

        <Link href="/payment" style={styles.link}>Realizar pago</Link>

        <Link href="/excursion" style={styles.linkCancel}>Cancelar</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0f0c29',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    shadowColor: "#036",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#000',
  },
  seatSelector: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#B35A5A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  seatText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grid: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  seat: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  availableSeat: {
    backgroundColor: '#28A745', // Verde para asientos disponibles
  },
  occupiedSeat: {
    backgroundColor: '#FF6347', // Rojo para asientos ocupados
  },
  selectedSeat: {
    backgroundColor: '#FFD700', // Amarillo para asientos seleccionados
  },
  link: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    alignSelf: 'center',
    width: '90%',
  },
  linkCancel: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#50d34e',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    alignSelf: 'center',
    width: '90%',
  },
});
