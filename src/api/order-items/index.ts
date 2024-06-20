import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { TablesInsert } from "@/database.types";

export const useInsertOrederItems = () => {
  return useMutation({
    async mutationFn(items: TablesInsert<"order_items">[]) {
      const { error, data: newOrderItems } = await supabase
        .from("order_items")
        .insert(items)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return newOrderItems;
    },
  });
};
