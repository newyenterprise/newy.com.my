import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack>
        <Stack.Screen name="index" options={{ title: "Digital Linked" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="services" options={{ title: "Services" }} />
        <Stack.Screen name="contact" options={{ title: "Contact" }} />
      </Stack>
    </>
  );
}
