import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";

export function ExcursionView() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Detalles de la excursión</Text>

        <Text style={styles.subtitle}>Nombre del destino</Text>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Imagen del destino</Text>
        </View>

        <Text style={styles.subtitle}>Actividades a realizar en el viaje</Text>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Imágenes de las actividades</Text>
        </View>

        <Text style={styles.subtitle}>Tipo de transporte</Text>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Imagen del transporte</Text>
        </View>

        <Text style={styles.subtitle}>Paradas que se van a realizar</Text>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Imagen de las paradas</Text>
        </View>

        <Link href={"/reservation/makeReservation"} style={styles.link}>Realizar reserva</Link>
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
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#f2d323',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    width: '90%',
  },
});
