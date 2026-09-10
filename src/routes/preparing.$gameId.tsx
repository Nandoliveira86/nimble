import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { GameArt } from "@/components/game-art";
import { cn } from "@/lib/utils";
import { useNimble } from "@/store/nimble-store";

export const Route = createFileRoute("/preparing/$gameId")({
  component: PreparingPage,
});

const STEPS = [
  "Connecting to your PC",
  "Creating secure game session",
  "Checking controller",
  "Optimizing connection",
  "Launching game",
];

function PreparingPage() {
  const { gameId } = Route.useParams();
  const navigate = useNavigate();
  const game = useNimble((s) => s.games.find((item) => item.id === gameId));
  const hostOnline = useNimble((s) => s.hostOnline);
  const [step, setStep] = useState(0);
  const [blocked, setBlocked] = useState(!hostOnline);

  useEffect(() => {
    if (!gameId || blocked) return;
    const existing = useNimble.getState().session;
    const target = useNimble.getState().games.find((item) => item.id === gameId);
    if (!target) return;

    try {
      if (!existing || existing.gameId !== gameId) {
        useNimble.getState().startSession(gameId);
      }
    } catch {
      setBlocked(true);
      return;
    }

    useNimble.getState().setSessionStatus("connecting");
    let current = 0;
    let cancelled = false;
    const timer = window.setInterval(() => {
      if (cancelled) return;
      current += 1;
      setStep(current);
      if (current === 2) useNimble.getState().setSessionStatus("preparing");
      if (current === 4) useNimble.getState().setSessionStatus("launching");
      if (current >= STEPS.length) {
        window.clearInterval(timer);
        useNimble.getState().setSessionStatus("running");
        void navigate({ to: "/session" });
      }
    }, 650);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [blocked, gameId, navigate]);

  if (!game) return <Navigate to="/home" />;
  if (blocked) return <Navigate to="/game/$gameId" params={{ gameId }} />;

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background">
      <GameArt game={game} variant="hero" className="absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative w-full max-w-md px-6">
        <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
          {game.name}
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight">
          Preparing your game
        </h1>
        <ul className="mt-10 space-y-4">
          {STEPS.map((label, index) => {
            const done = index < step;
            const active = index === step;
            return (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full",
                    done && "bg-primary text-primary-foreground",
                    active && "shadow-[var(--shadow-focus)]",
                    !done && !active && "bg-muted",
                  )}
                >
                  {done ? <Check className="size-3.5" /> : null}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    done || active ? "text-foreground" : "text-subtle",
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
