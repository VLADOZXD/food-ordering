import { Stack, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useOrderDetails } from "@/api/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = idString
    ? parseFloat(typeof idString === "string" ? idString : idString[0])
    : NaN;
  console.log(idString);
  const { data: order, isLoading, error } = useOrderDetails(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch order</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order?.id}` }} />
      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => order && <OrderListItem order={order} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, gap: 10, flex: 1 },
});

export default OrderDetailScreen;
