import { StyleSheet, Text, Pressable, Dimensions } from "react-native";
import Colors from "@/constants/Colors";
import { Link, useSegments } from "expo-router";
import { Tables } from "@/database.types";
import RemoteImage from "./RemoteImage";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Tables<"products">;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text numberOfLines={2} style={styles.title}>
          {product.name}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    width: Dimensions.get("window").width / 2 - 15,
  },
  image: { width: "100%", aspectRatio: 1 },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
    minHeight: 50,
  },
  price: { color: Colors.light.tint, fontWeight: "bold", marginTop: "auto" },
});
