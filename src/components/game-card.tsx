import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { GameArt } from "@/components/game-art";
import { StatusBadge } from "@/components/status-badge";
import type { Game } from "@/types/nimble";

interface GameCardProps {
  game: Game;
  layout?: "shelf" | "grid";
  rowId?: string;
}

export function GameCard({ game, layout = "shelf", rowId }: GameCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      data-focusable
      data-row={rowId}
      onClick={() =>
        navigate({ to: "/game/$gameId", params: { gameId: game.id } })
      }
      onKeyDown={(event) => {
        const current = event.currentTarget;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          (current.nextElementSibling as HTMLElement | null)?.focus();
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          (current.previousElementSibling as HTMLElement | null)?.focus();
        }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          const dir = event.key === "ArrowDown" ? 1 : -1;
          const row = Number(current.dataset.row);
          if (Number.isNaN(row)) return;
          event.preventDefault();
          const next = document.querySelector<HTMLElement>(
            `[data-focusable][data-row="${row + dir}"]`,
          );
          next?.focus();
        }
      }}
      className={cn(
        "group flex shrink-0 snap-start flex-col text-left",
        layout === "shelf" ? "w-game-card" : "w-full",
      )}
    >
      <div
        className={cn(
          "relative aspect-poster overflow-hidden rounded-lg shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
          "group-hover:scale-[1.03] group-hover:shadow-[var(--shadow-border-hover)]",
          "group-focus:scale-[1.03] group-focus:shadow-[var(--shadow-focus)]",
        )}
      >
        <GameArt game={game} className="absolute inset-0" />
        <div className="absolute top-2 right-2">
          <StatusBadge status={game.status} />
        </div>
      </div>
      <div className="mt-2.5 px-0.5">
        <div className="truncate text-sm font-medium text-foreground">
          {game.name}
        </div>
      </div>
    </button>
  );
}
