"use client";

import {
  getOrCreateCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../js/cart-api";

import { supabase } from "@/app/lib/Supabase";
import useAuthStore from "../js/AuthStore";
import Loader from "../components/Loader";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
  const user = useAuthStore((state) => state.user);
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchCart = async () => {
      try {
        const cart = await getOrCreateCart(user.id);

        const { data, error } = await supabase
          .from("cart_items")
          .select(
            `
            *,
            games:game_id (
              id,
              name,
              price,
              discount_price,
              cover_image,
              slug,
              genre,
              stock
            )
          `,
          )
          .eq("cart_id", cart.id);

        if (error) throw error;

        let items = [];
        if (Array.isArray(data)) {
          items = data;
        } else if (data) {
          items = [data];
        }

        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      }
    };

    fetchCart();
  }, [user?.id]);

  if (cartItems === null) {
    return <Loader />;
  }

  const items = Array.isArray(cartItems) ? cartItems : [];

  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = items.reduce((sum, item) => {
    const games = item.games || {};
    const price = games.discount_price || games.price || 0;
    return sum + price * (item.quantity || 0);
  }, 0);

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
        <ShoppingCart className="mb-4 h-16 w-16 text-zinc-700" />
        <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
        <p className="mt-2 text-zinc-400">Add some games to get started!</p>
        <Link
          href="/games"
          className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-500"
        >
          Browse Games
        </Link>
      </div>
    );
  }

  const handleRemove = async (gameId) => {
    try {
      await removeFromCart(user.id, gameId);
      setCartItems((prev) => prev.filter((item) => item.game_id !== gameId));

      console.log("Item removed successfully");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleIncrement = async (item) => {
    const newQuantity = item.quantity + 1;
    try {
      await updateCartItemQuantity(user.id, item.game_id, newQuantity);

      setCartItems((prev) =>
        prev.map((i) =>
          i.game_id === item.game_id ? { ...i, quantity: newQuantity } : i,
        ),
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrement = async (item) => {
    const newQuantity = item.quantity - 1;

    try {
      await updateCartItemQuantity(user.id, item.game_id, newQuantity);
  
      if (newQuantity <= 0) {
        setCartItems((prev) => prev.filter((i) => i.game_id !== item.game_id));
      } else {
        setCartItems((prev) =>
          prev.map((i) =>
            i.game_id === item.game_id ? { ...i, quantity: newQuantity } : i,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-white">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-[2fr_380px]">
          {/* Cart Items */}
          <div className="space-y-5">
            {items.map((item) => {
              const games = item.games || {};
              const price = games.discount_price || games.price || 0;
              const hasDiscount =
                games.discount_price && games.discount_price < games.price;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700"
                >
                  <div className="flex flex-col gap-5 md:flex-row">
                    <div className="relative h-40 w-full overflow-hidden rounded-xl md:w-60">
                      <Image
                        src={games.cover_image || "/images/placeholder.jfif"}
                        alt={games.name || "Game"}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold text-white">
                          {games.name || "Unknown Game"}
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400">
                          {games.genre || "Unknown"}
                        </p>
                      </div>

                      {/* ⬇️ ردیف جدید: تعداد + قیمت + دکمه حذف */}
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        {/* کنترل تعداد */}
                        <div className="flex items-center gap-2">
                          {/* دکمه کاهش */}
                          <button
                            onClick={() => handleDecrement(item)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800 hover:border-zinc-600"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          {/* تعداد */}
                          <span className="w-10 text-center text-lg font-semibold text-white">
                            {item.quantity || 0}
                          </span>

                          {/* دکمه افزایش */}
                          <button
                            onClick={() => handleIncrement(item)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800 hover:border-zinc-600"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* قیمت */}
                        <div className="flex items-center gap-3">
                          {hasDiscount && (
                            <span className="text-zinc-500 line-through">
                              ${games.price}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-purple-400">
                            ${(price * (item.quantity || 0)).toFixed(2)}
                          </span>
                        </div>

                        {/* دکمه حذف */}
                        <button
                          onClick={() => handleRemove(item.game_id)}
                          className="flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:border-red-500/50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl font-semibold text-white">Order Summary</h2>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-zinc-400">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="border-t border-zinc-800 pt-5">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-white">Total</span>
                  <span className="text-3xl font-bold text-purple-400">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-8 w-full rounded-xl bg-purple-600 py-4 text-lg font-semibold text-white transition hover:bg-purple-500">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
