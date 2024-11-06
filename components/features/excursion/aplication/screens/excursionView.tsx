import { Link, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { AuthContext } from "../../../auth/aplication/providers/authProvider";

type ReservationStatus = "Pendiente" | "Completa" | "Cancelada";

const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
        case "Pendiente":
            return "#FFD700"; // Amarillo dorado
        case "Completa":
            return "#32CD32"; // Verde lima
        case "Cancelada":
            return "#FF6347"; // Rojo tomate
        default:
            return "#ccc"; // Gris claro
    }
};

export function ExcursionView() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const user = authContext?.user;
    const status: ReservationStatus = "Pendiente"; // Cambia este valor según el estatus actual

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

                <Image
                    style={styles.image}
                    source={{
                        uri: "https://turiticket.com/puebla/wp-content/uploads/2023/01/mirador-zacatlan-.jpeg", // Imagen del destino
                    }}
                />

                <View style={styles.dateContainer}>
                    <Image
                        source={{ uri: "https://img.icons8.com/fluency-systems-filled/48/FFFFFF/calendar.png" }}
                        style={styles.calendarIcon}
                    />
                    <Text style={styles.date}>12 al 14 de Noviembre 2024 (2 días)</Text>
                </View>

                <Text style={styles.description}>
                    Zacatlán es famoso por sus montañas, cascadas y paisajes impresionantes.
                    Durante esta excursión, podrás explorar el reloj floral, disfrutar de las vistas en los miradores,
                    y conocer la historia del pueblo mágico.
                </Text>

                <Text style={styles.price}>$500 MXN/Persona</Text>
                <Text style={styles.text}>Viaje redondo</Text>

                {/* Estatus con color específico para la palabra del estatus */}
                <View style={styles.statusContainer}>
                    <Text style={styles.statusLabel}>Estatus: </Text>
                    <Text style={[styles.statusValue, { color: getStatusColor(status) }]}>
                        {status}
                    </Text>
                </View>

                <Text style={styles.subtitle}>Actividades Incluidas:</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>• Salida al zócalo</Text>
                    <Text style={styles.listItem}>• Caminata por el centro</Text>
                    <Text style={styles.listItem}>• Visita al mirador</Text>
                </View>

                <Text style={styles.subtitle}>Transporte:</Text>
                <Text style={styles.transport}>Combi</Text>

                <Text style={styles.subtitle}>Paradas programadas:</Text>
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
        marginTop: 40,
        marginBottom: 10,
        textAlign: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#fff',
        paddingBottom: 5,
    },
    excursionName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        marginTop: 10,
        textAlign: "center",
    },
    image: {
        width: "105%",
        height: 205,
        borderRadius: 15,
        marginBottom: 20,
        borderColor: "#f2d323", // Borde amarillo alrededor de la imagen
        borderWidth: 2,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    calendarIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    date: {
        fontSize: 16,
        color: "#ccc",
    },
    description: {
        fontSize: 14,
        color: "#ddd",
        textAlign: "left",
        marginTop: 10,
        marginBottom: 20,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#28A745", // Verde para resaltar el precio
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        color: "#ddd",
        textAlign: "center",
        marginBottom: 20,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingBottom: 5,
    },
    statusLabel: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    statusValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "600", // Cambié a "600" ya que "semibold" puede no estar soportado en todos los sistemas
        color: '#fff',
        marginTop: 20,
        marginBottom: 6,
        textAlign: 'center',
        borderTopWidth: 1,          // Línea superior
        borderTopColor: '#fff',      // Color de la línea
        paddingTop: 5,               // Espacio entre la línea y el texto
        marginHorizontal: -20,       // Expande visualmente la línea hacia los lados
        width: '100%',
    },
    listContainer: {
        marginBottom: 30,
    },
    listItem: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    transport: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 30,
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
