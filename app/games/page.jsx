import { fetchAllGames } from "../js/data-fetch";
import ErrorDisplay from "../components/ErrorHandle/ErrorDisplay";

import Image from "next/image";
import Link from "next/link";

const games = await fetchAllGames();

export async function generateMetadata() {
  return {
    title: games.name,
    description: games.description,
  };
}

export default function Games() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-5">
      {/*game card*/}
      {games ? (
        <>
          {games.map((game) => (
            <div key={game.id}>
              <div className="group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={game.cover_image}
                    alt={game.name}
                    fill
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                      <button className="px-4 py-2 rounded-lg bg-lime-800 hover:bg-lime-600 text-white font-medium transition">
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
        <ErrorDisplay
          type="500"
          showRetryButton={true}
          onRetry={() => reset()}
        />
      )}
    </div>
  );
}
