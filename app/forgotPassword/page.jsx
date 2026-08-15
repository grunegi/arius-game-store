"use client";

import { emailCheck } from "../js/login-register";
import Message from "../components/Message";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    type: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();

    const data = await emailCheck(email);

    if (data.length === 0) {
      console.log("not a valid email");

      setStatus({
        type: "Fail",
      });

      setTimeout(() => {
        setStatus({
          type: "",
        });
      }, 5000);

      return;
    }

    setStatus({
      type: "Success",
    });

    setTimeout(() => {
      setStatus({
        type: "",
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Forgot Password ?</h1>
          <p className="text-zinc-400 mt-2">
            Enter your email and we&apos;ll send you a link to reset your
            password
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleClick}>
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Email</label>

            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Enter your email"
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

          {status.type === "Success" && (
            <Message
              type="success"
              title="Success"
              message="We found an account associated with this email"
            />
          )}

          {status.type === "Fail" && (
            <Message
              type="error"
              title="Error"
              message="There is no account associated with this email"
            />
          )}

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
            Check your email
          </button>
        </form>

        <div className="mt-6 text-center text-zinc-400">
          <Link href="/login">
            <button className="text-white hover:underline">
              Back to Sign In
            </button>
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/10 px-5 py-4">
          <h3 className="font-semibold text-blue-400">Feature in Progress</h3>

          <p className="mt-2 text-sm text-zinc-300">
            We&apos;re working on this feature. It will be available in an
            upcoming release.
          </p>
        </div>
      </div>
    </div>
  );
}
