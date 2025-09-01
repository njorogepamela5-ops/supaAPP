import { supabase } from "./supabaseClient";

// Add a product to the cart
export async function addToCart(userId: string, productId: string, quantity: number) {
  const { data, error } = await supabase.from("cart").insert([
    {
      user_id: userId,
      product_id: productId,
      quantity: quantity,
    },
  ]);

  if (error) {
    console.error("Error adding to cart:", error);
  } else {
    console.log("Added to cart:", data);
  }
}
"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    setLoading(true);
    const userId = "CURRENT_USER_UUID"; // Replace with actual logged-in user ID
    const { data, error } = await supabase
      .from("cart")
      .select("id, quantity, product_id, products(name, price)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) console.log("Error fetching cart:", error);
    else setCart(data || []);
    setLoading(false);
  }

  async function removeFromCart(cartId: string) {
    const { error } = await supabase.from("cart").delete().eq("id", cartId);
    if (error) console.log("Error deleting item:", error);
    else fetchCart();
  }

  async function updateQuantity(cartId: string, newQuantity: number) {
    if (newQuantity < 1) return; // Prevent zero or negative quantities
    const { error } = await supabase
      .from("cart")
      .update({ quantity: newQuantity })
      .eq("id", cartId);

    if (error) console.log("Error updating quantity:", error);
    else fetchCart();
  }

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item: any) => (
            <li key={item.id} className="mb-4 flex justify-between items-center">
              <div>
                {item.products.name} - {item.products.price} KES
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
