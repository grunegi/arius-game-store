"use client";

import Link from "next/link";
import Image from "next/image";

import WishlistButton from "./WishlistButton";

export default function NewReleases({ games }) {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-400">
              Fresh Arrivals
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              New Releases
            </h2>

            <p className="mt-3 text-zinc-500">
              Discover the latest games added to Arius.
            </p>
          </div>

          <Link
            href="/games"
            className="hidden text-sm font-medium text-cyan-400 transition hover:text-cyan-300 sm:block"
          >
            View All →
          </Link>
        </div>

        {/* Releases */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          {games?.slice(0, 4).map((game, index) => {
            const image =
              game.cover_image?.trim() || "/images/placeholder.jfif";

            return (
              <Link
                key={game.id}
                href={`/gameDetail/${game.slug}`}
                className={`group flex items-center gap-5 p-4 transition hover:bg-zinc-800/60 md:p-5 ${
                  index !== 0 ? "border-t border-zinc-800" : ""
                }`}
              >
                {/* Number */}
                <span className="hidden w-8 text-center text-sm font-semibold text-zinc-600 sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Image */}
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-800 md:h-28 md:w-24">
                  <Image
                    src={image}
                    alt={game.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Main Info */}
                {/* Main Info */}
                <div className="min-w-0 flex-1">
                  {/* اسم + قلب کنار هم */}
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-lg font-semibold text-white transition group-hover:text-cyan-400">
                      {game.name}
                    </h3>

                    <WishlistButton
                      itemId={game.id}
                      itemType="game"
                      size="sm"
                    />
                  </div>

                  <p className="mt-1 text-sm text-zinc-500">{game.genre}</p>

                  <p className="mt-3 text-xs text-zinc-600">
                    Released{" "}
                    {game.release_date
                      ? new Date(game.release_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : "Unknown"}
                  </p>
                </div>

                {/* Price */}
                <div className="hidden min-w-24 text-right sm:block">
                  {game.discount_price ? (
                    <>
                      <p className="text-xs text-zinc-600 line-through">
                        ${game.price}
                      </p>

                      <p className="mt-1 font-semibold text-green-400">
                        ${game.discount_price}
                      </p>
                    </>
                  ) : (
                    <p className="font-semibold text-green-400">
                      ${game.price}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <span className="text-lg text-zinc-700 transition group-hover:translate-x-1 group-hover:text-cyan-400">
                  →
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/games"
            className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            View All Games →
          </Link>
        </div>
      </div>
    </section>
  );
}
