import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "cvexighpuikchnnxammq.supabase.co", // ✅ فقط نام دامنه (بدون https://)
      },
    ],
  },
};

export default nextConfig;