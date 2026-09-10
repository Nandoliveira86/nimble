import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/game-card";
import { cn } from "@/lib/utils";
import { gameService } from "@/services/gameService";
import { useNimble } from "@/store/nimble-store";

export const Route = createFileRoute("/_app/library")({ component: LibraryPage });

const FILTERS = [
  { id: "all", label: "All" },
  { id: "installed", label: "Installed" },
  { id: "favorites", label: "Favorites" },
  { id: "recent", label: "Recent" },
] as const;

export function LibraryPage() {
  const games = useNimble((s) => s.games);
  const sections = gameService.sections(games);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const list = useMemo(() => {
    if (filter === "installed") return sections.installed;
    if (filter === "favorites") return sections.favorites;
    if (filter === "recent") return sections.recentlyPlayed;
    return sections.library;
  }, [filter, sections]);

  return (
    <main className="mx-auto max-w-[1600px] px-4 py-8 md:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Library</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            data-focusable
            onClick={() => setFilter(item.id)}
            className={cn(
              "h-10 rounded-full px-4 text-sm font-medium",
              filter === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
        {list.map((game) => (
          <GameCard key={game.id} game={game} layout="grid" rowId="0" />
        ))}
      </div>
      {list.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">Nothing here yet.</p>
      ) : null}
    </main>
  );
}
