"use client";

import WishlistButton from "../components/WishlistButton";

import Link from "next/link";
import Image from "next/image";

export default function FeaturedGames({ games }) {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-purple-400">
              Featured
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Trending Games
            </h2>

            <p className="mt-3 text-zinc-500">Discover games worth playing.</p>
          </div>

          <Link
            href="/games"
            className="hidden text-sm font-medium text-purple-400 transition hover:text-purple-300 sm:block"
          >
            View All →
          </Link>
        </div>

        {/* Games */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {games?.slice(0, 4).map((game) => {
            const image =
              game.cover_image?.trim() || "/images/placeholder.jfif";

            return (
              <article
                key={game.id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="pointer-events-none relative z-10">
                  <div className="relative aspect-3/4 overflow-hidden">
                    <Image
                      src={image}
                      alt={game.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

                    <div className="absolute left-3 top-3 rounded-lg bg-black/70 px-2.5 py-1 text-sm font-medium text-white backdrop-blur-sm">
                      ⭐ {game.rating ?? "N/A"}
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 pointer-events-auto">
                    <WishlistButton itemId={game.id} itemType="game" />
                  </div>

                  <div className="p-4">
                    <h3 className="truncate text-lg font-semibold text-white">
                      {game.name}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">{game.genre}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        {game.discount_price ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-600 line-through">
                              ${game.price}
                            </span>

                            <span className="font-semibold text-green-400">
                              ${game.discount_price}
                            </span>
                          </div>
                        ) : (
                          <span className="font-semibold text-green-400">
                            ${game.price}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/gameDetail/${game.slug}`}
                        className="pointer-events-auto text-xs text-zinc-600 transition group-hover:text-purple-400"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/games"
            className="text-sm font-medium text-purple-400 transition hover:text-purple-300"
          >
            View All Games →
          </Link>
        </div>
      </div>
    </section>
  );
}
