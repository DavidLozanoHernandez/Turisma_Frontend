import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, StyleSheet, Image, Animated } from "react-native";
import { Link, router } from "expo-router";
import { AuthContext } from "../../../auth/aplication/providers/authProvider";
import ExcursionDatasourceImp from "../../../excursion/infraestructure/datasources/excursionDatasourceImp";

const Excursion = new ExcursionDatasourceImp;

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
    status: string;
    likes: number;
    photos?: { imageUrl: string[] };
}

export function HomeView() {
    const authContext = useContext(AuthContext);
    const token = authContext?.userToken;
    const [excursion, setExcursion] = useState<ExcursionType[]>([]);
    const user = authContext?.user;
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(0)); 
    const [imageChangeInterval, setImageChangeInterval] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleGetExcursion = async () => {
            if (token) {
                try {
                    const data = await Excursion.getExcursions(token);
                    console.log(JSON.stringify(data));
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
        handleGetExcursion();
    }, [token]);

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

    useEffect(() => {
        if (!user) {
            router.replace('/auth/login');
        }
    }, [user]);

  
    const fadeIn = () => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1, 
            duration: 1000, 
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        if (excursion.length > 0 && excursion[0].photos?.imageUrl?.length) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    return nextIndex < (excursion[0].photos?.imageUrl.length || 0)
                        ? nextIndex
                        : 0;
                });
            }, 3000); 

            setImageChangeInterval(interval);

            
            return () => {
                if (interval) clearInterval(interval);
            };
        }
    }, [excursion]);

    useEffect(() => {
        fadeIn();
    }, [currentImageIndex]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Image
                    style={styles.logo}
                    source={require("../../../../../assets/images/TURISMA_logo.png")}
                />
                <Text style={styles.title}>¡Bienvenido a TURISMA!</Text>
            </View>

            {excursion.map((excursion) => (
                <View style={styles.card} key={excursion.id}>
                    
                    {excursion.photos?.imageUrl && excursion.photos.imageUrl.length > 0 && (
                        <Animated.Image
                            style={[styles.image, { opacity: fadeAnim }]}
                            source={{ uri: excursion.photos.imageUrl[currentImageIndex] || 'default-image-url' }}
                        />
                    )}

                    <Text style={styles.excursionName}>{excursion.name}</Text>
                    <View style={styles.dateContainer}>
                        <Image
                            style={styles.calendarIcon}
                            source={{ uri: "https://img.icons8.com/fluency-systems-filled/48/FFFFFF/calendar.png" }}
                        />
                        <Text style={styles.date}>Dia de salida: {formatDate(new Date(excursion.departureDate))}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Image
                            style={styles.calendarIcon}
                            source={{ uri: "https://img.icons8.com/fluency-systems-filled/48/FFFFFF/calendar.png" }}
                        />
                        <Text style={styles.date}>Dia de llegada: {formatDate(new Date(excursion.arrivalDate))}</Text>
                    </View>

                    <Text style={styles.description}>
                        {excursion.description}
                    </Text>

                    <Text style={styles.price}>{excursion.price}/Persona</Text>
                    <Text style={styles.text}>Viaje redondo</Text>

                    <Link href={`/excursion?id=${excursion.id}`} style={styles.link}>Detalles de la excursión</Link>
                </View>
            ))}
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
        borderColor: '#fff', 
        borderWidth: 1,
        borderTopWidth: 0, 
        paddingVertical: 3,
        paddingHorizontal: 17,
        borderRadius: 31,
        marginTop: 38,
        marginBottom: 30,
        backgroundColor: 'transparent', 
    },
    logo: {
        width: 70,
        height: 70,
        left: 10,
        marginRight: 15, 
    },
    title: {
        fontSize: 22,
        fontWeight: "semibold",
        color: "#fff", 
        textAlign: "center",
        fontFamily: 'sans-serif',
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
        width: '100%',
        height: 205,
        borderRadius: 15,
        marginBottom: 20,
        borderColor: "#f2d323", 
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
        marginRight: 5, 
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
        color: "#28A745", 
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
        backgroundColor: "#28A745", 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        textAlign: "center",
        width: "90%",
        marginBottom: 10,
    },
});
