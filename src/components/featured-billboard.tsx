import { useNavigate } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { GameArt } from "@/components/game-art";
import { Button } from "@/components/ui/button";
import { formatHoursPlayed, formatLastPlayed } from "@/lib/utils";
import type { Game } from "@/types/nimble";

interface FeaturedBillboardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export function FeaturedBillboard({ game, onPlay }: FeaturedBillboardProps) {
  const navigate = useNavigate();
  const continuePlay = Boolean(game.lastPlayed);

  return (
    <section className="relative min-h-96 overflow-hidden rounded-xl shadow-[var(--shadow-elevated)] md:min-h-[32rem]">
      <button
        type="button"
        className="absolute inset-0"
        onClick={() =>
          navigate({ to: "/game/$gameId", params: { gameId: game.id } })
        }
        aria-label={`${game.name} details`}
      >
        <GameArt game={game} variant="hero" className="absolute inset-0" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-background/10" />
      </button>
      <div className="relative z-10 flex min-h-96 flex-col justify-end p-6 md:min-h-[32rem] md:p-10">
        <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
          Continue playing
        </p>
        <h1 className="font-display mt-2 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          {game.name}
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          {game.description}
        </p>
        <p className="mt-3 text-xs text-subtle">
          {formatHoursPlayed(game.hoursPlayed)} · {formatLastPlayed(game.lastPlayed)}
        </p>
        <div className="relative z-10 mt-6 flex flex-wrap gap-3">
          <Button size="lg" onClick={() => onPlay(game)}>
            <Play className="size-4 translate-x-px" fill="currentColor" />
            {continuePlay ? "Continue" : "Play"}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() =>
              navigate({ to: "/game/$gameId", params: { gameId: game.id } })
            }
          >
            Details
          </Button>
        </div>
      </div>
    </section>
  );
}
