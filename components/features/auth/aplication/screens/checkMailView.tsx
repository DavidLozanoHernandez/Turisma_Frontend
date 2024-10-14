import { Link } from "expo-router";
import { Text, View } from "react-native";

export function CheckMailView(){
    return(
        <View>
            <Text>Porfavor verefica tu entrada de correo para confirmar tu correo electronico</Text>
            <Link href={".."}>Vereficado</Link>
        </View>
    )
}