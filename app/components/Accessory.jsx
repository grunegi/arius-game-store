"use client";

import WishlistButton from "./WishlistButton";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

export default function AccessoriesSection({ products }) {

  if (!products.length) return null;

  return (
    <section className="mt-5 p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gaming Gear</h2>
          <p className="text-sm text-zinc-400">
            Complete your setup with pro equipment
          </p>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1 text-sm text-purple-400 transition hover:text-purple-300"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((p) => {
          const price = p.discount_price || p.price;
          const hasDiscount = p.discount_price && p.discount_price < p.price;

          return (
            <Link
              key={p.id}
              href="/accessories"
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-purple-500/40"
            >
              <div className="relative h-45 w-full overflow-hidden">
                <Image
                  src={p.cover_image || "/images/placeholder.jfif"}
                  alt={p.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />

                <div className="absolute top-3 right-3">
                  <WishlistButton itemId={p.id} itemType="product" />
                </div>

                <span className="absolute left-3 top-3 rounded-full bg-zinc-950/80 px-2.5 py-1 text-xs capitalize text-green-300">
                  {p.category}
                </span>
              </div>

              <div className="p-4">
                <p className="text-xs text-zinc-500">{p.brand}</p>
                <h3 className="mt-1 font-semibold text-white">{p.name}</h3>

                <div className="mt-2 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-yellow-400">
                    <Star className="h-3.5 w-3.5 fill-yellow-400" />
                    {p.rating}
                  </span>

                  <div className="text-right">
                    {hasDiscount && (
                      <span className="block text-xs text-zinc-500 line-through">
                        ${p.price}
                      </span>
                    )}
                    <span className="font-bold text-green-400">${price}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
