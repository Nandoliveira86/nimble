import { GameCard } from "@/components/game-card";
import type { Game } from "@/types/nimble";

interface GameRowProps {
  title: string;
  games: Game[];
  rowId: string;
}

export function GameRow({ title, games, rowId }: GameRowProps) {
  if (games.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="px-0.5 text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {games.map((game) => (
          <GameCard key={game.id} game={game} rowId={rowId} />
        ))}
      </div>
    </section>
  );
}
