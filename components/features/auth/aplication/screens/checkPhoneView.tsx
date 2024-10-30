import { Link, router, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import AuthDatasoruceImp from "../../infraestructure/datasources/authDatasoruceImp";

const sendDatasource = new AuthDatasoruceImp

export function CheckPhoneView() {
  const {method} = useLocalSearchParams<{method: 'email' | 'sms'}>();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handsend = async () => {
    try {
      const data = await sendDatasource.sendVerification(phone, method);

      setSuccessMessage("Token de verificación enviado. Por favor, revisa tu bandeja de entrada.");
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        router.push(`/auth/newPassword?email=${phone}&method=${method}`)
      }, 10000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrio un error desconocido')
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Por favor, verifica tu número de teléfono para confirmar tu cuenta
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#ccc"
        />

<TouchableOpacity onPress={handsend}><Text style={styles.link}>Enviar</Text></TouchableOpacity>

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
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 7,
    alignSelf: 'center',
    width: '90%',
  },
});
