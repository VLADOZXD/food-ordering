import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem } from "@/types";
import { randomUUID } from "expo-crypto";
import { Tables } from "@/database.types";
import { useInsertOreder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrederItems } from "@/api/order-items";

type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
  isCheckout: boolean;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
  isCheckout: false,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const { mutate: insertOrder } = useInsertOreder();
  const { mutate: insertOrderItems } = useInsertOrederItems();
  const router = useRouter();

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    setIsCheckout(true);
    insertOrder(
      { total },
      {
        onSuccess: (data) => {
          if (data) {
            saveOrderItems(data);
            setIsCheckout(false);
          }
        },
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));

    insertOrderItems(orderItems, {
      onSuccess: () => {
        clearCart();
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout, isCheckout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
