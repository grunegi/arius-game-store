import { searchResult } from "../../js/data-fetch";
import ResultError from "../../components/ErrorHandle/ResultError";

import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const game = await searchResult(slug);

  return {
    title: `${game.length} results for "${slug}"`,
    description: `Found ${game.length} games matching ${slug}`,
  };
}

export default async function SearchResult({ params }) {
  const { slug } = await params;
  const game = await searchResult(slug);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-5">
      {game.length !== 0 ? (
        <>
          {game.map((game) => (
            <div key={game.id}>
              <div className="relative group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-3/4 overflow-hidden">
                  <Image
                    src={game.cover_image}
                    alt={game.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-black/70 text-yellow-400 text-sm font-medium backdrop-blur-sm">
                      ⭐ {game.rating}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                      {game.genre}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-white truncate">
                    {game.name}
                  </h2>

                  <p className="mt-2 text-zinc-400 text-sm">{game.category}</p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">
                      ${game.price}
                    </span>

                    <Link href={`/gameDetail/${game.slug}`}>
                      <button className="px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-600 text-white font-medium transition">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="col-span-full flex items-center justify-center -mb-7.5">
          <ResultError />
        </div>
      )}
    </div>
  );
}
