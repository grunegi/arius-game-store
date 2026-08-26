"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GameplayGallery({ game }) {
  const trackRef = useRef(null);
  const screenshots = game.screenshots || [];

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth / 2), behavior: "smooth" });
  };

  return (
    <section className="mt-5 max-w-full overflow-hidden">
      <div className="rounded-2xl borde p-6">

        <div className="relative">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur hover:bg-black/80"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            className="flex max-w-full gap-3 overflow-x-auto px-10 py-1"
            style={{ scrollbarWidth: "none" }}
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const src = screenshots[i];
              return (
                <div
                  key={i}
                  className="relative h-28 w-48 shrink-0 overflow-hidden rounded-lg border border-zinc-800 hover:border-purple-500 md:h-36 md:w-64"
                >
                  {src ? (
                    <Image src={src} alt="" fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-800/60 text-sm text-zinc-600">
                      {i + 1}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur hover:bg-black/80"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}