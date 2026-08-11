"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export function slugyfiy(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function Search() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    if (!search.trim()) {
      inputRef.current.focus();
    }

    if (search.trim()) {
      router.push(`/searchResult/${slugyfiy(search)}`);
    }
  };

  return (
    <div className="relative w-112.5 flex items-center">
      <input
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && search.trim()) {
            router.push(`/searchResult/${slugyfiy(search)}`);
          }
        }}
        value={search}
        ref={inputRef}
        type="text"
        placeholder="Search games..."
        className="
              w-full
              bg-zinc-800
              border
              border-zinc-700
              rounded-lg
              py-2
              pl-10
              pr-4
              text-white
              focus:outline-none
              focus:border-white
            "
      />

      <button
        onClick={handleClick}
        className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              hover:opacity-70
              transition
              duration-200
              color-white
            "
      >
        <Image
          src="/icons/searchBox2.png"
          loading="eager"
          alt="search"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
