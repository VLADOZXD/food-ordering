import { FlatList } from "react-native";

import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";

const PRODUCTS = products;

export default function MenuScreen() {
  return (
    <FlatList
      data={PRODUCTS}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
