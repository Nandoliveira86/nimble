import { useEffect } from "react";
import { NimbleLogo } from "@/components/logo";
import { useNimble } from "@/store/nimble-store";

export function NimbleProvider({ children }: { children: React.ReactNode }) {
  const hydrated = useNimble((s) => s.hydrated);

  useEffect(() => {
    try {
      useNimble.persist.rehydrate();
    } finally {
      useNimble.getState().markHydrated();
    }
  }, []);

  if (!hydrated) {
    return (
      <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-background">
        <div className="ambient-glow pointer-events-none absolute -top-24 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-primary/18 blur-3xl" />
        <NimbleLogo variant="hero" className="max-w-md px-8" />
      </div>
    );
  }

  return children;
}
