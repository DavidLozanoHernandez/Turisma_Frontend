import { useContext, useEffect, useState } from "react";
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../auth/aplication/providers/authProvider";
import { useRouter } from "expo-router";
import AuthDatasoruceImp from "@/components/features/auth/infraestructure/datasources/authDatasoruceImp";
import * as ImagePicker from 'expo-image-picker';

const userGet = new AuthDatasoruceImp

export function CustomerView() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, SetuserData] = useState({ name: '', lastName: '', phoneNumber: '', email: '', photo: '' });
    const [error, setError] = useState('');

    const token = authContext?.userToken

    const handlegetUser = async () => {
        if (token) {
            try {
                const data = await userGet.getUser(token);
                console.log(data);
                SetuserData({
                    name: data.name,
                    lastName: data.lastName,
                    phoneNumber: data.phone,
                    email: data.email,
                    photo: data.userPhoto,
                });
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            }
        }
    };
    useEffect(() => {
        handlegetUser();
    }, [token]);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Se necesitan permisos para acceder a la galería.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            uploadImage(uri);
        }
    };

    const uploadImage = async (uri: string) => {
        if (token) {
            try {
                const result = await userGet.uploadUserPhoto(token, uri);
                SetuserData(prev => ({ ...prev, photo: result.secure_url }));
                await handlegetUser();
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            }
        }
    };

    const handleLogout = async () => {
        if (authContext) {
            await authContext.logout()
            router.replace('/auth/login')
        }
    }

    const user = authContext?.user;

    useEffect(() => {
        if (!user) {
            router.replace('/auth/login');
        }
    }, [user]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.contenedor}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={{ uri: userData.photo }}
                        style={styles.imagen}
                    />
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Nombre:</Text>
                    <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                        value={userData.name}
                    />

                    <Text style={styles.text}>Apellido:</Text>
                    <TextInput style={styles.input} placeholder="Apellido" placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                        value={userData.lastName}
                    />

                    <Text style={styles.text}>Número telefónico:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Teléfono"
                        keyboardType="phone-pad"
                        placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                        value={userData.phoneNumber}
                        onFocus={() => setModalVisible(true)}
                    />

                    <Text style={styles.text}>Correo electrónico:</Text>
                    <TextInput editable={false} style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                        value={userData.email}
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text>Cambiar Contraseña</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text>Cerrar sesión</Text>
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
