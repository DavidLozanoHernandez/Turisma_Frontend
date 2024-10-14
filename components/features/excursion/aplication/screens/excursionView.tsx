import { Link } from "expo-router";
import { Text, View } from "react-native";

export function ExcursionView() {
    return(
        <View>
            <Text>Detalles de la excursion</Text>
            <Link href={"/payment"}>Realizar reserva</Link>
        </View>
    )
}