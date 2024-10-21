import { useState } from "react";
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export function CustomerView() {

    const [modalVisible, setModalVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.contenedor}>
                <Image
                    source={{ uri: "https://th.bing.com/th/id/OIP.Crq9sn3Qu3HyHwPJi2zW8QHaHa?rs=1&pid=ImgDetMain" }}
                    style={styles.imagen}
                />
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Nombre:</Text>
                    <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor={"rgba(255, 255, 255, 0.20)"} />

                    <Text style={styles.text}>Apellido:</Text>
                    <TextInput style={styles.input} placeholder="Apellido" placeholderTextColor={"rgba(255, 255, 255, 0.20)"}/>

                    <Text style={styles.text}>Número telefónico:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Teléfono" 
                        keyboardType="phone-pad" 
                        placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                        value={phoneNumber}
                        onFocus={() => setModalVisible(true)}
                    />

                    <Text style={styles.text}>Correo electrónico:</Text>
                    <TextInput editable={false} style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" placeholderTextColor={"rgba(255, 255, 255, 0.20)"}/>
                    
                    <TouchableOpacity style = {styles.button}>
                        <Text>Cambiar Contraseña</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cambiar Número Telefónico</Text>
                        <Text style={styles.modalText}>Aquí puedes cambiar tu número telefónico.</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center", // Centra verticalmente el contenido
        alignItems: "center",
        backgroundColor: "#0f0c29", // Fondo azul
    },
    contenedor: {
        display: "flex",
        alignItems: "center", // Centra la imagen
        justifyContent: "center", // Centra verticalmente
        flexDirection: "column",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.10)", // Color gris para la interfaz
        borderRadius: 20,
        width: "80%",
        height: "80%",
    },
    imagen: {
        width: 150,
        height: 150,
        borderRadius: 80,
        marginBottom: 10,
    },
    inputContainer: {
        alignItems: "flex-start", // Alinea los textos a la izquierda
        width: '100%', // Asegura que ocupe todo el ancho del contenedor
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '100%', // Ancho completo
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 10, // Espaciado entre inputs
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
        textAlign: "left", // Alineación a la izquierda
        marginBottom: 5, // Espacio entre el texto y el input
    },
    button: {
        backgroundColor: '#28A745',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#007BFF', // Color del botón
        padding: 10,
        borderRadius: 5,
    },
    closeText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
