import { Link } from "expo-router";
import { View, StyleSheet, Text } from "react-native";

export function OptionslostPasswordView() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Elige la opción para restablecer tu contraseña
        </Text>
        <Link href="/auth/checkMail" style={styles.link}>Email</Link>
        <Link href="/auth/checkPhone" style={styles.link}>Teléfono</Link>
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
    marginBottom: 35,
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#28A745',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 7,
    alignSelf: 'center',
    width: '90%',
  },
});
