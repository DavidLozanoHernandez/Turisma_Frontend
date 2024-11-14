import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export function MakeReservationsView() {
  const { nombreExcursion, fechaIda, fechaVuelta } = useLocalSearchParams();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const seats = [
    ["conductor", "pasillo", "pasillo", "copiloto"],
    [true, false, false, "pasillo"],
    [false, false, "pasillo", "pasillo"],
    [false, false, "pasillo", false],
    [false, false,"pasillo", false],
    [false, false,"pasillo", false],
    [false, false, false, false]
  ];

  const handleSelectSeat = (row: number, col: number) => {
    const seatId = `${row}-${col}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const isSeatSelected = (row: number, col: number) => selectedSeats.includes(`${row}-${col}`);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{nombreExcursion || "Cancún, Quintana Roo"}</Text>

        <View style={styles.dateContainer}>
          <Image
            source={{ uri: "https://img.icons8.com/fluency-systems-filled/48/FFFFFF/calendar.png" }}
            style={styles.calendarIcon}
          />
          <Text style={styles.info}>
            <Text style={styles.infoText}>Fecha de ida:</Text> {fechaIda || "10/12/2024"}
          </Text>
        </View>

        <View style={styles.dateContainer}>
          <Image
            source={{ uri: "https://img.icons8.com/fluency-systems-filled/48/FFFFFF/calendar.png" }}
            style={styles.calendarIcon}
          />
          <Text style={styles.info}>
            <Text style={styles.infoText}>Fecha de vuelta:</Text> {fechaVuelta || "15/12/2024"}
          </Text>
        </View>

        <Text style={styles.info}>
          <Text style={styles.infoText}>Número de asientos seleccionados:</Text> {selectedSeats.length}
        </Text>

        <View style={styles.vehicleShape}>
          <View style={styles.seatSelector}>
            {seats.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((seatType, colIndex) => {
                  if (seatType === "pasillo") {
                    return <View key={colIndex} style={styles.pasillo} />;
                  } else if (seatType === "conductor") {
                    return (
                      <View key={colIndex} style={styles.conductor}>
                        <Image
                          source={{ uri: "https://img.icons8.com/ios-glyphs/30/FFFFFF/steering-wheel.png" }}
                          style={styles.icon}
                        />
                      </View>
                    );
                  } else if (seatType === "copiloto") {
                    return (
                      <View key={colIndex} style={styles.conductor}>
                        <Text style={styles.seatText}>Cpto.</Text>
                      </View>
                    );
                  } else {
                    const isOccupied = seatType === true;
                    return (
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
                    );
                  }
                })}
              </View>
            ))}
          </View>
        </View>

        <Link href="/payment" style={styles.link}>Realizar pago</Link>
        <Link href="/excursion" style={styles.linkCancel}>Cancelar</Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#0f0c29',
  },
  card: {
    width: '100%',
    marginTop: 15,
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#FFA500',
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#FFA500',
    paddingBottom: 5,
  },
  info: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff', // Línea blanca de separación
    paddingTop: 5,
    width: '100%',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  calendarIcon: {
    width: 20,
    height: 20,
    marginRight: -25, // Acercar el icono al texto
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 1,
  },
  infoText: {
    color: '#fff',
    fontWeight: "normal",
  },
  vehicleShape: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 20,
    backgroundColor: '#4B4B4B',
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  seatSelector: {
    width: '90%',
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
    backgroundColor: '#28A745',
  },
  occupiedSeat: {
    backgroundColor: '#FF6347',
  },
  selectedSeat: {
    backgroundColor: '#FFD700',
  },
  pasillo: {
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: 'transparent',
  },
  conductor: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 5,
  },
  seatText: {
    color: '#fff',
    fontWeight: 'bold',
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
    backgroundColor: '#FF6347',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    alignSelf: 'center',
    width: '90%',
  },
});
