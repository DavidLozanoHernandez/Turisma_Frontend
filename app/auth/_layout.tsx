import { Stack } from "expo-router";

export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name="login"/>
            <Stack.Screen name="sigUp"/>
            <Stack.Screen name="codeAuthentication"/>
            <Stack.Screen name="newPassword"/>
            <Stack.Screen name="optionsLostPassword"/>
            <Stack.Screen name="checkmail"/>
        </Stack>
    )
}