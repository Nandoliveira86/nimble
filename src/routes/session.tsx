import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ControllerConfigure } from "@/components/controller-configure";
import { GameArt } from "@/components/game-art";
import { Button } from "@/components/ui/button";
import { useControllerForwarding } from "@/hooks/use-controller-forwarding";
import { formatSessionClock } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { controllerService } from "@/services/controllerService";
import { useNimble } from "@/store/nimble-store";

export const Route = createFileRoute("/session")({ component: SessionPage });

type OverlayView =
  | "menu"
  | "quality"
  | "controller"
  | "controller-setup"
  | "info"
  | "advanced"
  | "confirm";

function SessionPage() {
  const navigate = useNavigate();
  const session = useNimble((s) => s.session);
  const game = useNimble((s) =>
    s.games.find((item) => item.id === s.session?.gameId),
  );
  const profiles = useNimble((s) => s.profiles);
  const qualityProfileId = useNimble((s) => s.qualityProfileId);
  const setQualityProfile = useNimble((s) => s.setQualityProfile);
  const setSessionStatus = useNimble((s) => s.setSessionStatus);
  const setConnectionStatus = useNimble((s) => s.setConnectionStatus);
  const connectionStatus = useNimble((s) => s.connectionStatus);
  const restartSession = useNimble((s) => s.restartSession);
  const endSession = useNimble((s) => s.endSession);
  const host = useNimble((s) => s.devices.find((device) => device.isHost));
  const controllers = useNimble((s) => s.controllers);
  const lastForward = useNimble((s) => s.lastForward);
  const testControllerInput = useNimble((s) => s.testControllerInput);
  const [setupId, setSetupId] = useState<string | null>(null);

  const [overlay, setOverlay] = useState(false);
  const [view, setView] = useState<OverlayView>("menu");
  const [hint, setHint] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [ending, setEnding] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useControllerForwarding(Boolean(session) && !ending);

  const setup = controllers.find((item) => item.id === setupId);

  useEffect(() => {
    const hide = window.setTimeout(() => setHint(false), 3200);
    return () => window.clearTimeout(hide);
  }, []);

  useEffect(() => {
    const started = session?.startedAt
      ? new Date(session.startedAt).getTime()
      : Date.now();
    const tick = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - started) / 1000));
    }, 1000);
    return () => window.clearInterval(tick);
  }, [session?.startedAt, restarting]);

  useEffect(() => {
    const t1 = window.setTimeout(() => {
      setConnectionStatus("unstable");
      setToast("Connection unstable");
    }, 9000);
    const t2 = window.setTimeout(() => {
      setToast("Adjusting quality automatically");
    }, 11000);
    const t3 = window.setTimeout(() => {
      setConnectionStatus("excellent");
      setToast("Connection stabilized");
    }, 16000);
    const t4 = window.setTimeout(() => setToast(null), 19000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [setConnectionStatus]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (ending) return;
      if (overlay && view !== "menu" && view !== "confirm") {
        setView("menu");
        return;
      }
      if (overlay && view === "confirm") {
        setView("menu");
        return;
      }
      setOverlay((open) => !open);
      setView("menu");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ending, overlay, view]);

  if (!session || !game) return <Navigate to="/home" />;

  async function handleEnd() {
    setEnding(true);
    setOverlay(false);
    setSessionStatus("ending");
    await new Promise((resolve) => window.setTimeout(resolve, 1100));
    endSession();
    void navigate({ to: "/home" });
  }

  async function handleRestart() {
    setRestarting(true);
    setOverlay(false);
    restartSession();
    setSessionStatus("launching");
    await new Promise((resolve) => window.setTimeout(resolve, 1200));
    setSessionStatus("running");
    setRestarting(false);
  }

  const qualityName =
    profiles.find((profile) => profile.id === qualityProfileId)?.name ??
    "Automatic";

  return (
    <main
      className="relative min-h-dvh overflow-hidden bg-background"
      onClick={() => {
        if (!ending && !restarting && !overlay) {
          setOverlay(true);
          setView("menu");
        }
      }}
    >
      <GameArt
        game={game}
        variant="hero"
        kenBurns
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-background/15" />

      {hint && !overlay ? (
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.18em] text-foreground/80 uppercase">
          Press Esc for menu
        </p>
      ) : null}

      {lastForward && !overlay ? (
        <div className="absolute top-8 left-8 rounded-full bg-background/80 px-4 py-2 text-sm text-foreground backdrop-blur-sm">
          P{lastForward.playerSlot} · {lastForward.emulatedLabel} → PC
        </div>
      ) : null}

      {toast && !overlay ? (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-4 py-2 text-sm text-foreground backdrop-blur-sm">
          {toast}
        </div>
      ) : null}

      {restarting ? (
        <div className="absolute inset-0 grid place-items-center bg-background/55">
          <p className="font-display text-2xl">Restarting game</p>
        </div>
      ) : null}

      {ending ? (
        <div className="absolute inset-0 grid place-items-center bg-background/80">
          <p className="font-display text-2xl">Ending session</p>
        </div>
      ) : null}

      {overlay && !ending ? (
        <div
          className="absolute inset-0 flex bg-background/55 backdrop-blur-[2px]"
          onClick={(event) => event.stopPropagation()}
        >
          <aside className="no-scrollbar flex w-full max-w-md flex-col justify-center overflow-y-auto px-8 py-12 md:px-12">
            {view === "menu" ? (
              <nav className="stagger-in flex flex-col items-start gap-1">
                <p className="mb-6 text-xs tracking-[0.22em] text-muted-foreground uppercase">
                  {game.name}
                </p>
                <MenuItem onClick={() => setOverlay(false)}>Resume</MenuItem>
                <MenuItem onClick={() => setView("controller")}>Controller</MenuItem>
                <MenuItem onClick={() => setView("quality")}>
                  Streaming Quality
                </MenuItem>
                <MenuItem onClick={() => void handleRestart()}>Restart Game</MenuItem>
                <MenuItem onClick={() => setView("info")}>Session Info</MenuItem>
                <MenuItem onClick={() => setView("confirm")}>End Session</MenuItem>
              </nav>
            ) : null}

            {view === "quality" ? (
              <div>
                <Back onClick={() => setView("menu")} />
                <h2 className="font-display text-3xl font-semibold">Streaming Quality</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nimble chooses this for you. Change it only if you want to.
                </p>
                <div className="mt-6 space-y-2">
                  {profiles.map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setQualityProfile(profile.id)}
                      className={cn(
                        "block w-full rounded-lg px-4 py-3 text-left",
                        qualityProfileId === profile.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground hover:bg-muted",
                      )}
                    >
                      <div className="text-sm font-medium">{profile.name}</div>
                      <div
                        className={cn(
                          "mt-1 text-xs",
                          qualityProfileId === profile.id
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {profile.description}
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-6 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setView("advanced")}
                >
                  Advanced
                </button>
              </div>
            ) : null}

            {view === "advanced" ? (
              <div>
                <Back onClick={() => setView("quality")} />
                <h2 className="font-display text-3xl font-semibold">Advanced</h2>
                <dl className="mt-6 space-y-4 text-sm">
                  <Row label="Resolution" value="Automatic" />
                  <Row label="Frame rate" value="Automatic" />
                  <Row label="HDR" value="Automatic" />
                  <Row label="Decoder" value="Automatic" />
                </dl>
              </div>
            ) : null}

            {view === "controller" ? (
              <div>
                <Back onClick={() => setView("menu")} />
                <h2 className="font-display text-3xl font-semibold">Controllers</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Each pad on this TV is sent to your PC as its own gamepad.
                </p>
                <div className="mt-6 space-y-3">
                  {controllers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No controller paired yet.
                    </p>
                  ) : (
                    controllers.map((pad) => (
                      <div
                        key={pad.id}
                        className="rounded-lg bg-card px-4 py-3 shadow-[var(--shadow-border)]"
                      >
                        <p className="text-sm font-medium">
                          P{pad.playerSlot} · {pad.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {controllerService.bluetoothLabel(pad.bluetoothMode)} · Sending as{" "}
                          {pad.config.emulateAs === "xbox" ? "Xbox" : "PlayStation"}
                        </p>
                        {lastForward?.controllerId === pad.id ? (
                          <p className="mt-2 text-xs text-success">
                            Last sent {lastForward.emulatedLabel}
                          </p>
                        ) : (
                          <p className="mt-2 text-xs text-success">Forwarding</p>
                        )}
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => testControllerInput(pad.id, "faceDown")}
                          >
                            Test
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSetupId(pad.id);
                              setView("controller-setup");
                            }}
                          >
                            Configure
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}

            {view === "controller-setup" && setup ? (
              <div>
                <Back onClick={() => setView("controller")} />
                <h2 className="font-display text-3xl font-semibold">{setup.name}</h2>
                <div className="mt-6">
                  <ControllerConfigure controller={setup} compact />
                </div>
              </div>
            ) : null}

            {view === "info" ? (
              <div>
                <Back onClick={() => setView("menu")} />
                <h2 className="font-display text-3xl font-semibold">Session Info</h2>
                <dl className="mt-6 space-y-4 text-sm">
                  <Row label="Game" value={game.name} />
                  <Row label="Playing on" value={host?.name ?? "Gaming PC"} />
                  <Row label="Quality" value={qualityName} />
                  <Row
                    label="Connection"
                    value={
                      connectionStatus === "unstable" ? "Adjusting" : "Excellent"
                    }
                  />
                  <Row
                    label="Controllers"
                    value={
                      controllers.length
                        ? `${controllers.length} forwarding`
                        : "None"
                    }
                  />
                  <Row
                    label="Time"
                    value={formatSessionClock(elapsed)}
                  />
                </dl>
              </div>
            ) : null}

            {view === "confirm" ? (
              <div>
                <h2 className="font-display text-3xl font-semibold">
                  End your game session?
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  You will return to Nimble. The game will close on your PC.
                </p>
                <div className="mt-8 flex gap-3">
                  <Button variant="secondary" onClick={() => setView("menu")}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={() => void handleEnd()}>
                    End Session
                  </Button>
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      ) : null}
    </main>
  );
}

function MenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-focusable
      onClick={onClick}
      className="rounded-md px-2 py-2 text-left font-display text-2xl font-medium text-foreground/80 transition-colors duration-[var(--motion-quick)] hover:text-foreground focus:text-foreground focus:shadow-[var(--shadow-focus)]"
    >
      {children}
    </button>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-6 text-sm text-muted-foreground hover:text-foreground"
    >
      Back
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
