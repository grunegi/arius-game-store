"use client";

import { filteredGame } from "../../js/data-fetch";
import ErrorDisplay from "../../components/ErrorHandle/ErrorDisplay";
import StatusPopup from "../../components/StatusPopup";
import useAuthStore from "../../js/AuthStore";

import { getOrCreateCart, addToCart } from "../../js/cart-api";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function GameDetail({ params }) {
  const user = useAuthStore((state) => state.user);

  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [slug, setSlug] = useState(null);
  const [status, setStatus] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { slug } = await params;
      if (!slug) return;
      setSlug(slug);

      try {
        setError(null);

        const data = await filteredGame(slug);

        if (!data) {
          setError("404");
          return;
        }

        setGame(data);
      } catch (err) {
        console.error("Error fetching game:", err);
        setError("500");
      }
    };

    fetchData();
  }, [params]);

  if (!slug || !game) {
    return null;
  }

  if (error === "404") {
    return <ErrorDisplay type="404" title="Game Not Found" />;
  }

  if (error === "500") {
    return (
      <ErrorDisplay
        type="500"
        showRetryButton={true}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const coverImage = game.cover_image?.trim() || "/images/placeholder.jfif";

  const handleAddToCart = async () => {
    if (!user) {
      setStatus({
        type: "error",
        title: "Login Required",
        message: "Please login or create your account first.",
      });
      return;
    }

    try {
      setIsAdding(true);

      await getOrCreateCart(user.id);
      const result = await addToCart(user.id, game.id);

      if (result) {
        setStatus({
          type: "success",
          title: "Success!",
          message: `${game.name} successfully added to your cart.`,
        });
      }
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      setStatus({
        type: "error",
        title: "Error",
        message: "Failed to add the game to your cart. Please try again.",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Top Section */}
          <section className="grid lg:grid-cols-[2fr_1fr] gap-6">
            {/* Image */}
            <div className="relative overflow-hidden object-cover object-center rounded-2xl border border-zinc-800 h-137.5">
              <Image
                src={coverImage}
                alt={game.name}
                fill
                loading="eager"
                className="bg-zinc-900 object-cover"
                priority
                onError={(e) => {
                  e.target.src = "/images/placeholder.jfif";
                }}
              />
            </div>

            {/* Info */}
            <aside className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="relative aspect-0.5/0.5 rounded-xl mb-6 overflow-hidden">
                <Image
                  src={coverImage}
                  alt={game.name}
                  fill
                  loading="eager"
                  className="relative object-cover"
                  onError={(e) => {
                    e.target.src = "/images/placeholder.jfif";
                  }}
                />
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-zinc-500 text-sm">Genre</p>
                  <p className="font-medium">{game.genre}</p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Platform</p>
                  <p className="font-medium">{game.platform}</p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Rating</p>
                  <p className="font-medium">⭐ {game.rating ?? "N/A"}</p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Publisher</p>
                  <p className="font-medium">{game.publisher || "Unknown"}</p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Developer</p>
                  <p className="font-medium">{game.developer || "Unknown"}</p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Release Date</p>
                  <p className="font-medium">{game.release_date}</p>
                </div>
              </div>
            </aside>
          </section>

          {/* Purchase Box */}
          <section className="mt-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-5">
              <div>
                <h2 className="text-2xl font-semibold">{game.name}</h2>

                <div className="mt-2">
                  {game.discount_price ? (
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500 line-through">
                        ${game.price}
                      </span>

                      <span className="text-green-400 text-xl font-bold">
                        ${game.discount_price}
                      </span>
                    </div>
                  ) : (
                    <span className="text-green-400 text-xl font-bold">
                      ${game.price}
                    </span>
                  )}
                </div>
              </div>
              <button
                disabled={game.stock <= 0 || isAdding}
                onClick={handleAddToCart}
                className="
                  px-8 py-3 rounded-xl font-medium transition
                  bg-purple-800 hover:bg-purple-600
                  disabled:bg-zinc-700
                  disabled:cursor-not-allowed"
              >
                {game.stock <= 0 
                  ? "Out Of Stock" 
                  : isAdding 
                  ? "Adding..." 
                  : "Add To Cart"}
              </button>
            </div>
          </section>

          {/* About Game */}
          <section className="mt-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-5">About Game</h2>
              <p className="text-zinc-300 leading-8">{game.description}</p>
            </div>
          </section>
        </div>
      </main>

      <StatusPopup status={status} onClose={() => setStatus(null)} />
    </div>
  );
}