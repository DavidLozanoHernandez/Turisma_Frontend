import { Link } from "expo-router";
import { Text, View } from "react-native";

export function CodeAuthenticationView(){
    return(
        <View>
            <Text>Ingresa el codigo de autenticacion</Text>
            <Link href={"/auth/newPassword"}>Confirmar</Link>
        </View>
    )
}