import { useContext, useEffect, useState } from "react";
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../auth/aplication/providers/authProvider";
import { useRouter } from "expo-router";
import AuthDatasoruceImp from "@/components/features/auth/infraestructure/datasources/authDatasoruceImp";
import * as ImagePicker from 'expo-image-picker';

const userGet = new AuthDatasoruceImp
type ModalType = 'phone' | 'info' | 'alert' | 'password' | null;

export function CustomerView() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [userData, SetuserData] = useState({ name: '', lastName: '', phoneNumber: '', email: '', photo: '' });
    const [error, setError] = useState('');
    const token = authContext?.userToken
    const [newPhone, setNewPhone] = useState('')
    const [tokenV, setTokenV] = useState('')
    const [area, setArea] = useState('+52')
    const [showAlert, setShowAlert] = useState(false);
    const [password, setPassword] = useState('');

    //console.log(authContext)
    console.log(token)

    const handlegetUser = async () => {
        if (token) {
            try {
                const data = await userGet.getUser(token);
                //console.log(data);
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
        const data = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (data.granted === false) {
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
                const data = await userGet.uploadUserPhoto(token, uri);
                SetuserData(prev => ({ ...prev, photo: data.secure_url }));
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

    const handleupdate = async () => {
        if (token) {
            try {
                const data = await userGet.updatedates(token, userData.name, userData.lastName)
                await handlegetUser();
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            }
        }
    }

    const handlesendVerificationPhone = async () => {
        if (token) {
            try {
                const data = await userGet.sendVerificationPhone(token);
                openModal('phone')
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            }
        }
    }

    const handleUpdatePhone = async () => {
        if (token) {
            try {
                const fullphone = area + newPhone;
                const data = await userGet.updatePhone(token, fullphone, tokenV)
                openModal('alert')
                await handlegetUser();
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            }
        }
    }

    const handleSendVerificationPassword = async () => {
        if (token) {
            try {
                const data = await userGet.sendVerificationPassword(token)       
                openModal('password')         
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            }
        }
    }

    const handleupdatePassword = async () => {
        if (token){
            console.log("hola")
            try {
                const data = await userGet.updatePassword(token, password, tokenV)
                openModal('alert')
                await handlegetUser();
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            }
        }
    }

    const openModal = (modalType: ModalType) => {
        setActiveModal(modalType);
        if (modalType === 'phone') {
            setNewPhone('');
            setTokenV('');
        }
        if (modalType === 'alert') {
            setShowAlert(true);
        }
        if (modalType === 'password'){
            setPassword('');
            setTokenV('');
        }
    };

    const closeModal = () => {
        setActiveModal(null);
        setShowAlert(false);
    };

    useEffect(() => {
        if (activeModal === 'alert') {
            const timer = setTimeout(() => {
                closeModal();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [activeModal]);

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
                        onChangeText={(text) => SetuserData(prev => ({ ...prev, name: text }))}
                        onSubmitEditing={handleupdate}
                    />

                    <Text style={styles.text}>Apellido:</Text>
                    <TextInput style={styles.input} placeholder="Apellido" placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                        value={userData.lastName}
                        onChangeText={(text) => SetuserData(prev => ({ ...prev, lastName: text }))}
                        onSubmitEditing={handleupdate}
                    />

                    <Text style={styles.text}>Número telefónico:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Teléfono"
                        keyboardType="phone-pad"
                        placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                        value={userData.phoneNumber}
                        onFocus={() => openModal('info')}
                    />

                    <Text style={styles.text}>Correo electrónico:</Text>
                    <TextInput editable={false} style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                        value={userData.email}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSendVerificationPassword}>
                        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonExit} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={activeModal === 'info'}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cambiar Número Telefónico</Text>
                        <Text style={styles.modalText}>
                            Estas seguro que quieres cambiar tu numero telefónico. {'\n'}
                            Si estás de acuerdo presiona "Cambiar" y se te enviará un código de verificación a tu Correo electrónico. {'\n'}
                            En caso contrario presiona "Cancelar".
                        </Text>
                        <View style={styles.modal}>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={handlesendVerificationPhone}>
                                <Text style={styles.closeText}>Cambiar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={activeModal === 'phone'}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cambiar Número Telefónico</Text>
                        <Text style={styles.textAlignLeft}>Token:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa el Token"
                            placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                            value={tokenV}
                            onChangeText={setTokenV}
                        />

                        <Text style={styles.textAlignLeft}>Número telefónico:</Text>
                        <View style={styles.phoneInputContainer}>
                            <TextInput
                                style={[styles.input, styles.prefixInput]}
                                value={area}
                                editable={false}
                            />
                            <TextInput
                                style={[styles.input, styles.inputmodal]}
                                placeholder="Ingresa tu número"
                                keyboardType="phone-pad"
                                placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                                value={newPhone}
                                onChangeText={setNewPhone}
                            />
                        </View>

                        <View style={styles.modal}>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={handleUpdatePhone}>
                                <Text style={styles.closeText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={activeModal === 'alert'}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Se actualizo con exito.</Text>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={activeModal === 'password'}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
                        <Text style={styles.textAlignLeft}>Token:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa el Token"
                            placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                            value={tokenV}
                            onChangeText={setTokenV}
                        />

                        <Text style={styles.textAlignLeft}>Nueva Contraseña:</Text>
                        <View style={styles.phoneInputContainer}>
                            <TextInput
                                style={[styles.input, styles.inputmodal]}
                                placeholder="Ingresa tu nueva contraseña"
                                placeholderTextColor={"rgba(255, 255, 255, 0.20)"}
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        {error ? <Text>{error}</Text>: null}

                        <View style={styles.modal}>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={handleupdatePassword}>
                                <Text style={styles.closeText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
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
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.10)",
        borderRadius: 20,
        width: "90%",
        height: "90%",
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
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#28A745',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 7,
        alignSelf: 'center',
        width: '90%',
    },
    buttonExit: {
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: '#ce0000',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 7,
        alignSelf: 'center',
        width: '90%',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#0f0c30',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalText: {
        marginBottom: 20,
        color: '#fff',
    },
    closeButton: {
        backgroundColor: '#28A745',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    closeText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    modal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
    },
    textAlignLeft: {
        textAlign: 'left',
        width: '100%',
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
        marginBottom: 5,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    prefixInput: {
        width: "20%",
        marginRight: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
    },
    inputmodal: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 10,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
    },

});