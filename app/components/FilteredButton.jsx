"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FilterButton() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState("all");

  const clearFilters = () => {
    setPrice(null);
    setRating("all");
  };

  const applyFilter = () => {
    if (price === null && rating === "all") {
      setIsOpen(false);
      return;
    }

    if (price !== null && rating === "all") {
      router.push(`/filter?filter=price&value=${price}`);
      setIsOpen(false);
      return;
    }

    // فقط Rating
    if (price === null && rating !== "all") {
      router.push(`/filter?filter=rating&value=${rating}`);
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex items-center gap-2 rounded-xl
          border border-zinc-800 bg-zinc-900
          px-4 py-3 text-sm font-medium text-zinc-300
          transition hover:border-purple-700
          hover:bg-zinc-800 hover:text-white
        "
      >
        <SlidersHorizontal size={17} />

        <span>Filter</span>

        {(price !== null || rating !== "all") && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1.5 text-xs text-white">
            {(price !== null ? 1 : 0) +
              (rating !== "all" ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
          />

          {/* Dropdown */}
          <div
            className="
              absolute right-0 z-50 mt-2 w-72
              rounded-2xl border border-zinc-800
              bg-zinc-900 p-5 shadow-2xl
            "
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-white">
                Filter
              </h3>

              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 transition hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">
                  Price Range
                </label>

                <span className="text-sm font-semibold text-purple-400">
                  {price === null ? "Any Price" : `$${price} - $${price + 9.99}`}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={price ?? 1}
                onChange={(e) =>
                  setPrice(Number(e.target.value))
                }
                className="w-full cursor-pointer accent-purple-600"
              />

              <div className="mt-1 flex justify-between text-xs text-zinc-600">
                <span>$1</span>
                <span>$100</span>
              </div>

              {/* Disable Price */}
              <button
                type="button"
                onClick={() => setPrice(null)}
                className="mt-2 text-xs text-zinc-500 transition hover:text-purple-400"
              >
                Any Price
              </button>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="
                  w-full rounded-lg border border-zinc-800
                  bg-zinc-950 px-3 py-2.5 text-sm
                  text-zinc-300 outline-none
                  focus:border-purple-500
                "
              >
                <option value="all">
                  Any Rating
                </option>

                <option value="1">
                  1 ⭐
                </option>

                <option value="2">
                  2 ⭐
                </option>

                <option value="3">
                  3 ⭐
                </option>

                <option value="4">
                  4 ⭐
                </option>

                <option value="5">
                  5 ⭐
                </option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={clearFilters}
                className="
                  flex-1 rounded-lg border border-zinc-800
                  px-3 py-2 text-sm text-zinc-400
                  transition hover:bg-zinc-800
                  hover:text-white
                "
              >
                Clear
              </button>

              <button
                onClick={applyFilter}
                className="
                  flex-1 rounded-lg bg-purple-600
                  px-3 py-2 text-sm font-medium text-white
                  transition hover:bg-purple-500
                "
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}