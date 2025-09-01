import { supabase } from "./supabaseClient";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")  // Make sure your table is called "products"
    .select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data;
}
