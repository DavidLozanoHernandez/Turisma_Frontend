import { Link } from "expo-router";
import { Text, View } from "react-native";

export function HomeView(){
    return(
        <View>
            <Text>Bienvenido</Text>
            <Link href={"/reservation"}>Ver mis reservaciones</Link>
            <Link href={"/excursion"}>Detalles de la excursion</Link>
            <Link href={"/customer"}>Ver perfil</Link>
        </View>
    )
}