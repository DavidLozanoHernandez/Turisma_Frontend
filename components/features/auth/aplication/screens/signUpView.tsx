import { Link, router } from "expo-router";
import { View, StyleSheet, Text, TextInput, Modal } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthDatasoruceImp from "../../infraestructure/datasources/authDatasoruceImp";

const registerDataSource = new AuthDatasoruceImp();

export function SignUpView() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    try{
      const data = await registerDataSource.register(firstName, lastName, password, phone, email)
      console.log("Registro exitoso:", data);

      //quiero un mensaje para informarle al usuario que revise su correo electronico y lo direccione en 10 segundos a login
      setSuccessMessage("Correo electrónico de verificación enviado. Por favor, revisa tu bandeja de entrada.");
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false); // Cerrar el modal
        router.push('/auth/login'); // Redirigir a la pantalla de login
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
        <Text style={styles.title}>REGÍSTRATE CON TU CUENTA</Text>

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
          {error ? <Text>{error}</Text> : null}
        </View>

        <TouchableOpacity onPress={handleRegister} style={styles.link}>Registrarse</TouchableOpacity>
        
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
