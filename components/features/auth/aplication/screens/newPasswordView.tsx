import { Link } from "expo-router";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useState } from "react";

export function NewPasswordView() {
  const [newPassword, setNewPassword] = useState(""); // Estado para almacenar la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ingresa tu nueva contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholderTextColor="#ccc"
        />
                <TextInput
          style={styles.input}
          placeholder="Confirma tu contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#ccc"
        />

        <Link href="/auth/login" style={styles.link}>Cambiar contraseña</Link>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 35,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  link: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#28A745',
    paddingVertical: 8, // Espaciado arriba y abajo
    paddingHorizontal: 20, // Espaciado lateral para reducir el ancho
    borderRadius: 7,
    alignSelf: 'center',  // Centra el botón en el contenedor
    width: '80%',  // Limita el ancho del enlace
  },
});
