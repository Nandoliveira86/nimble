import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNimble } from "@/store/nimble-store";

interface OfflineModalProps {
  onClose: () => void;
  onReady?: () => void;
}

export function OfflineModal({ onClose, onReady }: OfflineModalProps) {
  const wakeHost = useNimble((s) => s.wakeHost);
  const hostOnline = useNimble((s) => s.hostOnline);
  const [waking, setWaking] = useState(false);

  async function handleWake() {
    setWaking(true);
    await wakeHost();
    setWaking(false);
    onReady?.();
  }

  function handleRetry() {
    if (hostOnline) onReady?.();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/75 p-6">
      <div
        role="dialog"
        aria-labelledby="offline-title"
        className="w-full max-w-md rounded-xl bg-popover p-8 shadow-[var(--shadow-border)]"
      >
        <h2 id="offline-title" className="font-display text-2xl font-semibold">
          Your gaming PC is offline.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Wake it to start a game session, or try again if it just came back.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={handleRetry}
            disabled={waking}
          >
            Try again
          </Button>
          <Button className="flex-1" onClick={() => void handleWake()} disabled={waking}>
            {waking ? "Waking PC…" : "Wake PC"}
          </Button>
          <Button variant="ghost" className="flex-1" onClick={onClose} disabled={waking}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
