import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { GameArt } from "@/components/game-art";
import { RatingLabel } from "@/components/star-rating";
import { cn } from "@/lib/utils";
import { discoverService } from "@/services/discoverService";
import { useNimble } from "@/store/nimble-store";
import { STOREFRONTS, type StorefrontId } from "@/types/discover";

export const Route = createFileRoute("/_app/find")({ component: FindLayout });

function FindLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/find") return <Outlet />;
  return <FindPage />;
}

const FILTERS: { id: StorefrontId | "all"; label: string }[] = [
  { id: "all", label: "All stores" },
  ...STOREFRONTS.map((store) => ({ id: store.id, label: store.short })),
];

function FindPage() {
  const navigate = useNavigate();
  const catalog = useNimble((s) => s.discover);
  const [query, setQuery] = useState("");
  const [store, setStore] = useState<StorefrontId | "all">("all");

  const results = useMemo(
    () => discoverService.search(query, store),
    [query, store, catalog],
  );

  return (
    <main className="mx-auto max-w-[1600px] px-4 py-8 md:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Find</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        See where Nimble players get a game — Steam, Xbox, Epic, and every other
        store that runs on a PC. Rate it. Premium members can recommend a source.
      </p>

      <label className="relative mt-8 block max-w-2xl">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          data-focusable
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Where can I get this game?"
          className="h-14 w-full rounded-xl bg-card pr-4 pl-12 text-base shadow-[var(--shadow-border)] placeholder:text-subtle focus-ring"
        />
      </label>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            data-focusable
            onClick={() => setStore(filter.id)}
            className={cn(
              "h-10 shrink-0 rounded-full px-4 text-sm",
              store === filter.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((game) => (
          <button
            key={game.id}
            type="button"
            data-focusable
            onClick={() =>
              navigate({ to: "/find/$gameId", params: { gameId: game.id } })
            }
            className="flex gap-4 rounded-xl bg-card p-3 text-left shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover)]"
          >
            <div className="relative aspect-poster w-20 shrink-0 overflow-hidden rounded-md">
              <GameArt game={game} className="absolute inset-0" />
            </div>
            <div className="min-w-0 flex-1 py-1">
              <h2 className="font-display truncate text-lg font-semibold">
                {game.name}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {game.genre} · {game.year}
                {game.inLibrary ? " · In your library" : ""}
              </p>
              <div className="mt-2">
                <RatingLabel average={game.ratingAverage} count={game.ratingCount} />
              </div>
              <p className="mt-3 truncate text-sm text-muted-foreground">
                {game.offers
                  .map((offer) => {
                    const name =
                      STOREFRONTS.find((item) => item.id === offer.storefront)?.short ??
                      offer.storefront;
                    return `${name} ${offer.priceLabel}`;
                  })
                  .join("  ·  ")}
              </p>
            </div>
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No games match that search.
        </p>
      ) : null}
    </main>
  );
}
