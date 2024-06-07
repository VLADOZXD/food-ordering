import { View, Text, Image, StyleSheet } from "react-native";
import { OrderItem } from "@/types";
import { defaultPizzaImage } from "./ProductListItem";
import Colors from "@/constants/Colors";

type OrderItemListItemProps = {
  item: OrderItem;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.products.image || defaultPizzaImage }}
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.title}>
          {item.products.name}
        </Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${item.products.price}</Text>
          <Text style={styles.size}>Size: {item.size}</Text>
        </View>
      </View>
      <Text style={styles.quantity}>{item.quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: { fontWeight: "bold", fontSize: 18 },
  subtitleContainer: { flexDirection: "row", gap: 5, marginTop: 10 },
  price: {
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  size: {
    fontWeight: "bold",
    color: "gray",
  },
  quantity: { fontWeight: "bold", fontSize: 20, marginRight: 10 },
});

export default OrderItemListItem;
