import {
  filterGamesByPrice,
  filterGamesByRating,
  filterProductsByPrice,
  filterProductsByRating,
} from "../js/filter-api";

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Filtered Results | Arius",
  description:
    "Browse games and gaming products based on your selected filters.",
};

export default async function FilterPage({ searchParams }) {
  const params = await searchParams;

  const filter = params?.filter;
  const value = params?.value;

  let games = [];
  let products = [];

  if (filter === "price" && value) {
    games = await filterGamesByPrice(value);
    products = await filterProductsByPrice(value);
  }

  if (filter === "rating" && value) {
    games = await filterGamesByRating(value);
    products = await filterProductsByRating(value);
  }

  const filterLabel =
    filter === "price"
      ? `$${value} - $${Number(value) + 9.99}`
      : filter === "rating"
        ? `⭐ ${value} Rating`
        : "All Results";

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="mb-14">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-purple-400">
            <span className="h-px w-8 bg-purple-500" />
            Filter Results
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Discover Your Match
              </h1>

              <p className="mt-3 max-w-2xl text-zinc-500">
                Browse games and gaming products that match your
                selected preferences.
              </p>
            </div>

            {/* Active Filter */}
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                {filterLabel}
              </span>

              <Link
                href="/"
                className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                Clear
              </Link>
            </div>
          </div>
        </section>

        {/* Games */}
        <section className="mb-20">

          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="mb-1 text-sm font-medium uppercase tracking-widest text-purple-400">
                Games
              </p>

              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Games For You
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                {games.length} games match your filter.
              </p>
            </div>

            <Link
              href="/games"
              className="hidden text-sm font-medium text-purple-400 transition hover:text-purple-300 sm:block"
            >
              View Games →
            </Link>
          </div>

          {games.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={`/filter/${game.slug}`}
                  className="group"
                >
                  <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700">

                    <div className="relative aspect-3/4 overflow-hidden">
                      <Image
                        src={
                          game.cover_image ||
                          "/images/placeholder.jfif"
                        }
                        alt={game.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-yellow-400 backdrop-blur-md">
                          ⭐ {game.rating}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="truncate font-semibold text-white">
                        {game.name}
                      </h3>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-green-400">
                          ${game.price}
                        </span>

                        <span className="text-xs text-zinc-600 transition group-hover:text-purple-400">
                          View →
                        </span>
                      </div>
                    </div>

                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState type="games" />
          )}
        </section>

        {/* Products */}
        <section>

          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="mb-1 text-sm font-medium uppercase tracking-widest text-cyan-400">
                Products
              </p>

              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Gaming Gear
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                {products.length} products match your filter.
              </p>
            </div>

            <Link
              href="/products"
              className="hidden text-sm font-medium text-cyan-400 transition hover:text-cyan-300 sm:block"
            >
              View Products →
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700">

                    <div className="relative overflow-hidden bg-zinc-950">
                      <Image
                        src={
                          product.cover_image ||
                          "/images/placeholder.jfif"
                        }
                        alt={product.name}
                        fill
                        className="object-cover p-6 transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="truncate font-semibold text-white">
                        {product.name}
                      </h3>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-green-400">
                          ${product.price}
                        </span>

                        <span className="text-xs text-zinc-600 transition group-hover:text-cyan-400">
                          View →
                        </span>
                      </div>
                    </div>

                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState type="products" />
          )}
        </section>

      </div>
    </main>
  );
}


/* Empty State */

function EmptyState({ type }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-xl">
        {type === "games" ? "🎮" : "🛒"}
      </div>

      <h3 className="font-semibold text-white">
        No {type} found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
        We couldn&apos;t find any {type} matching this filter.
        Try selecting a different option.
      </p>
    </div>
  );
}