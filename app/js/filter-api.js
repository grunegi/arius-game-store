import { supabase } from "@/app/lib/Supabase";

{/*filter games with price*/}
export async function filterGamesByPrice(price) {
  const minPrice = Number(price);
  const maxPrice = minPrice + 10;

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .gte("price", minPrice)
    .lt("price", maxPrice)
    .order("price", { ascending: true });

  if (error) {
    console.error("Error filtering games by price:", error);
    throw error;
  }

  return data;
}


{/*filter games with rating*/}
export async function filterGamesByRating(rating) {
  const selectedRating = Number(rating);

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("rating", selectedRating)
    .order("rating", { ascending: false });

  if (error) {
    console.error("Error filtering games by rating:", error);
    throw error;
  }

  return data;
}


{/*filter products with price*/}
export async function filterProductsByPrice(price) {
  const minPrice = Number(price);
  const maxPrice = minPrice + 10;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .gte("price", minPrice)
    .lt("price", maxPrice)
    .order("price", { ascending: true });

  if (error) {
    console.error("Error filtering products by price:", error);
    throw error;
  }

  return data;
}


{/*filter products with rating*/}
export async function filterProductsByRating(rating) {
  const selectedRating = Number(rating);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("rating", selectedRating)
    .order("rating", { ascending: false });

  if (error) {
    console.error("Error filtering products by rating:", error);
    throw error;
  }

  return data;
}


