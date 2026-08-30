"use client";

import useAuthStore from "../js/AuthStore";
import { categorysForNavbar } from "../js/data-fetch";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

import {
  User,
  ShoppingCart,
  Heart,
  Package,
  Settings,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Menu,
  X,
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
  const [openGameCategories, setOpenGameCategories] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const [category, setCategory] = useState([]);

  const isLoged = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logedOut = useAuthStore((state) => state.logout);

  function formatUsername(text) {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const closeMobile = () => setOpenMobile(false);

  const mobileLink = "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition";

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await categorysForNavbar();
        const categories = [...new Set(data.map((item) => item.genre))];
        setCategory(categories);
      } catch (error) {
        console.log("error is : ", error);
      }
    };
    fetch();
  }, []);

  return (
    <nav className="relative z-100 w-full border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* لوگو */}
        <Link href="/" className="flex items-center">
          <Image
            className="hover:rotate-12 transition-transform duration-200"
            src="/icons/storeIcon.png"
            alt="store"
            width={52}
            height={52}
          />
        </Link>

        {/* ─────────── دسکتاپ ─────────── */}
        <div className="hidden flex-1 items-center md:flex">
          <div className="ml-6 max-w-xl flex-1">
            <Search />
          </div>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <Link href="/">
              <button className="px-3 py-2 text-sm text-zinc-300 rounded-lg hover:bg-zinc-800 hover:text-white transition">
                Home
              </button>
            </Link>

            <Link href="/games">
              <button className="px-3 py-2 text-sm text-zinc-300 rounded-lg hover:bg-zinc-800 hover:text-white transition">
                Games
              </button>
            </Link>

            <div className="relative">
              <button
                onClick={() => {
                  setOpenCategory(!openCategory);
                  setOpenGameCategories(false);
                }}
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
                  <div
                    onClick={() => {
                      setOpenCategory(false);
                      setOpenGameCategories(false);
                    }}
                    className="fixed inset-0 z-40"
                  />
                  <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
                    {!openGameCategories ? (
                      <div className="p-2">
                        <button
                          onClick={() => setOpenGameCategories(true)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                        >
                          <span>Games</span>
                          <ChevronRight size={16} className="text-zinc-500" />
                        </button>

                        <Link
                          href="/products"
                          onClick={() => {
                            setOpenCategory(false);
                            setOpenGameCategories(false);
                          }}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                        >
                          <span>Products</span>
                          <ChevronRight size={16} className="text-zinc-500" />
                        </Link>
                      </div>
                    ) : (
                      <div className="p-2">
                        <button
                          onClick={() => setOpenGameCategories(false)}
                          className="mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                        >
                          <ArrowLeft size={15} />
                          <span>Games</span>
                        </button>

                        <div className="border-t border-zinc-800 my-1" />
                        {category.map((cat) => (
                          <Link
                            key={cat}
                            href={`/category/${cat}`}
                            onClick={() => {
                              setOpenCategory(false);
                              setOpenGameCategories(false);
                            }}
                          >
                            <div className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
                              {cat}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

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
                    <div
                      onClick={() => setOpenProfile(false)}
                      className="fixed inset-0 z-40"
                    />
                    <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl z-50">
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

                      <Link href="/cart" onClick={() => setOpenProfile(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 transition">
                        <ShoppingCart size={18} />
                        <span>My Cart</span>
                      </Link>
                      <Link href="/wishlist" onClick={() => setOpenProfile(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 transition">
                        <Heart size={18} />
                        <span>Wishlist</span>
                      </Link>
                      <Link href="/orders" onClick={() => setOpenProfile(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 transition">
                        <Package size={18} />
                        <span>Orders</span>
                      </Link>

                      <div className="border-t border-zinc-800 my-1" />

                      <Link href="/profile" onClick={() => setOpenProfile(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 transition">
                        <User size={18} />
                        <span>Profile</span>
                      </Link>
                      <Link href="/setting" onClick={() => setOpenProfile(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 transition">
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

        {/* ─────────── موبایل: دکمه همبرگر ─────────── */}
        <button
          onClick={() => setOpenMobile(!openMobile)}
          className="rounded-lg p-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white md:hidden"
        >
          {openMobile ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ─────────── منوی موبایل ─────────── */}
      {openMobile && (
        <div className="border-t border-zinc-800 bg-zinc-900 px-4 py-4 md:hidden">
          <Search />

          <div className="mt-4 flex flex-col gap-1">
            <Link href="/" onClick={closeMobile} className={mobileLink}>Home</Link>
            <Link href="/games" onClick={closeMobile} className={mobileLink}>Games</Link>
            <Link href="/products" onClick={closeMobile} className={mobileLink}>Products</Link>
          </div>

          <div className="mt-4">
            <p className="mb-1 px-3 text-xs uppercase text-zinc-500">
              Game Categories
            </p>
            <div className="flex flex-col gap-1">
              {category.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat}`}
                  onClick={closeMobile}
                  className={mobileLink}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 border-t border-zinc-800 pt-4">
            {isLoged && user ? (
              <>
                <div className="mb-3 flex items-center gap-3 px-3">
                  <Image
                    src={user.avatar_url || "/images/default-avatar.png"}
                    alt={user.username}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {formatUsername(user.username)}
                    </p>
                    <p className="text-xs text-zinc-500">{user.email}</p>
                  </div>
                </div>

                <Link href="/cart" onClick={closeMobile} className={mobileLink}>
                  <ShoppingCart size={18} /> My Cart
                </Link>
                <Link href="/wishlist" onClick={closeMobile} className={mobileLink}>
                  <Heart size={18} /> Wishlist
                </Link>
                <Link href="/orders" onClick={closeMobile} className={mobileLink}>
                  <Package size={18} /> Orders
                </Link>
                <Link href="/profile" onClick={closeMobile} className={mobileLink}>
                  <User size={18} /> Profile
                </Link>
                <Link href="/setting" onClick={closeMobile} className={mobileLink}>
                  <Settings size={18} /> Settings
                </Link>

                <button
                  onClick={() => {
                    logedOut();
                    closeMobile();
                    redirect("/");
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-red-400 transition hover:bg-red-500/10"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={closeMobile}>
                <button className="w-full rounded-lg bg-purple-600 py-2.5 text-white transition hover:bg-purple-500">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}