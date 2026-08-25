"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, HeartOff } from "lucide-react";

import useAuthStore from "../js/AuthStore";
import { getWishlistDetails } from "../js/wishlist-api";
import WishlistButton from "../components/WishlistButton";
import Loader from "../components/Loader";

function ItemCard({ item, type }) {
  const isGame = type === "game";
  const link = isGame ? `/gameDetail/${item.slug}` : "/accessories";

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-700 transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-3/4 overflow-hidden w-full">
        <Image
          src={item.cover_image || "/images/placeholder.jfif"}
          alt={item.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          <span className="px-3 py-1 rounded-full bg-black/70 text-yellow-400 text-sm font-medium backdrop-blur-sm">
            ⭐ {item.rating}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
              isGame ? "bg-blue-600" : "bg-green-600"
            }`}
          >
            {isGame ? item.genre : item.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <WishlistButton itemId={item.id} itemType={type} />
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-white truncate">{item.name}</h2>
        <p className="mt-2 text-zinc-400 text-sm">
          {isGame ? item.category : item.brand}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-green-400">
            ${item.discount_price || item.price}
          </span>
          <Link href={link}>
            <button className="px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-600 text-white font-medium transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const user = useAuthStore((state) => state.user);
  const [data, setData] = useState({ games: [], products: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        const result = await getWishlistDetails(user.id);
        setData(result);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();

    window.addEventListener("wishlist-changed", fetchWishlist);
    return () => window.removeEventListener("wishlist-changed", fetchWishlist);
  }, [user?.id, data]);

  if (loading) {
    return <Loader />;
  }

  const { games, products } = data;
  const isEmpty = games.length === 0 && products.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <HeartOff className="h-16 w-16 text-zinc-700" />
        <h1 className="text-2xl font-bold text-white">Your wishlist is empty</h1>
        <p className="text-zinc-400">Start adding games and gear you love!</p>
        <Link
          href="/games"
          className="px-6 py-3 rounded-lg bg-purple-800 hover:bg-purple-600 text-white"
        >
          Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-white flex items-center gap-3">
          <Heart className="h-9 w-9 text-red-500 fill-red-500" />
          My Wishlist
        </h1>

        {games.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-5 text-2xl font-bold text-white">
              Games ({games.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game) => (
                <ItemCard key={game.id} item={game} type="game" />
              ))}
            </div>
          </section>
        )}

        {products.length > 0 && (
          <section>
            <h2 className="mb-5 text-2xl font-bold text-white">
              Accessories ({products.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ItemCard key={product.id} item={product} type="product" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}