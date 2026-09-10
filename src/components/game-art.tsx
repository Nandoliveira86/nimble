import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Game } from "@/types/nimble";

type ArtSource = Pick<Game, "cover" | "heroImage" | "artClass">;

interface GameArtProps {
  game: ArtSource;
  variant?: "cover" | "hero";
  kenBurns?: boolean;
  className?: string;
}

export function GameArt({
  game,
  variant = "cover",
  kenBurns = false,
  className,
}: GameArtProps) {
  const src = variant === "hero" ? game.heroImage : game.cover;
  const [failed, setFailed] = useState(!src);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-card",
        game.artClass,
        className,
      )}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          className={cn(
            "absolute inset-0 size-full object-cover",
            variant === "hero" ? "object-top" : "object-center",
            kenBurns && "animate-kenburns origin-center",
          )}
          onError={() => setFailed(true)}
        />
      ) : null}
      <div className="film-grain absolute inset-0" />
    </div>
  );
}
