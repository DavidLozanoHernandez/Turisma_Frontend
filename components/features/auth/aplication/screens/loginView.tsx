import { Link } from "expo-router";
import { Text, View } from "react-native";

export function LoginView() {
    return(
        <View>
            <Link href={"/"}>iniciar sesion</Link>
            <Link href={"/auth/signUp"}>SignUp</Link>
            <Link href={"/auth/optionsLostPassword"}>Olvide mi contraseña</Link>
        </View>
    )
}