import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FeaturedBillboard } from "@/components/featured-billboard";
import { GameRow } from "@/components/game-row";
import { OfflineModal } from "@/components/offline-modal";
import { checkPlay } from "@/components/play-flow";
import { gameService } from "@/services/gameService";
import { useNimble } from "@/store/nimble-store";
import type { Game } from "@/types/nimble";

export const Route = createFileRoute("/_app/home")({ component: HomePage });

function HomePage() {
  const navigate = useNavigate();
  const games = useNimble((s) => s.games);
  const sections = gameService.sections(games);
  const featured = sections.continuePlaying[0] ?? sections.recommended[0];
  const [offline, setOffline] = useState(false);
  const [pending, setPending] = useState<Game | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function play(game: Game) {
    const block = checkPlay(game);
    if (block?.type === "offline") {
      setPending(game);
      setOffline(true);
      return;
    }
    if (block?.type === "unavailable") {
      setNotice(block.message);
      return;
    }
    void navigate({ to: "/preparing/$gameId", params: { gameId: game.id } });
  }

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-10 px-4 py-6 md:px-8">
      {featured ? (
        <FeaturedBillboard game={featured} onPlay={play} />
      ) : null}

      {notice ? (
        <p className="text-sm text-muted-foreground">{notice}</p>
      ) : null}

      <GameRow title="Continue Playing" games={sections.continuePlaying} rowId="0" />
      <GameRow title="Recently Played" games={sections.recentlyPlayed} rowId="1" />
      <GameRow title="Favorites" games={sections.favorites} rowId="2" />
      <GameRow title="Installed on your PC" games={sections.installed} rowId="3" />
      <GameRow title="Recommended" games={sections.recommended} rowId="4" />
      <GameRow title="Your Library" games={sections.library} rowId="5" />

      {offline ? (
        <OfflineModal
          onClose={() => {
            setOffline(false);
            setPending(null);
          }}
          onReady={() => {
            const game = pending;
            setOffline(false);
            setPending(null);
            if (game) {
              void navigate({
                to: "/preparing/$gameId",
                params: { gameId: game.id },
              });
            }
          }}
        />
      ) : null}
    </main>
  );
}
