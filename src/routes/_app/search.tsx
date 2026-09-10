import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/game-card";
import { gameService } from "@/services/gameService";
import { useNimble } from "@/store/nimble-store";

export const Route = createFileRoute("/_app/search")({ component: SearchPage });

function SearchPage() {
  const games = useNimble((s) => s.games);
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => gameService.search(query, games),
    [query, games],
  );

  return (
    <main className="mx-auto max-w-[1600px] px-4 py-8 md:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Search</h1>
      <label className="relative mt-8 block">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          data-focusable
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a game"
          className="h-14 w-full rounded-xl bg-card pr-4 pl-12 text-base shadow-[var(--shadow-border)] placeholder:text-subtle focus-ring"
        />
      </label>
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
        {results.map((game) => (
          <GameCard key={game.id} game={game} layout="grid" rowId="0" />
        ))}
      </div>
      {query && results.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No games in your library match “{query}”.{" "}
          <Link to="/find" className="text-foreground underline-offset-4 hover:underline">
            Search where to get it
          </Link>
        </p>
      ) : null}
    </main>
  );
}
