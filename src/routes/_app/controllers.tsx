import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bluetooth, Gamepad2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { controllerService } from "@/services/controllerService";
import { useNimble } from "@/store/nimble-store";
import type { NearbyController, PlayerSlot } from "@/types/controller";

export const Route = createFileRoute("/_app/controllers")({
  component: ControllersLayout,
});

function ControllersLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/controllers") return <Outlet />;
  return <ControllersPage />;
}

function ControllersPage() {
  const navigate = useNavigate();
  const controllers = useNimble((s) => s.controllers);
  const pairController = useNimble((s) => s.pairController);
  const [scanning, setScanning] = useState(false);
  const [nearby, setNearby] = useState<NearbyController[] | null>(null);
  const [pairingId, setPairingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const slots: PlayerSlot[] = [1, 2, 3, 4];

  async function scan() {
    setError(null);
    setScanning(true);
    setNearby(null);
    try {
      const found = await controllerService.scan();
      setNearby(found);
    } finally {
      setScanning(false);
    }
  }

  async function pair(item: NearbyController) {
    setPairingId(item.id);
    setError(null);
    try {
      const paired = await pairController(item);
      setNearby((list) => (list ?? []).filter((entry) => entry.id !== item.id));
      void navigate({
        to: "/controllers/$controllerId",
        params: { controllerId: paired.id },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not pair.");
    } finally {
      setPairingId(null);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Controllers
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Pair Xbox, PlayStation, and classic Bluetooth pads. Nimble reads them here
        and sends a standard gamepad to your PC.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {slots.map((slot) => {
          const pad = controllers.find((item) => item.playerSlot === slot);
          return (
            <button
              key={slot}
              type="button"
              data-focusable
              onClick={() => {
                if (pad) {
                  void navigate({
                    to: "/controllers/$controllerId",
                    params: { controllerId: pad.id },
                  });
                } else {
                  void scan();
                }
              }}
              className="rounded-xl bg-card px-4 py-5 text-left shadow-[var(--shadow-border)]"
            >
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Player {slot}
              </p>
              <p className="mt-2 truncate text-sm font-medium">
                {pad ? pad.name : "Empty"}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-3">
        {controllers.map((pad) => (
          <button
            key={pad.id}
            type="button"
            data-focusable
            onClick={() =>
              void navigate({
                to: "/controllers/$controllerId",
                params: { controllerId: pad.id },
              })
            }
            className="flex w-full items-start gap-4 rounded-xl bg-card p-5 text-left shadow-[var(--shadow-border)]"
          >
            <div className="grid size-12 place-items-center rounded-lg bg-muted">
              <Gamepad2 className="size-6 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl font-semibold">{pad.name}</h2>
                {pad.playerSlot ? (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
                    P{pad.playerSlot}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {controllerService.familyName(pad.family)} ·{" "}
                {controllerService.bluetoothLabel(pad.bluetoothMode)}
              </p>
              <p className="mt-2 text-sm">
                {pad.status === "forwarding" ? (
                  <span className="text-success">Sending to your PC</span>
                ) : (
                  <span className="text-success">Connected</span>
                )}
                <span className="text-subtle"> · Battery {pad.batteryLabel}</span>
              </p>
            </div>
          </button>
        ))}
      </div>

      <Button className="mt-8" onClick={() => void scan()} disabled={scanning}>
        <Plus className="size-4" />
        {scanning ? "Looking for controllers…" : "Add a controller"}
      </Button>

      {scanning ? (
        <div className="mt-10 flex flex-col items-center text-center">
          <div className="relative mb-6 grid size-24 place-items-center">
            <span className="pulse-ring absolute inset-0 rounded-full border border-primary/50" />
            <Bluetooth className="size-6 text-primary" />
          </div>
          <p className="font-display text-xl">Hold the pair button</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Xbox, PlayStation, and Bluetooth 2.0 / 3.0 pads all work.
          </p>
        </div>
      ) : null}

      {nearby && !scanning ? (
        <div className="mt-8 space-y-3">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Nearby
          </p>
          {nearby.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No new controllers found. Put a pad in pairing mode and try again.
            </p>
          ) : (
            nearby.map((item) => (
              <article
                key={item.id}
                className="flex items-center gap-4 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]"
              >
                <Gamepad2 className="size-6 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.hint}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => void pair(item)}
                  disabled={pairingId === item.id}
                >
                  {pairingId === item.id ? "Pairing…" : "Pair"}
                </Button>
              </article>
            ))
          )}
        </div>
      ) : null}

      {error ? <p className="mt-4 text-sm text-warning">{error}</p> : null}
    </main>
  );
}
