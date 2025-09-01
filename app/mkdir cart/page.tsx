import { supabase } from "../../lib/supabaseClient";

const TEST_USER_ID = "00000000-0000-0000-0000-000000000000"; // same as before

export default async function CartPage() {
  // Fetch cart items for the test user
  const { data: cartItems, error } = await supabase
    .from("cart")
    .select("id, quantity, product:product_id(*)")
    .eq("user_id", TEST_USER_ID);

  if (error) {
    console.error("Error fetching cart:", error);
    return <div>Error loading cart</div>;
  }

  const total = cartItems?.reduce((sum, item: any) => sum + item.quantity * item.product.price, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems && cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item: any) => (
            <div key={item.id} className="border p-4 rounded flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                <p>Quantity: {item.quantity}</p>
              </div>
              <p className="font-bold">${item.quantity * item.product.price}</p>
            </div>
          ))}
          <div className="mt-6 text-right font-bold text-xl">
            Total: ${total}
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const TEST_USER_ID = "00000000-0000-0000-0000-000000000000";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const fetchCart = async () => {
    const { data, error } = await supabase
      .from("cart")
      .select("id, quantity, product:product_id(*)")
      .eq("user_id", TEST_USER_ID);

    if (error) {
      console.error("Error fetching cart:", error);
    } else {
      setCartItems(data);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item: any) => (
            <div key={item.id} className="border p-4 rounded flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                <p>Quantity: {item.quantity}</p>
              </div>
              <p className="font-bold">${item.quantity * item.product.price}</p>
            </div>
          ))}
          <div className="mt-6 text-right font-bold text-xl">Total: ${total}</div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}
