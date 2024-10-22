import { Link, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../../../auth/aplication/providers/authProvider";

export function ExcursionView() {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    if(!authContext){
        return(
            <View>
                <Text>Error</Text>
            </View>
        )
    }

    const { user } = authContext;
    const { userToken} = authContext

    useEffect(() => {
        if (!user) {
            router.replace('/auth/login');
        }
    }, [user]);

    return(
        <View>
            <Text>Detalles de la excursion</Text>
             {user ? (
                <Text>Usuario: {user.name}</Text>
            ) : (
                <Text>No hay usuario autenticado.</Text>
            )}
            <Link href={"/payment"}>Realizar reserva</Link>
        </View>
    )
}