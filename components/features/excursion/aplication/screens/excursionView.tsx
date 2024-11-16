import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, Animated } from "react-native";
import { AuthContext } from "../../../auth/aplication/providers/authProvider";
import ExcursionDatasourceImp from "../../infraestructure/datasources/excursionDatasourceImp";

const Excursion = new ExcursionDatasourceImp;

type ExcursionStatus = "PENDING" | "COMPLETE" | "CANCELED";

type ExcursionType = {
    id: number;
    name: string;
    description: string;
    departureDate: string;
    arrivalDate: string;
    price: number;
    duration: number;
    transportId: string;
    outPoint: string;
    status: ExcursionStatus;
    likes: number;
    photos: string[];
    stopPoints: {
        id: number;
        name: string;
        activities: { id: number; name: string }[]; 
    }[]; 
    transport: { type: string; brand: string; model: string }; 
}

export function ExcursionView() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const token = authContext?.userToken;
    const user = authContext?.user;
    const [excursion, setExcursion] = useState<ExcursionType | null>(null);
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(1));
    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        const handleGetExcursionId = async () => {
            if (token && id) {
                try {
                    const data = await Excursion.getExcursionsId(token, parseInt(id, 10));
                    setExcursion(data);
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError('Ocurrió un error desconocido');
                    }
                }
            }
        };
        handleGetExcursionId();
    }, [token, id]);

    const getStatusColor = (status: ExcursionStatus) => {
        switch (status) {
            case "PENDING":
                return "#FFD700"; // Amarillo dorado
            case "COMPLETE":
                return "#32CD32"; // Verde lima
            case "CANCELED":
                return "#FF6347"; // Rojo tomate
            default:
                return "#ccc"; // Gris claro
        }
    };

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        };
        return date.toLocaleDateString("es-ES", options);
    };

   
    const fadeIn = () => {
        fadeAnim.setValue(0); 
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };


    useEffect(() => {
        if (excursion && excursion.photos?.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    return nextIndex < excursion.photos.length ? nextIndex : 0;
                });
            }, 3000);

            
            return () => clearInterval(interval);
        }
    }, [excursion]);

    useEffect(() => {
        fadeIn(); 
    }, [currentImageIndex]);

    if (!excursion) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Cargando...</Text>
            </View>
        );
    }

    console.log("fotos", excursion.photos)
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Detalles de la excursión a:</Text>
                <Text style={styles.excursionName}>{excursion.name}</Text>

                {excursion.photos && excursion.photos.length > 0 && (
                    <Animated.Image
                        style={[styles.image, { opacity: fadeAnim }]}
                        source={{ uri: excursion.photos[currentImageIndex]}}
                        onLoad={() => fadeIn()} 
                    />
                )}

                <View style={styles.dateContainer}>
                    <Image
                        style={styles.calendarIcon}
                        source={{ uri: "https://img.icons8.com/fluency-systems-filled/48/FFFFFF/calendar.png" }}
                    />
                    <Text style={styles.date}>Día de salida: {formatDate(new Date(excursion.departureDate))}</Text>
                </View>

                <View style={styles.dateContainer}>
                    <Image
                        style={styles.calendarIcon}
                        source={{ uri: "https://img.icons8.com/fluency-systems-filled/48/FFFFFF/calendar.png" }}
                    />
                    <Text style={styles.date}>Día de llegada: {formatDate(new Date(excursion.arrivalDate))}</Text>
                </View>

                <Text style={styles.description}>{excursion.description}</Text>
                <Text style={styles.price}>{excursion.price}/Persona</Text>
                <Text style={styles.text}>Viaje redondo</Text>

                <View style={styles.statusContainer}>
                    <Text style={styles.statusLabel}>Estatus: </Text>
                    <Text style={[styles.statusValue, { color: getStatusColor(excursion.status) }]}>
                        {excursion.status}
                    </Text>
                </View>

                {/* Actividades incluidas */}
                <Text style={styles.subtitle}>Actividades Incluidas:</Text>
                <View style={styles.listContainer}>
                    {excursion.stopPoints.map((stopPoint) =>
                        stopPoint.activities.map((activity) => (
                            <Text key={activity.id} style={styles.listItem}>• {activity.name}</Text>
                        ))
                    )}
                </View>

                {/* Transporte */}
                <Text style={styles.subtitle}>Transporte:</Text>
                <Text style={styles.transport}>{excursion.transport?.brand} {excursion.transport?.model} ({excursion.transport?.type})</Text>

                {/* Paradas programadas */}
                <Text style={styles.subtitle}>Paradas programadas:</Text>
                <View style={styles.listContainer}>
                    {excursion.stopPoints.map((stopPoint) => (
                        <Text key={stopPoint.id} style={styles.listItem}>• {stopPoint.name}</Text>
                    ))}
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
        width: "100%",
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
