import { supabase } from "../lib/supabaseClient";
import { addToCart } from "../lib/cartFunctions";

// Temporary test user ID for now
const TEST_USER_ID = "00000000-0000-0000-0000-000000000000";

export default async function HomePage() {
  // Fetch products from Supabase
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-3 gap-6">
        {products?.map((product: any) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="mt-2">${product.price}</p>
            <button
              onClick={() => addToCart(TEST_USER_ID, product.id, 1)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
<button
  onClick={() => addToCart(TEST_USER_ID, product.id, 1)}
  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
>
  Add to Cart
</button>
import { initiateSTKPush } from "../../lib/payment";
import { generateInvoice } from "../../lib/invoice";

const handleCheckout = async () => {
  try {
    const stkResponse = await initiateSTKPush("2547XXXXXXXX", total);

    // If payment succeeded
    if (stkResponse.success) {
      await generateInvoice(TEST_USER_ID, "ORDER_ID_FROM_CART", total);
      alert("Payment successful! Invoice generated.");
    } else {
      alert("Payment failed.");
    }
  } catch (error) {
    console.error(error);
    alert("Error during payment.");
  }
};
<div className="p-4 border rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
  <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
  <h3 className="text-lg font-bold mt-2">{product.name}</h3>
  <p className="text-gray-600">{product.price} KES</p>
</div>
"use client"; // this is important for useState and useEffect
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.log("Error fetching products:", error);
    else setProducts(data || []);
    setLoading(false);
  }

  async function addToCart(productId: string) {
    const userId = "CURRENT_USER_UUID"; // Replace with the actual logged-in user's ID
    const { error } = await supabase.from("cart").insert([
      { user_id: userId, product_id: productId, quantity: 1 },
    ]);

    if (error) console.log("Error adding to cart:", error);
    else alert("Product added to cart!");
  }

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-4">
            <div>{product.name} - {product.price} KES</div>
            <button
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
impoasync function checkout() {
  const total = cart.reduce((acc, item) => acc + item.quantity * item.products.price, 0);
  const phone = prompt("Enter your phone number (e.g., 2547XXXXXXXX)");

  if (!phone) return alert("Phone number is required");

  const result = await initiateStkPush(phone, total);
  alert(result.message || "Payment failed");
}
<button
  className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
  onClick={checkout}
>
  Pay Now
</button>

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mozjvtobsibktmndfqoz.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
import { supabase } from "../lib/supabaseClient";
import { addToCart } from "../lib/cartClient";

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) console.error(error);

  const handleAddToCart = async (productId: number) => {
    const user = supabase.auth.user(); // gets logged-in user
    if (!user) {
      alert("Please log in first!");
      return;
    }
    await addToCart(user.id, productId);
    alert("Product added to cart!");
  };

  return (
    <div>
      {products?.map((p) => (
        <div key={p.id}>
          <h2>{p.name}</h2>
          <p>{p.price}</p>
          <button onClick={() => handleAddToCart(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
import { supabase } from "../../lib/supabaseClient";
import { getCart } from "../../lib/cartFetch";

export default async function CartPage() {
  const user = supabase.auth.user();
  if (!user) return <p>Please log in to view your cart.</p>;

  const cartItems = await getCart(user.id);

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.products.price,
    0
  );

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>
            {item.products.name} x {item.quantity} ={" "}
            {item.quantity * item.products.price} KES
          </p>
        </div>
      ))}
      <h2>Total: {total} KES</h2>
      <button onClick={() => alert("Next step: STK Push!")}>
        Pay Now
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { getCart } from "../../lib/cartFetch";

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const user = supabase.auth.user();

  if (!user) return <p>Please log in to view your cart.</p>;

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  // Fetch cart on component mount
  useState(() => {
    getCart(user.id).then((items) => {
      setCartItems(items);
      const sum = items.reduce(
        (acc, item) => acc + item.quantity * item.products.price,
        0
      );
      setTotal(sum);
    });
  });

  const handlePayNow = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://mozjvtobsibktmndfqoz.supabase.co/functions/v1/stk_push",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: user.user_metadata.phone, // ensure this is stored
            amount: total,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("STK Push sent! Check your phone to complete payment.");
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>
            {item.products.name} x {item.quantity} ={" "}
            {item.quantity * item.products.price} KES
          </p>
        </div>
      ))}
      <h2>Total: {total} KES</h2>
      <button onClick={handlePayNow} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
// app/page.tsx
import { getProducts } from "../lib/products";

export default async function Home() {
  // Fetch products from Supabase
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 bg-white shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
"use client";

import { useCart } from "@/lib/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Products() {
  const { addToCart } = useCart();

  const products: Product[] = [
    { id: 1, name: "Apple", price: 5 },
    { id: 2, name: "Banana", price: 3 },
    { id: 3, name: "Orange", price: 4 },
  ];

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded bg-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => addToCart({ ...product, quantity: 1 })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/CartContext";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from<Product>("products").select("*");
      if (error) console.error("Error fetching products:", error);
      else setProducts(data || []);
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded bg-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => addToCart({ ...product, quantity: 1 })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
import toast from 'react-hot-toast';

// Success example
toast.success('Item added to cart!');

// Error example
toast.error('Something went wrong');

// Loading example
const loadingToast = toast.loading('Processing...');
// supa-app/app/page.tsx
"use client"; // required for React hooks in Next.js 15 App Router

import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch products from Supabase
  React.useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        toast.error("Failed to fetch products");
      } else {
        setProducts(data as Product[]);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    toast("Item removed from cart");
  };

  const checkout = async () => {
    const total = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const phone = prompt("Enter your phone number (e.g., 2547XXXXXXXX)");
    if (!phone) return toast.error("Checkout cancelled");

    try {
      // Call your STK push edge function here
      const response = await fetch("/api/stk_push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: total }),
      });
      const data = await response.json();
      toast.success("Payment initiated!");
      console.log(data);
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  return (
    <div>
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.price} KES</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-bold mb-2">Cart</h2>
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <p className="font-bold mt-2">
            Total:{" "}
            {cart.reduce(
              (acc, item) => acc + item.product.price * item.quantity,
              0
            )}{" "}
            KES
          </p>
          <button
            onClick={checkout}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
// supa-app/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) toast.error("Failed to fetch products");
      else setProducts(data as Product[]);
    }
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists)
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    toast("Item removed from cart");
  };

  const checkout = async () => {
    const total = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const phone = prompt("Enter your phone number (e.g., 2547XXXXXXXX)");
    if (!phone) return toast.error("Checkout cancelled");

    try {
      const response = await fetch("/api/stk_push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: total }),
      });
      const data = await response.json();
      toast.success("Payment initiated!");
      console.log(data);
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.price} KES</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-2xl font-bold mb-2">Cart</h2>
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <button
                className="text-red-500"
                onClick={() => removeFromCart(item.product.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <p className="font-bold">
            Total:{" "}
            {cart.reduce(
              (acc, item) => acc + item.product.price * item.quantity,
              0
            )}{" "}
            KES
          </p>
          <button
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
const supabase = createClient(supabaseUrl, supabaseKey)rt "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;


export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
