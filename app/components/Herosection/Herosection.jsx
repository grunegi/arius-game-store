import Herofetch from "./Herofetch";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background Glow */}{" "}
      <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[140px]" />
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-10
          bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)]
          bg-size-[45px_45px]"
      />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left Side */}
        <div>
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            New Releases Available
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Discover Your Next
            <span className="block bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Favorite Game
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            Explore thousands of games across every genre. Discover new
            releases, top-rated titles, and unforgettable adventures.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/games">
              <button
                className="rounded-xl bg-purple-600 px-7 py-3 font-medium transition
                hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]"
              >
                Browse Games
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-10">
            <div>
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-zinc-500">Games</p>
            </div>

            <div>
              <p className="text-2xl font-bold">4.9</p>
              <p className="text-sm text-zinc-500">Rating</p>
            </div>

            <div>
              <p className="text-2xl font-bold">12+</p>
              <p className="text-sm text-zinc-500">Genres</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <Herofetch />
      </div>
    </section>
  );
}
