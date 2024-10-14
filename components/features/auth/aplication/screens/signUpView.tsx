import { Link } from "expo-router";
import { Text, View } from "react-native";

export function SignUpView() {
    return(
        <View>
            <Link href={"/auth/checkMail"}>Registrarse</Link>
        </View>
    )
}