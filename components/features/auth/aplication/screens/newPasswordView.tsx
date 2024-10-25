import { Link, router, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, TextInput, Modal } from "react-native";
import { useState } from "react";
import AuthDatasoruceImp from "../../infraestructure/datasources/authDatasoruceImp";
import { TouchableOpacity } from "react-native-gesture-handler";

const newPasword = new AuthDatasoruceImp();

export function NewPasswordView() {
  const { method, email } = useLocalSearchParams<{ method: 'email' | 'sms', email: string }>();
  console.log(email)
  const [newPassword, setNewPassword] = useState(""); // Estado para almacenar la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("")
  const [error, setError] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    try{
      const data = await newPasword.changepassword(email, newPassword, token)
      console.log(email, newPassword, token)
      console.log("Registro exitoso:", data);

      //quiero un mensaje para informarle al usuario que revise su correo electronico y lo direccione en 10 segundos a login
      setSuccessMessage("Cambio de contraseña exitoso, volveras a login para poder acceder a tu cuenta");
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false); // Cerrar el modal
        router.push('/auth/login'); // Redirigir a la pantalla de login
      }, 10000); // 10 segundos en milisegundos

    }catch (err) {
      console.log(email, newPassword, token)
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

<TextInput
          style={styles.input}
          placeholder="Token"
          value={token}
          onChangeText={setToken}
          //secureTextEntry
          placeholderTextColor="#ccc"
        />
        {error ? <Text>{error}</Text> : null}

        <TouchableOpacity onPress={handleRegister} style={styles.link}>Cambiar contraseña</TouchableOpacity>
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
    paddingVertical: 8, // Espaciado arriba y abajo
    paddingHorizontal: 20, // Espaciado lateral para reducir el ancho
    borderRadius: 7,
    alignSelf: 'center',  // Centra el botón en el contenedor
    width: '80%',  // Limita el ancho del enlace
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
