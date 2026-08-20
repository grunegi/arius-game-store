import { category } from "../../js/data-fetch";
import { CategoryError } from "../../components/ErrorHandle/CategoryError";
import ErrorDisplay from "../../components/ErrorHandle/ErrorDisplay";
import WishlistButton from "../../components/WishlistButton";

import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!slug) {
    return (
      <ErrorDisplay type="500" showRetryButton={true} onRetry={() => reset()} />
    );
  }

  const cat = await category(slug);

  if (!cat || cat.length === 0) {
    return (
      <ErrorDisplay type="404" showRetryButton={true} onRetry={() => reset()} />
    );
  }

  const catName = cat[0].name;
  const catLenth = cat.lenth;
  const catImage = cat.find((f) => f.cover_image)?.cover_image;

  return {
    title: `${catName} Games | YourSiteName`,
    description: `Explore ${catLenth} ${catName} games. Browse, rate, and discover your next favorite ${catName.toLowerCase()} game.`,
    openGraph: {
      title: `${catName} Games`,
      description: `Browse ${catLenth} ${catName} games available now.`,
      images: catImage ? [{ url: catImage }] : [],
    },

    twitter: {
      card: "summary_large_image",
      title: `${catName} Games`,
      description: `Browse ${catLenth} ${catName} games available now.`,
      images: catImage ? [catImage] : [],
    },
  };
}

export default async function Category({ params }) {
  const { slug } = await params;
  const cat = await category(slug);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-5">
      {cat ? (
        <>
          {cat.map((c) => (
            <div key={c.id}>
              <div className="relative group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-700 transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-3/4 overflow-hidden">
                  <Image
                    src={c.cover_image}
                    alt={c.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* ستون چپ: rating بالا + genre پایین */}
                  <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 text-yellow-400 text-sm font-medium backdrop-blur-sm">
                      ⭐ {c.rating}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                      {c.genre}
                    </span>
                  </div>

                  {/* قلب ویش‌لیست سمت راست */}
                  <div className="absolute top-3 right-3">
                    <WishlistButton itemId={c.id} itemType="game" />
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-white truncate">
                    {c.name}
                  </h2>

                  <p className="mt-2 text-zinc-400 text-sm">{c.category}</p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">
                      ${c.price}
                    </span>

                    <Link href={`/gameDetail/${c.slug}`}>
                      <button className="px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-600 text-white font-medium transition">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="col-span-full flex items-center justify-center -mb-7.5">
          <CategoryError />
        </div>
      )}
    </div>
  );
}
