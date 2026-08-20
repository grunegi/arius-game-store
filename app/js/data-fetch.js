import { supabase } from "@/app/lib/Supabase";

{/*all games*/}
export async function fetchAllGames() {
  try {

    const { data } = await supabase
      .from("games")
      .select("*");
    return data;

  } catch (error) {

     if (error) {
      console.log(error);
      return [];
      } 
  }
}


{/*selected game*/}
export async function filteredGame(slug) {

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return null;
  }

  return data;
  
}


{/*search result*/}
export async function searchResult(query) {

  const {data, error} = await supabase
    .from("games")
    .select("*")
    .ilike("name", `%${query}%`);

    if(error) return null;

  return data
}


{/*category*/}
export async function category(genre) {
  const {data, error} = await supabase
    .from("games")
    .select("*")
    .eq("genre", genre);

  if(error) {
    console.log(error);
    return[];
  }

  return data;
}


{/*categorys for navbar*/}
export async function categorysForNavbar() {
  const {data, error} = await supabase
    .from("games")
    .select("genre")

  if(error) {
    console.log(error);
    return[];
  }

  return data;
}


{/*games for hero section*/}
export async function heroGames() {

  const {data, error} = await supabase
    .from("games")
    .select("name,cover_image,genre,slug")
    .lte("stock",70)
    .limit(5);

  if (error) {
  console.log("ERROR:", JSON.stringify(error, null, 2));
  }

  return data;
}


{/*4 games for featured games part*/}
export async function featuredGames() {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("rating", { ascending: false })
    .limit(4);

  if (error) throw error;

  return data;
}


{/*4 games for new release part*/}
export async function newReleases() {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("release_date", { ascending: false })
    .limit(4);

  if (error) {
    throw error;
  }

  return data;
}


{/*get all products*/}
export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}


{/*get 4 accessory for main page of the site*/}
export async function getHomeProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) throw error;
  return data || [];
}




