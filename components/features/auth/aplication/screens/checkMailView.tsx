import { Link, router, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import AuthDatasoruceImp from "../../infraestructure/datasources/authDatasoruceImp";

const sendDatasource = new AuthDatasoruceImp

export function CheckMailView() {
  const { method } = useLocalSearchParams<{ method: 'email' | 'sms' }>();
  const [email, setEmail] = useState(""); // Estado para almacenar el correo
  const [error, setError] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handsend = async () => {
    try{
    const data = await sendDatasource.sendVerification(email, method);

    setSuccessMessage("Token de verificación enviado. Por favor, revisa tu bandeja de entrada.");
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false); // Cerrar el modal
        router.push(`/auth/newPassword?email=${email}&method=${method}`)
      }, 10000); // 10 segundos en milisegundos
    }catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }else{
        setError('Ocurrio un error desconocido')
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Por favor, verifica tu correo electrónico para confirmar tu cuenta
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#ccc"
        />
        {error ? <Text>{error}</Text> : null}

        {/* Enlace modificado para incluir el email y el método en la URL */}
        <TouchableOpacity style={styles.link} onPress={handsend}>Enviar</TouchableOpacity>
      </View>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{successMessage}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
