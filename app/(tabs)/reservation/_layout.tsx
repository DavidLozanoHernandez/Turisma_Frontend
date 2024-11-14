import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="reservations" options={{ headerShown: false }}/>
            <Stack.Screen name="makeReservation" options={{ headerShown: false }}/>
        </Stack>
    )
}