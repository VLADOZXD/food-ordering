import { FlatList } from "react-native";
import { Stack } from "expo-router";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";

const ORDERS = orders;

const OrdersScreen = () => {
  return (
    <FlatList
      data={ORDERS}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
};

export default OrdersScreen;
