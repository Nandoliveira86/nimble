import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NimbleLogo } from "@/components/logo";
import { useNimble } from "@/store/nimble-store";

export const Route = createFileRoute("/connect")({ component: ConnectPage });

function ConnectPage() {
  const navigate = useNavigate();
  const isAuthenticated = useNimble((s) => s.isAuthenticated);
  const hasPairedHost = useNimble((s) => s.hasPairedHost);
  const completePairing = useNimble((s) => s.completePairing);
  const host = useNimble((s) => s.devices.find((d) => d.isHost));
  const [found, setFound] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setFound(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!isAuthenticated) return <Navigate to="/" />;
  if (hasPairedHost) return <Navigate to="/home" />;

  return (
    <main className="flex min-h-dvh flex-col bg-background px-6 py-10">
      <NimbleLogo variant="lockup" size="sm" />
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center text-center">
        {!found ? (
          <div className="stagger-in flex flex-col items-center">
            <div className="relative mb-10 grid size-28 place-items-center">
              <span className="pulse-ring absolute inset-0 rounded-full border border-primary/50" />
              <span
                className="pulse-ring absolute inset-0 rounded-full border border-accent/40"
                style={{ animationDelay: "0.7s" }}
              />
              <span className="size-3 rounded-full bg-primary shadow-[var(--shadow-glow)]" />
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Finding your gaming PC
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              This only takes a moment.
            </p>
          </div>
        ) : (
          <div className="stagger-in w-full">
            <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
              Found
            </p>
            <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              {host?.name.toUpperCase() ?? "BRUNO'S GAMING PC"}
            </h1>
            <div className="mt-8 rounded-xl bg-card px-6 py-5 text-left shadow-[var(--shadow-border)]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm text-success">Online</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hardware</span>
                <span className="text-sm">{host?.friendlyHardware ?? "RTX 4070"}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ready</span>
                <span className="text-sm">{host?.readyLabel ?? "Ready to play"}</span>
              </div>
            </div>
            <Button
              size="lg"
              className="mt-10 w-full"
              onClick={() => {
                completePairing();
                void navigate({ to: "/home" });
              }}
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
