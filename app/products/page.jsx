"use client";

import { getProducts } from "../js/data-fetch";
import Image from "next/image";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useEffect, useState } from "react";

function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-950/20">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.cover_image || "/images/placeholder.jfif"}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <button
          onClick={() => setIsFavorite((prev) => !prev)}
          className={`absolute right-3 top-3 rounded-full p-2 backdrop-blur transition ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-zinc-950/80 text-zinc-300 hover:bg-zinc-800"
          }`}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-current" : ""
            }`}
          />
        </button>

        <span className="absolute left-3 top-3 rounded-full bg-zinc-950/80 px-3 py-1 text-xs text-purple-300 backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs text-zinc-500">
          {product.brand}
        </p>

        <h2 className="mt-1 truncate text-lg font-semibold text-white">
          {product.name}
        </h2>

        <div className="mt-2 flex items-center gap-1 text-sm text-yellow-400">
          <Star className="h-4 w-4 fill-yellow-400" />
          <span>{product.rating}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">
              Price
            </p>

            <p className="text-lg font-bold text-purple-400">
              ${product.discount_price || product.price}
            </p>
          </div>

          <button disabled className="flex items-center gap-2 rounded-xl bg-purple-600 px-3 py-2 text-sm font-medium transition hover:bg-purple-500">
            <ShoppingCart className="h-4 w-4" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Accessories() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-4xl font-bold">
          Accessories
        </h1>

        <p className="mb-8 text-zinc-400">
          Gear up with the best gaming equipment
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}