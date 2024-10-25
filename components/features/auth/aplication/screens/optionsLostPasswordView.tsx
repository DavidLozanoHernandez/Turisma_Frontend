import { useRouter } from "expo-router";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export function OptionslostPasswordView() {
  const router = useRouter(); // Hook de Expo Router

  // Función para manejar la navegación
  const handleOptionPress = (method: 'email' | 'sms') => {
    // Usa un formato de query string para pasar los parámetros
    if (method === 'email') {
      router.push(`/auth/checkMail?method=${method}`);  // Enviando el parámetro 'method'
    } else if (method === 'sms') {
      router.push(`/auth/checkPhone?method=${method}`);  // Enviando el parámetro 'method'
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Elige la opción para restablecer tu contraseña
        </Text>

        {/* Botón para Email */}
        <TouchableOpacity
          style={styles.link}
          onPress={() => handleOptionPress('email')}
        >
          <Text style={styles.linkText}>Email</Text>
        </TouchableOpacity>

        {/* Botón para Teléfono */}
        <TouchableOpacity
          style={styles.link}
          onPress={() => handleOptionPress('sms')}
        >
          <Text style={styles.linkText}>Teléfono</Text>
        </TouchableOpacity>
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
  linkText: {
    color: '#fff',
    textAlign: 'center',
  },
});
