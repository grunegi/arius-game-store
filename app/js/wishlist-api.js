import { supabase } from "../lib/Supabase";

export async function getOrCreateWishlist(userId) {
  const { data: existing, error: fetchError } = await supabase
    .from("wishlists")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (existing) return existing;

  const { data: created, error: insertError } = await supabase
    .from("wishlists")
    .insert({ user_id: userId })
    .select("*")
    .single();

  if (insertError) throw insertError;
  return created;
}



export async function getWishlistItems(userId) {
  const wishlist = await getOrCreateWishlist(userId);

  const { data, error } = await supabase
    .from("wishlist_items")
    .select("*")
    .eq("wishlist_id", wishlist.id)
    .order("added_at", { ascending: false });

  if (error) throw error;
  return data || [];
}



export async function isItemWished(userId, itemId, itemType = "game") {
  const wishlist = await getOrCreateWishlist(userId);

  const { data, error } = await supabase
    .from("wishlist_items")
    .select("id")
    .eq("wishlist_id", wishlist.id)
    .eq("item_id", itemId)
    .eq("item_type", itemType)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}



export async function toggleWishlistItem(userId, itemId, itemType = "game") {
  const wishlist = await getOrCreateWishlist(userId);

  // چک کن وجود داره یا نه
  const exists = await isItemWished(userId, itemId, itemType);

  if (exists) {
    // حذف کن
    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("wishlist_id", wishlist.id)
      .eq("item_id", itemId)
      .eq("item_type", itemType);

    if (error) throw error;
    return { action: "removed" };
  } else {
    // اضافه کن
    const { error } = await supabase
      .from("wishlist_items")
      .insert({
        wishlist_id: wishlist.id,
        item_id: itemId,
        item_type: itemType,
      });

    if (error) throw error;
    return { action: "added" };
  }
}




export async function getWishlistDetails(userId) {
  const items = await getWishlistItems(userId);

  if (!items.length) return { games: [], products: [] };

  const gameIds = items.filter((i) => i.item_type === "game").map((i) => i.item_id);
  const productIds = items.filter((i) => i.item_type === "product").map((i) => i.item_id);

  const [gamesData, productsData] = await Promise.all([
    gameIds.length
      ? supabase.from("games").select("*").in("id", gameIds)
      : Promise.resolve({ data: [] }),
    productIds.length
      ? supabase.from("products").select("*").in("id", productIds)
      : Promise.resolve({ data: [] }),
  ]);

  return {
    games: gamesData.data || [],
    products: productsData.data || [],
    rawItems: items,
  }
}