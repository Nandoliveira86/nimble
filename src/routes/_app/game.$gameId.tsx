import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Heart, Play } from "lucide-react";
import { useState } from "react";
import { GameArt } from "@/components/game-art";
import { OfflineModal } from "@/components/offline-modal";
import { checkPlay } from "@/components/play-flow";
import { Button } from "@/components/ui/button";
import { formatHoursPlayed, formatLastPlayed } from "@/lib/utils";
import { statusLabel } from "@/components/status-badge";
import { useNimble } from "@/store/nimble-store";

export const Route = createFileRoute("/_app/game/$gameId")({
  component: GameDetailsPage,
});

function GameDetailsPage() {
  const { gameId } = Route.useParams();
  const navigate = useNavigate();
  const game = useNimble((s) => s.games.find((item) => item.id === gameId));
  const toggleFavorite = useNimble((s) => s.toggleFavorite);
  const [offline, setOffline] = useState(false);
  const [manage, setManage] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (!game) {
    return (
      <main className="px-8 py-16">
        <p className="text-muted-foreground">This game is not in your library.</p>
        <Button className="mt-6" variant="secondary" onClick={() => navigate({ to: "/library" })}>
          Back to library
        </Button>
      </main>
    );
  }

  function play() {
    if (!game) return;
    const block = checkPlay(game);
    if (block?.type === "offline") {
      setOffline(true);
      return;
    }
    if (block?.type === "unavailable") {
      setNotice(block.message);
      return;
    }
    void navigate({ to: "/preparing/$gameId", params: { gameId: game.id } });
  }

  const primary = game.lastPlayed ? "Continue" : "Play";

  return (
    <main className="relative min-h-[calc(100dvh-4rem)]">
      <div className="absolute inset-0">
        <GameArt game={game} variant="hero" className="absolute inset-0" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-background/25" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1600px] flex-col justify-end px-4 py-10 md:px-8 md:py-16">
        <button
          type="button"
          className="focus-ring absolute top-6 left-4 grid size-11 place-items-center rounded-full bg-background/50 md:left-8"
          onClick={() => navigate({ to: "/home" })}
          aria-label="Back"
        >
          <ArrowLeft className="size-5" />
        </button>
        <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
          {game.genre} · {game.year} · {game.platform}
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          {game.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {game.description}
        </p>
        <p className="mt-4 text-sm text-subtle">
          {formatHoursPlayed(game.hoursPlayed)} · Last session {formatLastPlayed(game.lastPlayed).toLowerCase()} · {statusLabel(game.status)}
        </p>
        {notice ? <p className="mt-3 text-sm text-warning">{notice}</p> : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={play}
            disabled={game.status === "updating" || game.status === "unavailable"}
          >
            <Play className="size-4 translate-x-px" fill="currentColor" />
            {game.status === "updating"
              ? "Updating"
              : game.status === "unavailable"
                ? "Not installed"
                : primary}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => toggleFavorite(game.id)}
          >
            <Heart
              className="size-4"
              fill={game.favorite ? "currentColor" : "none"}
            />
            Favorite
          </Button>
          <Button size="lg" variant="ghost" onClick={() => setManage((open) => !open)}>
            Manage
          </Button>
        </div>
        {manage ? (
          <div className="mt-6 max-w-md rounded-xl bg-card/90 p-5 shadow-[var(--shadow-border)] backdrop-blur-sm">
            <p className="text-sm font-medium">On Bruno's Gaming PC</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {game.installed ? `${game.installSize} installed` : "Not installed"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{statusLabel(game.status)}</p>
          </div>
        ) : null}
      </div>
      {offline ? (
        <OfflineModal
          onClose={() => setOffline(false)}
          onReady={() => {
            setOffline(false);
            void navigate({ to: "/preparing/$gameId", params: { gameId: game.id } });
          }}
        />
      ) : null}
    </main>
  );
}
