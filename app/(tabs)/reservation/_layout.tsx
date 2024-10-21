import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="reservations" />
            <Stack.Screen name="makeReservation" />
        </Stack>
    )
}