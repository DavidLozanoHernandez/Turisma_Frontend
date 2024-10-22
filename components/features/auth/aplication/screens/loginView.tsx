import { Link, router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import AuthDatasoruceImp from "../../infraestructure/datasources/authDatasoruceImp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginDatasource = new AuthDatasoruceImp();

export function LoginView() {
<<<<<<< HEAD
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
        const data = await loginDatasource.login(username, password);
        const {accessToken, user} = data;

        await AsyncStorage.setItem('authToken', accessToken);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        router.replace('/(tabs)/excursion')
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Ocurrió un error desconocido');
        }
    }
};
  
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Bienvenido, inicia sesión</Text>
  
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Introduce tu correo electrónico"
              value={username}
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
            {error ? <Text>{error}</Text>: null}
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.link}>Iniciar sesión</TouchableOpacity>
          <Link href="/auth/signUp" style={styles.link}>Regístrate</Link>
          <Link href="/auth/optionsLostPassword" style={styles.link}>¿Olvidaste tu contraseña?</Link>
=======
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>¡Bienvenido!<br />Inicia sesión</Text>

        <View style={styles.inputContainer}>
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
>>>>>>> 19fecda61a837d0490d4dbfe444006aa9d86f4a8
        </View>

        <Link href="/home" style={styles.link}>Iniciar sesión</Link>
        <Link href="/auth/signUp" style={styles.link}>Regístrate</Link>
        <Link href="/auth/optionsLostPassword" style={styles.link}>¿Olvidaste tu contraseña?</Link>
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