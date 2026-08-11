import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import OnlineWraper from "@/app/components/ErrorHandle/OnlineWraper";

import "@/app/css/global.css";

export const metadata = {
  title: "Arius",
  description: "This is a gaming shop",
  keywords: ["gaming", "shop", "game", "headphones"],

  openGraph: {
    title: "Arius",
    description: "Best gaming shop in our city",
    url: "https://arius.com",
    siteName: "Arius",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arius Gaming Shop",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arius",
    description: "The best gaming site",
    images: ["https://example.com/twitter-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Arius",
    url: "https://arius.com",
    logo: "https://arius.com/logo.png",
    description: "This is a gaming shop",
  };

  return (
    <html className="bg-zinc-950">
      <body>
        <OnlineWraper>
          <Navbar />
          {children}
          <Footer />
        </OnlineWraper>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </body>
    </html>
  );
}
