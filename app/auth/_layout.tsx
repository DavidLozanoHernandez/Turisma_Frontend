import { Stack } from "expo-router";

export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signUp"  options={{ headerShown: false }} />
            {/* <Stack.Screen name="codeAuthentication"  options={{ headerShown: false }} /> */}
            <Stack.Screen name="newPassword"  options={{ headerShown: false }} />
            <Stack.Screen name="optionsLostPassword"  options={{ headerShown: false }} />
            <Stack.Screen name="checkMail"  options={{ headerShown: false }} />
            <Stack.Screen name="checkPhone"  options={{ headerShown: false }} />
        </Stack>
    )
}