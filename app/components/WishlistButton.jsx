"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import useAuthStore from "../js/AuthStore";
import { toggleWishlistItem, isItemWished } from "../js/wishlist-api";

export default function WishlistButton({
  itemId,
  itemType = "game",
  size = "md",
}) {
  const user = useAuthStore((state) => state.user);
  const [wished, setWished] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const checkStatus = async () => {
      try {
        const status = await isItemWished(user.id, itemId, itemType);
        setWished(status);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkStatus();
  }, [user?.id, itemId, itemType]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user?.id) {
      alert("Please login first!");
      return;
    }

    try {
      setLoading(true);
      const result = await toggleWishlistItem(user.id, itemId, itemType);
      setWished(result.action === "added");
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded-full bg-zinc-700/80 p-2 backdrop-blur-sm transition hover:bg-zinc-700-600 active:scale-90 disabled:opacity-50"
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`
          ${sizes[size]} 
          transition-all duration-300
          ${wished ? "fill-red-600 text-red-700" : "fill-none text-white"}
        `}
      />
    </button>
  );
}