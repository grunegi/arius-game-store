"use client";

import { loginCheck } from "../js/login-register";
import useAuthStore from "../js/AuthStore";
import Message from "../components/Message";

import Link from "next/link";
import { useState } from "react";

export default function LoginRegister() {
  const [timer, setTimer] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginCheck(email, pass);

      if (!res) {
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 5000);
        return;
      }

      login(res);
      setError(false);
      setPass("");
      setEmail("");

      setTimer(true);

      setTimeout(() => {
        setTimer(false);
      }, 5000);
    } catch (err) {
      console.error("HANDLE LOGIN ERROR:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">Sign in to continue</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                placeholder:text-zinc-500
                focus:outline-none
                focus:border-white
                transition
              "
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              value={pass}
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                placeholder:text-zinc-500
                focus:outline-none
                focus:border-white
                transition
              "
            />
          </div>

          {error && (
            <Message
              type="error"
              title="Error"
              message="There is no account with this email adress"
            />
          )}

          {timer && (
            <Message
              type="success"
              title="Success"
              message="Successfuly Logged"
            />
          )}

          <div className="flex items-center justify-between text-sm">
            <Link href="/forgotPassword">
              <button
                type="button"
                className="text-zinc-300 hover:text-white transition"
              >
                Forgot password?
              </button>
            </Link>
          </div>
          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              bg-white
              text-black
              font-semibold
              hover:opacity-90
              transition
            "
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-zinc-400">
          <p>Don&apos;t have an account?</p>
          <Link href="/register">
            <button className="ml-2 text-white hover:underline">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
