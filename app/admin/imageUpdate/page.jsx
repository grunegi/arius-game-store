import { updateAllProductCoverImages } from "../../js/data-fetch";

export const dynamic = "force-dynamic";

export default async function UpdateProductImages() {
  const result = await updateAllProductCoverImages();
  
  return (
    <main className="min-h-screen bg-zinc-950 p-10 text-white">
      <h1 className="mb-6 text-3xl font-bold">
        Product Images Updated
      </h1>
      <div className="space-y-3">
        {result.map((product) => (
          <div key={product.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <p className="font-semibold">{product.name}</p>
            <p className="mt-1 text-sm text-zinc-500">{product.cover_image}</p>
          </div>
        ))}
      </div>
    </main>
  );
}