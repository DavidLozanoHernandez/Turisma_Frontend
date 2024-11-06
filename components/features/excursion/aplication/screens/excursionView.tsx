import { Link, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../../auth/aplication/providers/authProvider";

export function ExcursionView() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const user = authContext?.user;
    
    useEffect(() => {
        if (!user) {
            router.replace('/auth/login');
        }
    }, [user]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Detalles de la excursión a:</Text>
                <Text style={styles.excursionName}>Zacatlán, Puebla</Text>

                <Text style={styles.subtitle}>Actividades a realizar en el viaje:</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>• Salida al zócalo</Text>
                    <Text style={styles.listItem}>• Caminata por el centro</Text>
                    <Text style={styles.listItem}>• Visita al mirador</Text>
                </View>

                <Text style={styles.subtitle}>Tipo de transporte:</Text>
                <Text style={styles.subtitle}>Combi</Text>

                <Text style={styles.subtitle}>Paradas que se van a realizar:</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>• Cascadas</Text>
                    <Text style={styles.listItem}>• Mirador de Zacatlán</Text>
                </View>

                <Link href={"/reservation/makeReservation"} style={styles.link}>
                    <Text>Realizar reserva</Text>
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#0f0c29',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
    },
    excursionName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 30,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "semibold",
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    listContainer: {
        marginBottom: 20,
    },
    listItem: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    imagePlaceholder: {
        width: '100%',
        height: 100,
        backgroundColor: '#f2d323',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    imageText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        fontSize: 16,
        color: '#fff',
        marginTop: 20,
        textAlign: 'center',
        backgroundColor: '#28A745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center',
        width: '90%',
    },
});
