/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
            },
            boxShadow: {
                glow: "0 0 30px rgba(34, 211, 238, 0.25)",
            },
            backgroundImage: {
                "radial-glow":
                    "radial-gradient(circle at top, rgba(34,211,238,0.15), transparent 60%)",
            },
        },
    },
    plugins: [],
};