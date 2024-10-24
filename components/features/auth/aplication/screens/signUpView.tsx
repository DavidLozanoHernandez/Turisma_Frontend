import { Link } from "expo-router";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useState } from "react";

export function SignUpView() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>¡Bienvenido! Regístrate</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Introduce tu nombre"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Introduce tu apellido"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Introduce tu teléfono"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Introduce tu correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#ccc"
          />
        </View>

        <Link href="/auth/codeAuthentication" style={styles.link}>Registrarse</Link>
        <Link href="/auth/login" style={styles.link}>¿Ya tienes una cuenta? Inicia sesión</Link>
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
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
