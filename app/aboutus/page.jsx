import Link from "next/link";
import { Gamepad2, Zap, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Hero */}
        <section className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600/10 border border-purple-500/20">
            <Gamepad2 className="text-purple-400" size={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Welcome to <span className="text-purple-400">Arius</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Arius is a modern gaming store built for players who want a simple,
            fast, and enjoyable way to discover their next favorite game.
          </p>
        </section>

        {/* About */}
        <section className="mt-20 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 md:p-10">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-purple-400">
              Our Vision
            </p>

            <h2 className="text-3xl font-bold">
              Gaming should be simple.
            </h2>

            <p className="mt-5 leading-8 text-zinc-400">
              We believe finding and managing your games shouldn&apos;t be
              complicated. Arius focuses on a clean experience where you can
              explore games, discover new titles, and manage your collection
              without unnecessary distractions.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 md:p-10">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-purple-400">
              Built for Players
            </p>

            <h2 className="text-3xl font-bold">
              Discover. Choose. Play.
            </h2>

            <p className="mt-5 leading-8 text-zinc-400">
              From popular releases to hidden gems, Arius is designed to make
              exploring a growing collection of games feel effortless and
              enjoyable.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-purple-500/40">
            <Zap className="mb-5 text-yellow-400" size={28} />

            <h3 className="text-xl font-semibold">
              Simple Experience
            </h3>

            <p className="mt-3 leading-7 text-zinc-400">
              A clean and focused interface designed to keep your gaming
              experience straightforward.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-purple-500/40">
            <ShieldCheck className="mb-5 text-green-400" size={28} />

            <h3 className="text-xl font-semibold">
              Your Account
            </h3>

            <p className="mt-3 leading-7 text-zinc-400">
              Manage your profile, wishlist, cart, and personal gaming
              preferences in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-purple-500/40">
            <Heart className="mb-5 text-red-400" size={28} />

            <h3 className="text-xl font-semibold">
              Made for Gamers
            </h3>

            <p className="mt-3 leading-7 text-zinc-400">
              Every part of Arius is designed around making game discovery
              easier and more enjoyable.
            </p>
          </div>

        </section>

        {/* CTA */}
        <section className="mt-20 overflow-hidden rounded-3xl border border-zinc-800 bg-linear-to-br from-purple-900/40 via-zinc-900 to-indigo-900/30 p-8 text-center md:p-14">

          <Gamepad2
            className="mx-auto mb-5 text-purple-400"
            size={36}
          />

          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to find your next game?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Explore the Arius collection and discover something worth playing.
          </p>

          <Link
            href="/games"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            Explore Games
            <ArrowRight size={18} />
          </Link>

        </section>

      </div>
    </main>
  );
}
