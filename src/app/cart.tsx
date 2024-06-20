import Button from "@/components/Button";
import CartListItem from "@/components/CartListItem";
import { useCart } from "@/provider/CartProvider";
import { StatusBar } from "expo-status-bar";
import { View, Text, Platform, FlatList, StyleSheet } from "react-native";

const CartScreen = () => {
  const { items, total, checkout, isCheckout } = useCart();

  const isCartEmpty = items.length === 0;

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: ${total}
      </Text>
      <Button
        disabled={isCartEmpty || isCheckout}
        onPress={checkout}
        text="Checkout"
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CartScreen;
