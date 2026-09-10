import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { GameArt } from "@/components/game-art";
import { RatingLabel, StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { formatLastPlayed } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useNimble } from "@/store/nimble-store";
import {
  STOREFRONTS,
  storefrontName,
  type StorefrontId,
} from "@/types/discover";

export const Route = createFileRoute("/_app/find/$gameId")({
  component: FindGamePage,
});

function FindGamePage() {
  const { gameId } = Route.useParams();
  const navigate = useNavigate();
  const game = useNimble((s) => s.discover.find((item) => item.id === gameId));
  const libraryGame = useNimble((s) => s.games.find((item) => item.id === gameId));
  const isPremium = useNimble((s) => s.isPremium);
  const myRating = useNimble((s) => s.myRatings[gameId] ?? 0);
  const rate = useNimble((s) => s.rateDiscoverGame);
  const recommend = useNimble((s) => s.recommendSource);
  const setPremium = useNimble((s) => s.setPremium);

  const [storefront, setStorefront] = useState<StorefrontId>("steam");
  const [body, setBody] = useState("");
  const [note, setNote] = useState<string | null>(null);

  if (!game) {
    return (
      <main className="px-8 py-16">
        <p className="text-muted-foreground">This game is not in Find yet.</p>
        <Button className="mt-6" variant="secondary" onClick={() => navigate({ to: "/find" })}>
          Back to Find
        </Button>
      </main>
    );
  }

  function submitTip() {
    try {
      recommend(gameId, { storefront, body });
      setBody("");
      setNote("Your source is now visible to other Nimble players.");
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Could not add that.");
    }
  }

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <GameArt game={game} variant="hero" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 pt-8 pb-16 md:px-8">
          <button
            type="button"
            className="focus-ring mb-8 grid size-11 place-items-center rounded-full bg-background/70"
            onClick={() => navigate({ to: "/find" })}
            aria-label="Back"
          >
            <ArrowLeft className="size-5" />
          </button>
          <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
            {game.genre} · {game.year}
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            {game.name}
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">{game.description}</p>
          <div className="mt-5">
            <RatingLabel average={game.ratingAverage} count={game.ratingCount} />
          </div>
          {game.inLibrary ? (
            <p className="mt-3 text-sm text-success">Already in your library</p>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">Not on this PC yet</p>
          )}
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-3xl space-y-16 bg-background px-4 py-12 md:px-8">
        <section>
          <h2 className="font-display text-2xl font-semibold">Where to get it</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Official PC stores only. Buy it, or play it with a subscription, then
            Nimble finds it on your gaming PC.
          </p>
          <div className="mt-5 space-y-3">
            {game.offers.map((offer) => (
              <article
                key={`${offer.storefront}-${offer.kind}`}
                className="flex items-center justify-between gap-4 rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]"
              >
                <div>
                  <p className="font-medium">{storefrontName(offer.storefront)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {offer.note ?? (offer.kind === "buy" ? "Buy for PC" : "Included with subscription")}
                  </p>
                </div>
                <p
                  className={cn(
                    "text-sm font-medium tabular-nums",
                    offer.kind === "included" && "text-success",
                    offer.kind === "sale" && "text-warning",
                  )}
                >
                  {offer.priceLabel}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Your rating</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Anyone on Nimble can rate. This helps other players decide.
          </p>
          <div className="mt-4">
            <StarRating value={myRating} onChange={(stars) => rate(gameId, stars)} />
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">Premium sources</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tips from Premium members — where they bought it, or which subscription
            includes it.
          </p>
          <div className="mt-5 space-y-3">
            {game.tips.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sources yet.</p>
            ) : (
              game.tips.map((tip) => (
                <article
                  key={tip.id}
                  className="rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]"
                >
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    {tip.author} · {storefrontName(tip.storefront)} · {formatLastPlayed(tip.createdAt)}
                  </p>
                  <p className="mt-2 text-sm">{tip.body}</p>
                </article>
              ))
            )}
          </div>

          {isPremium ? (
            <form
              className="mt-6 space-y-3 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]"
              onSubmit={(event) => {
                event.preventDefault();
                submitTip();
              }}
            >
              <p className="text-sm font-medium">Recommend a source</p>
              <div className="flex flex-wrap gap-2">
                {STOREFRONTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    data-focusable
                    onClick={() => setStorefront(item.id)}
                    className={cn(
                      "h-10 rounded-full px-3 text-sm",
                      storefront === item.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {item.short}
                  </button>
                ))}
              </div>
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={3}
                placeholder="Where did you get it? A store, a sale, or a subscription."
                className="w-full rounded-lg bg-muted px-4 py-3 text-sm shadow-[var(--shadow-border)] placeholder:text-subtle focus-ring"
              />
              <Button type="submit">Share with Nimble</Button>
              {note ? <p className="text-sm text-muted-foreground">{note}</p> : null}
            </form>
          ) : (
            <div className="mt-6 rounded-xl bg-card px-5 py-5 shadow-[var(--shadow-border)]">
              <p className="text-sm font-medium">Premium members recommend sources</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Anyone can see storefronts and rate a game. Recommending where to
                get it is a Premium perk.
              </p>
              <Button className="mt-4" onClick={() => setPremium(true)}>
                Become Premium
              </Button>
            </div>
          )}
        </section>

        {libraryGame ? (
          <Link
            to="/game/$gameId"
            params={{ gameId }}
            className="inline-flex h-12 items-center text-sm font-medium underline-offset-4 hover:underline"
          >
            Open in your library
          </Link>
        ) : null}
      </div>
    </main>
  );
}
