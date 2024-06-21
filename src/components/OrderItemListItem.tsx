import { View, Text, StyleSheet } from "react-native";
import { defaultPizzaImage } from "./ProductListItem";
import Colors from "@/constants/Colors";
import { Tables } from "@/database.types";
import RemoteImage from "./RemoteImage";

type OrderItemListItemProps = {
  item: { products: Tables<"products"> | null } & Tables<"order_items">;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <RemoteImage
        path={item.products?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.title}>
          {item.products?.name}
        </Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${item.products?.price}</Text>
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
