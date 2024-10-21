import { Link } from "expo-router";
import { Text, View } from "react-native";

export function ExcursionView() {
    return(
        <View>
            <Text>Detalles de la excursion</Text>
            <Link href={"/reservation/makeReservation"}>Realizar reserva</Link>
        </View>
    )
}