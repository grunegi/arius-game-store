import Link from "next/link";
import { Rocket, ArrowLeft, Gamepad2 } from "lucide-react";

export const metadata = {
  title: "Coming Soon | Arius",
  description:
    "This Arius feature is currently under development. Stay tuned for future updates.",
};

export default function ComingSoonPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-2xl text-center">

        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-500/20 bg-purple-600/10 shadow-[0_0_40px_rgba(168,85,247,0.12)]">
          <Rocket
            size={38}
            className="text-purple-400"
          />
        </div>

        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-purple-400">
          Arius
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Coming Soon
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-400">
          We&apos;re working on something new for Arius.
          This feature isn&apos;t available yet, but it&apos;s on the way.
        </p>

        <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="flex items-center justify-center gap-3">
            <Gamepad2 className="text-purple-400" size={24} />

            <span className="text-lg font-semibold">
              More features are coming
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Arius is still growing. New tools, services, and features
            will be added in future updates.
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Arius
        </Link>

      </div>
    </main>
  );
}
