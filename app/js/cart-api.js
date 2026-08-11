import { supabase } from "@/app/lib/Supabase";

{/*check for existing cart or build a new one for users*/}
export async function getOrCreateCart( userId ) {
    const {data:existingCart, error:findError} = await supabase 
        .from("carts")
        .select("*")
        .eq("user_id", userId)
        .single();
    
    if (findError && findError.code !== "PGRST116") {
        throw findError;
    };

    if (existingCart) return existingCart;

    const {data:newCart, error:createError} = await supabase
        .from("carts")
        .insert({"user_id": userId})
        .select()
        .single();
    
    if(createError) throw createError;

    return newCart;
}


{/*insert new game to user cart and if the game is already there , increase quantity*/}
export async function addToCart(userId, gameId, quantity = 1) {

  const cart = await getOrCreateCart(userId);

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart.id)
    .eq("game_id", gameId)
    .single();

  if (existingItem) {
   
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {

    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        cart_id: cart.id,
        game_id: gameId,
        quantity: quantity,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}


{/*remove a game from user cart*/}
export async function removeFromCart(userId, gameId) {
  const cart = await getOrCreateCart(userId);

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cart.id)
    .eq("game_id", gameId);

  if (error) throw error;
}


{/*update quantity of a game in user cart*/}
export async function updateCartItemQuantity(userId, gameId, quantity) {
 
  if (quantity <= 0) {
    await removeFromCart(userId, gameId);
    return null;
  }

  const cart = await getOrCreateCart(userId);

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("cart_id", cart.id)
    .eq("game_id", gameId)
    .select()
    .single();

  if (error) throw error;
  return data;
}