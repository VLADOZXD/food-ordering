import { ActivityIndicator, FlatList, Text } from "react-native";
import { useAdminOrderList } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";

const OrdersScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    <Text>Failed to fetch orders</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
};

export default OrdersScreen;
