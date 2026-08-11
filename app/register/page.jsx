"use client";

import Message from "../components/Message";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import { registerUser } from "../js/login-register";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Register() {
  
  const[status, setStatus] = useState({
    type: ""
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const register = await registerUser(data);

    if (!register) {
      console.log("register failed");
      setStatus({
        type:"Failed"
      });

      return;
    }

    setStatus({
      type: "Success"
    });

    setTimeout(() => {
      setStatus({
        type: ""
      });

      redirect("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 p-10">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-zinc-400 mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-span-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-300 mb-2">
                Username
              </label>

              <input
                {...register("username")}
                type="text"
                placeholder="Enter your username"
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

              {errors.username && (
                <div className="mt-2 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                  {errors.username.message}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Email</label>

            <input
              {...register("email")}
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

            {errors.email && (
              <div className="mt-2 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                {errors.email.message}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>

            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
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

            {errors.password && (
              <div
                className="
                  mt-3
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-red-500/30
                  bg-red-500/10
                  px-4
                  py-3
                  text-red-300
                  backdrop-blur-sm"
              >
                <TriangleAlert
                  size={20}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <div>
                  <p className="font-semibold text-red-400">
                    Password Requirements
                  </p>

                  <p className="mt-1 text-sm leading-6">
                    {errors.password.message}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="flex items-start gap-2 text-sm text-zinc-400">
              <input
                {...register("terms")}
                type="checkbox"
                className="accent-white mt-1"
              />
              <span>
                I agree to the{" "}
                <button type="button" className="text-white hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-white hover:underline">
                  Privacy Policy
                </button>
              </span>
            </label>

            {errors.terms && (
              <p className="mt-2 text-sm text-red-400">
                {errors.terms.message}
              </p>
            )}
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
            Sign Up
          </button>

          {status.type === "Success" && (
            <Message
              type="success"
              title="Success"
              message="successfuly created your acount"
            />
          )}

          {status.type === "Failed" && (
            <Message
              type="error"
              title="Error"
              message="Failed to create your acount"
            />
          )}
        </form>

        <div className="mt-6 text-center text-zinc-400">
          <p>Already have an account?</p>
          <Link href="/login">
            <button className="ml-2 text-white hover:underline">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
