"use client";

import useAuthStore from "../js/AuthStore";
import { categorysForNavbar } from "../js/data-fetch";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import ErrorDisplay from "./ErrorHandle/ErrorDisplay";

import {
  User,
  ShoppingCart,
  Heart,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const isOnline = useOnlineStatus();
  const [openProfile, setOpenProfile] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState("");

  const isLoged = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logedOut = useAuthStore((state) => state.logout);

  function formatUsername(text) {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  useEffect(() => {
    const fetch = async () => {
      if (!isOnline) {
        return (
          <ErrorDisplay
            type="offline"
            showRetryButton={true}
            onRetry={() => window.location.reload()}
          />
        );
      }

      try {
        const data = await categorysForNavbar();
        const categories = [...new Set(data.map((item) => item.genre))];

        setCategory(categories);
      } catch (error) {
        if (error) {
          console.log("error is : ", error);
        }
      }
    };

    fetch();
  }, [isOnline]);

  return (
    <nav className="relative z-100 w-full border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center">
          <Image
            className="hover:rotate-12 transition-transform duration-200"
            src="/icons/storeIcon.png"
            alt="store"
            width={52}
            height={52}
          />
        </Link>

        {/* Search (center grow) */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <Search />
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          {/* Home */}
          <Link href="/">
            <button className="px-3 py-2 text-sm text-zinc-300 rounded-lg hover:bg-zinc-800 hover:text-white transition">
              Home
            </button>
          </Link>

          {/* Games */}
          <Link href="/games">
            <button className="px-3 py-2 text-sm text-zinc-300 rounded-lg hover:bg-zinc-800 hover:text-white transition">
              Games
            </button>
          </Link>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="flex items-center gap-1 px-3 py-2 text-sm text-zinc-300 rounded-lg hover:bg-zinc-800 hover:text-white transition"
            >
              Categories
              <span
                className={`transition-transform duration-200 ${
                  openCategory ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {openCategory && (
              <>
                {/* overlay */}
                <div
                  onClick={() => setOpenCategory(false)}
                  className="fixed inset-0 z-40"
                />

                {/* dropdown */}
                <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
                  <div className="p-2">
                    {category.map((cat) => (
                      <Link
                        key={cat}
                        href={`/category/${cat}`}
                        onClick={() => setOpenCategory(false)}
                      >
                        <div className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
                          {cat}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Login */}
          {isLoged && user ? (
            <div className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                title={formatUsername(user.username)}
                className="w-11 h-11 rounded-full overflow-hidden border-2 border-purple-500 hover:border-purple-400 transition shadow-[0_0_20px_rgba(168,85,247,0.25)]"
              >
                <Image
                  src={user.avatar_url || "/images/default-avatar.png"}
                  alt={user.username}
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              </button>

              {openProfile && (
                <>
                  {/* Overlay */}
                  <div
                    onClick={() => setOpenProfile(false)}
                    className="fixed inset-0 z-40"
                  />

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl z-50">
                    {/* User */}
                    <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-4">
                      <Image
                        src={user.avatar_url || "/images/default-avatar.png"}
                        alt={user.username}
                        width={45}
                        height={45}
                        className="rounded-full object-cover"
                      />

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {formatUsername(user.username)}
                        </p>

                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>

                    <Link
                      href="/cart"
                      onClick={() => setOpenProfile(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 transition"
                    >
                      <ShoppingCart size={18} />
                      <span>My Cart</span>
                    </Link>

                    <Link
                      href="/wishlist"
                      onClick={() => setOpenProfile(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 transition"
                    >
                      <Heart size={18} />
                      <span>Wishlist</span>
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setOpenProfile(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 transition"
                    >
                      <Package size={18} />
                      <span>Orders</span>
                    </Link>

                    <div className="border-t border-zinc-800 my-1" />

                    <Link
                      href="/profile"
                      onClick={() => setOpenProfile(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 transition"
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>

                    <Link
                      href="/setting"
                      onClick={() => setOpenProfile(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 transition"
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </Link>

                    <div className="border-t border-zinc-800 my-1" />

                    <button
                      onClick={() => {
                        logedOut();
                        setOpenProfile(false);
                        redirect("/");
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
