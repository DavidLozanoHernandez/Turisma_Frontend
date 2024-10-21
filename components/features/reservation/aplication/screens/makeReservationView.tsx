import { Text, View, StyleSheet, TextInput } from "react-native";
import { Link } from "expo-router";

export function MakeReservationsView() {
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
    height: 150,
    backgroundColor: '#B35A5A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    backgroundColor: '#50d34e',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    alignSelf: 'center',
    width: '90%',
  },
});
