import { Link } from "expo-router";
import { Text, View } from "react-native";

export function NewPasswordView(){
    return(
        <View>
            <Text>Ingresa tu nueva contraseña</Text>
            <Link href={".."}>Cambiar contraseña</Link>
        </View>
    )
}