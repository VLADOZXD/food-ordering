import { Stack } from "expo-router";

export default function OrdersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="list"
        options={{ title: "Orders", headerShown: false }}
      />
    </Stack>
  );
}
