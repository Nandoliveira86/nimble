import { createFileRoute, Link } from "@tanstack/react-router";
import { Monitor, Smartphone, Tablet, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNimble } from "@/store/nimble-store";
import type { Device } from "@/types/nimble";

export const Route = createFileRoute("/_app/devices")({ component: DevicesPage });

function DeviceIcon({ kind }: { kind: Device["kind"] }) {
  const className = "size-6 text-muted-foreground";
  if (kind === "tv") return <Tv className={className} />;
  if (kind === "handheld" || kind === "tablet") return <Tablet className={className} />;
  if (kind === "notebook") return <Smartphone className={className} />;
  return <Monitor className={className} />;
}

function DevicesPage() {
  const devices = useNimble((s) => s.devices);
  const sleepHost = useNimble((s) => s.sleepHost);
  const wakeHost = useNimble((s) => s.wakeHost);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Devices</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your games play from the PC. Controllers stay on this screen and are sent to the PC while you play.
      </p>
      <div className="mt-8 space-y-4">
        {devices.map((device) => (
          <article
            key={device.id}
            className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]"
          >
            <div className="flex items-start gap-4">
              <div className="grid size-12 place-items-center rounded-lg bg-muted">
                <DeviceIcon kind={device.kind} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl font-semibold">{device.name}</h2>
                  {device.isThisDevice ? (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
                      This device
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {device.isHost ? "Gaming PC" : device.kind === "tv" ? "Television" : "Device"}
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Status</dt>
                    <dd className={cn(device.status === "online" ? "text-success" : "text-subtle")}>
                      {device.status === "online" ? "Online" : "Offline"}
                    </dd>
                  </div>
                  {device.readyLabel ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Ready</dt>
                      <dd>{device.readyLabel}</dd>
                    </div>
                  ) : null}
                  {device.connectionQuality ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Connection</dt>
                      <dd className="capitalize">{device.connectionQuality}</dd>
                    </div>
                  ) : null}
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Last seen</dt>
                    <dd>{device.lastSeenLabel}</dd>
                  </div>
                </dl>
                {device.isHost ? (
                  <div className="mt-5">
                    {device.status === "online" ? (
                      <Button variant="secondary" size="sm" onClick={sleepHost}>
                        Rest mode
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => void wakeHost()}>
                        Wake PC
                      </Button>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
      <Link
        to="/controllers"
        className="mt-8 inline-flex h-11 items-center text-sm font-medium underline-offset-4 hover:underline"
      >
        Manage Bluetooth controllers
      </Link>
    </main>
  );
}
