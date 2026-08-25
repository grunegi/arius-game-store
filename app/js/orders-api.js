import { supabase } from "@/app/lib/Supabase";

export async function getOrCreateOrder(userId) {
  const { data: existing, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (existing) return existing;

  const { data: created, error: insertError } = await supabase
    .from("orders")
    .insert({ user_id: userId })
    .select()
    .single();

  if (insertError) throw insertError;
  return created;
}



export async function addToOrder(userId, items) {
  const order = await getOrCreateOrder(userId);

  const orderItems = items.map((item) => ({
    order_id: order.id,
    item_id: item.id,
    item_type: item.type || "game",
    name: item.name,
    price: item.price,
    quantity: item.quantity || 1,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  const addedTotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const newTotal = Number(order.total_amount || 0) + addedTotal;

  await supabase
    .from("orders")
    .update({ total_amount: newTotal })
    .eq("id", order.id);

  return order;
}


export async function addGameToOrder(userId, game, quantity = 1) {
  return addToOrder(userId, [
    {
      id: game.id,
      type: "game",
      name: game.name,
      price: game.discount_price || game.price,
      quantity,
    },
  ]);
}


export async function getOrders(userId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}