import { cn } from "@/lib/utils";
import type { GameStatus } from "@/types/nimble";

const labels: Record<GameStatus, string> = {
  installed: "Installed",
  ready: "Ready",
  playing: "Playing",
  updating: "Updating",
  unavailable: "Unavailable",
};

export function StatusBadge({
  status,
  className,
}: {
  status: GameStatus;
  className?: string;
}) {
  if (status === "ready" || status === "installed") return null;

  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase",
        status === "playing" && "bg-primary text-primary-foreground",
        status === "updating" && "bg-warning/20 text-warning",
        status === "unavailable" && "bg-background/70 text-muted-foreground",
        className,
      )}
    >
      {labels[status]}
    </span>
  );
}

export function statusLabel(status: GameStatus) {
  return labels[status];
}
