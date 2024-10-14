import { Link } from "expo-router";
import { Text, View } from "react-native";

export function OptionslostPasswordView(){
    return(
        <View>
            <Text>Elegi la opcion para restablecer tu contraseña</Text>
            <Link href={"/auth/codeAuthentication"}>Telefono</Link>
        </View>
    )
}