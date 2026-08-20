"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Heroslider({ games = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!games.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % games.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [games]);

  const game = games[current];
  if (!game) return null;

  return (
    <div className="relative flex justify-center pt-12">
      <div className="absolute h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 p-4 backdrop-blur">
        <div className="relative h-100 overflow-hidden rounded-2xl bg-zinc-800">
          <Image
            src={game.cover_image}
            alt={game.name}
            fill
            loading="eager"
            quality={80}
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
        </div>

        <div className="mt-5">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
            Best Sells
          </span>
          <h3 className="mt-3 text-2xl font-bold">{game.name}</h3>
          <p className="mt-1 text-sm text-zinc-400">{game.genre}</p>
          <Link href={`/gameDetail/${game.slug}`}>
            <button className="mt-5 w-full rounded-xl bg-zinc-800 py-3 font-medium transition hover:bg-zinc-700">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
