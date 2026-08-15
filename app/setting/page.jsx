"use client";

import { useState } from "react";
import {
  KeyRound,
  Bell,
  ShieldCheck,
  AlertTriangle,
  Download,
  Trash2,
} from "lucide-react";

const card = "rounded-2xl border border-zinc-800 bg-zinc-900 p-6";
const input = "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-600 outline-none transition focus:border-purple-500";

function SectionTitle({ icon, color, title }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>
  );
}

export default function Settings() {
  const [prefs, setPrefs] = useState({
    discounts: true,
    orders: true,
    news: false,
  });

  const flip = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const prefItems = [
    { key: "discounts", title: "Email Discounts" },
    { key: "orders", title: "Order Updates" },
    { key: "news", title: "Newsletter" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <section className={card}>
          <SectionTitle
            icon={<KeyRound className="h-4 w-4 text-purple-400" />}
            color="bg-purple-500/20"
            title="Change Password"
          />

          <div className="space-y-3">
            <input type="password" className={input} placeholder="Current password" />
            <input type="password" className={input} placeholder="New password" />
            <input type="password" className={input} placeholder="Confirm new password" />
          </div>

          <button className="mt-4 w-full rounded-xl bg-purple-600 py-3 font-medium transition hover:bg-purple-500">
            Update Password
          </button>
        </section>

        <section className={card}>
          <SectionTitle
            icon={<Bell className="h-4 w-4 text-purple-400" />}
            color="bg-purple-500/20"
            title="Preferences"
          />

          <div>
            {prefItems.map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between border-b border-zinc-800 py-3 last:border-0 last:pb-0"
              >
                <span>{item.title}</span>
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-purple-600"
                  checked={prefs[item.key]}
                  onChange={() => flip(item.key)}
                />
              </label>
            ))}
          </div>
        </section>

        <section className={card}>
          <SectionTitle
            icon={<ShieldCheck className="h-4 w-4 text-green-400" />}
            color="bg-green-500/20"
            title="Privacy"
          />

          <button className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 font-medium transition hover:bg-zinc-800">
            <Download className="h-5 w-5" />
            Download My Data
          </button>
        </section>

        <section className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
          <SectionTitle
            icon={<AlertTriangle className="h-4 w-4 text-red-400" />}
            color="bg-red-500/20"
            title="Danger Zone"
          />

          <button className="flex items-center gap-2 rounded-xl border border-red-500/40 px-5 py-3 font-medium text-red-400 transition hover:bg-red-500/10">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}