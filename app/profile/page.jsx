"use client";

import useAuthStore from "../js/AuthStore";

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import {
  User,
  Mail,
  Gamepad2,
  ShoppingCart,
  Heart,
  Package,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const logedout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, [user]);

  if (!user) return null;

  function formatUsername(text) {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-5xl">
     
        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
  
          <div className="h-40 bg-linear-to-r from-purple-700 via-purple-600 to-indigo-600" />

        
          <div className="relative px-8 pb-8">
            <div className="-mt-16 flex flex-col items-center md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-end">
                <div className="overflow-hidden rounded-full border-4 border-zinc-900 shadow-[0_0_25px_rgba(168,85,247,.35)]">
                  <Image
                    src={user.avatar_url || "/images/defultPicture.jfif"}
                    alt="defult_picture"
                    width={120}
                    height={120}
                    className="h-30 w-30 object-cover"
                  />
                </div>

                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-white">
                    {formatUsername(user.username)}
                  </h1>

                  <p className="mt-2 text-zinc-400">{user.email}</p>
                </div>
              </div>

              <button
                className="
                    mt-6
                    rounded-xl
                    bg-purple-600
                    px-5
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-purple-500
                    md:mt-0"
              >
                <Link href="/profile/edit">Edit Profile</Link>
              </button>
            </div>
          </div>
        </div>

      

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <Package className="mb-3 text-purple-400" size={28} />

            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">Orders</p>
              <h2 className="text-3xl font-bold text-white">0</h2>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <Heart className="mb-3 text-red-400" size={28} />

            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">Wishlist</p>
              <h2 className="text-3xl font-bold text-white">0</h2>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <ShoppingCart className="mb-3 text-green-400" size={28} />

            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">Cart</p>
              <h2 className="text-3xl font-bold text-white">0</h2>
            </div>
          </div>
        </div>

     

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
        

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-6 py-5">
              <h2 className="text-xl font-semibold text-white">
                Account Information
              </h2>
            </div>

            <div className="space-y-6 p-6">
              <div className="flex items-center gap-4">
                <User className="text-purple-400" />

                <div>
                  <p className="text-sm text-zinc-500">Username</p>

                  <p className="text-white">{formatUsername(user.username)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-purple-400" />

                <div>
                  <p className="text-sm text-zinc-500">Email</p>

                  <p className="text-white">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Gamepad2 className="text-purple-400" />

                <div>
                  <p className="text-sm text-zinc-500">Favorite Genre</p>

                  <p className="text-white">RPG</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Settings className="text-purple-400" />

                <div>
                  <p className="text-sm text-zinc-500">Member Since</p>

                  <p className="text-white">2026</p>
                </div>
              </div>
            </div>
          </div>

      

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-6 py-5">
              <h2 className="text-xl font-semibold text-white">
                Quick Actions
              </h2>
            </div>

            <div className="p-3">
              <button className="flex w-full items-center justify-between rounded-xl px-4 py-4 text-zinc-300 transition hover:bg-zinc-800">
                <div className="flex items-center gap-3">
                  <Heart className="text-red-400" />
                  Wishlist
                </div>

                <ChevronRight />
              </button>

              <button className="mt-2 flex w-full items-center justify-between rounded-xl px-4 py-4 text-zinc-300 transition hover:bg-zinc-800">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="text-green-400" />
                  Shopping Cart
                </div>

                <ChevronRight />
              </button>

              <button className="mt-2 flex w-full items-center justify-between rounded-xl px-4 py-4 text-zinc-300 transition hover:bg-zinc-800">
                <div className="flex items-center gap-3">
                  <Package className="text-blue-400" />
                  Orders
                </div>

                <ChevronRight />
              </button>

              <button className="mt-2 flex w-full items-center justify-between rounded-xl px-4 py-4 text-zinc-300 transition hover:bg-zinc-800">
                <div className="flex items-center gap-3">
                  <Settings className="text-yellow-400" />
                  Settings
                </div>

                <ChevronRight />
              </button>

              <button
                onClick={() => {
                  logedout();
                }}
                className="mt-2 flex w-full items-center justify-between rounded-xl px-4 py-4 text-red-400 transition hover:bg-red-500/10"
              >
                <div className="flex items-center gap-3">
                  <LogOut />
                  Logout
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
