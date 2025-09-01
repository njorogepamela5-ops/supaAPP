import { supabase } from "../../lib/supabaseClient";

const TEST_USER_ID = "00000000-0000-0000-0000-000000000000"; // same as before

export default async function CartPage() {
  // Fetch cart items for the test user
  const { data: cartItems, error } = await supabase
    .from("cart")
    .select("id, quantity, product:product_id(*)")
    .eq("user_id", TEST_USER_ID);

  if (error) {
    return <div>Error loading cart: {error.message}</div>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems && cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.product.name} — {item.quantity} pcs
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart.</p>
      )}
    </div>
  );
}
