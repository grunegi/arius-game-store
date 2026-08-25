"use client";

import { getProducts } from "../js/data-fetch";
import WishlistButton from "../components/WishlistButton";
import ErrorDisplay from "../components/ErrorHandle/ErrorDisplay";
import Loader from "../components/Loader";

import Image from "next/image";
import { useEffect, useState } from "react";

function ProductCard({ product }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-700 transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-3/4 overflow-hidden w-full">
        <Image
          src={product.cover_image || "/images/placeholder.jfif"}
          alt={product.name}
          fill
          loading="eager"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          <span className="px-3 py-1 rounded-full bg-black/70 text-yellow-400 text-sm font-medium backdrop-blur-sm">
            ⭐ {product.rating}
          </span>
          <span className="px-3 py-1 rounded-full bg-green-600 text-white text-xs font-semibold">
            {product.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <WishlistButton itemId={product.id} itemType="product" />
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-white truncate">
          {product.name}
        </h2>

        <p className="mt-2 text-zinc-400 text-sm">{product.brand}</p>

        <div className="mt-5 flex items-center justify-between">
          {product.discount_price ? (
            <div className="flex flex-col">
              <span className="text-sm text-zinc-500 line-through">
                ${product.price}
              </span>
              <span className="text-2xl font-bold text-green-400">
                ${product.discount_price}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-green-400">
              ${product.price}
            </span>
          )}

          <button className="px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-600 text-white font-medium transition">
            View Details
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

  if (products.length === [] || 0) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-4xl font-bold">Accessories</h1>

        <p className="mb-8 text-zinc-400">
          Gear up with the best gaming equipment
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
