import { Link } from "expo-router";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

export function HomeView() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Título con logo dentro del óvalo */}
            <View style={styles.titleContainer}>
                <Image
                    style={styles.logo}
                    source={require("../../../../../assets/images/TURISMA_logo.png")} // Ruta local de la imagen del logo
                />
                <Text style={styles.title}>¡Bienvenido a TURISMA!</Text>
            </View>

            <View style={styles.card}>
                <Image
                    style={styles.image}
                    source={{
                        uri: "https://turiticket.com/puebla/wp-content/uploads/2023/01/mirador-zacatlan-.jpeg", // Imagen del destino
                    }}
                />

                <Text style={styles.excursionName}>Zacatlán, Puebla</Text>
                <View style={styles.dateContainer}>
                    <Image
                        style={styles.calendarIcon}
                        source={{ uri: "https://img.icons8.com/ios-filled/50/000000/calendar.png" }} // Icono de calendario
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

                <Link href="/excursion" style={styles.link}>Detalles de la excursión</Link>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#0f0c29", // Fondo oscuro
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff', // Borde blanco para los lados y la parte inferior
        borderWidth: 1,
        borderTopWidth: 0, // Elimina el borde superior
        paddingVertical: 3,
        paddingHorizontal: 17,
        borderRadius: 31, // Hace que los bordes sean redondeados
        marginTop: 38,
        marginBottom: 30,
        backgroundColor: 'transparent', // Fondo transparente
    },
    logo: {
        width: 70,
        height: 70,
        left: 10,
        marginRight: 15, // Espacio entre el logo y el texto
    },
    title: {
        fontSize: 22,
        fontWeight: "semibold",
        color: "#fff", // Letras en color blanco
        textAlign: "center",
        fontFamily: 'cursive', // Fuente cursive para un estilo más elegante
    },
    card: {
        width: '100%',
        maxWidth: 400,
        padding: 15,
        alignItems: "center",
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        shadowColor: "#036",
        marginBottom: 25,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    image: {
        width: "105%",
        height: 205,
        borderRadius: 15,
        marginBottom: 20,
        borderColor: "#f2d323", // Borde amarillo alrededor de la imagen
        borderWidth: 2,
    },
    excursionName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 22,
        textAlign: "center",
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    calendarIcon: {
        width: 20,
        height: 20,
        marginRight: 5, // Espacio entre el icono y la fecha
    },
    date: {
        fontSize: 16,
        color: "#ccc",
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "#ddd",
        textAlign: "left",
        marginBottom: 22,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#28A745", // Verde para resaltar el precio
    },
    text: {
        fontSize: 12,
        color: "#ddd",
        textAlign: "center",
        marginBottom: 30,
    },
    link: {
        fontSize: 16,
        color: "#fff",
        backgroundColor: "#28A745", // Botón verde llamativo
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        textAlign: "center",
        width: "90%",
        marginBottom: 10,
    },
});
