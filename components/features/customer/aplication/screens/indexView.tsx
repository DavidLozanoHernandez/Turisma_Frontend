import { useContext, useEffect, useState } from "react";
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../auth/aplication/providers/authProvider";
import { useRouter } from "expo-router";

export function CustomerView() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    if(!authContext){
        return(
            <View>
                <Text>Error</Text>
            </View>
        )
    }

    const { user } = authContext;
    const { userToken } = authContext;
    console.log(user?.id)
    console.log(userToken)

    useEffect(() => {
        if (!user) {
            router.replace('/auth/login');
        }
    }, [user]);

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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f0c29",
    },
    contenedor: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.10)",
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
        alignItems: "flex-start",
        width: '100%',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 10,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
        textAlign: "left",
        marginBottom: 5,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    closeText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
