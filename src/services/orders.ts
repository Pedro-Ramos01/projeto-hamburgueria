import { productCartProps } from "@/stores/cart-store";

import { getSupabaseClient } from "@/lib/supabase";

type CreateOrderParams = {
  address: string;
  products: productCartProps[];
  totalPrice: number;
};

export async function createOrder({
  address,
  products,
  totalPrice,
}: CreateOrderParams) {
  const supabase = getSupabaseClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      address,
      total_price: totalPrice,
    })
    .select("id")
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    products.map((product) => ({
      order_id: order.id,
      product_id: product.id,
      product_title: product.title,
      quantity: product.quantity,
      price: product.price,
    }))
  );

  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id);
    throw new Error(itemsError.message);
  }

  return order;
}
