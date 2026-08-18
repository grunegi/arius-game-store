import { updateAllGameCoverImages } from "../../js/data-fetch";

export default async function UpdateGameImages() {
  const result = await updateAllGameCoverImages();

  return (
    <main className="min-h-screen bg-zinc-950 p-10 text-white">
      <h1 className="mb-6 text-3xl font-bold">
        Game Images Updated
      </h1>

      <div className="space-y-3">
        {result.map((game) => (
          <div
            key={game.id}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
          >
            <p className="font-semibold">{game.name}</p>

            <p className="mt-1 text-sm text-zinc-500">
              {game.cover_image}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}