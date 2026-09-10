import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { NimbleLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useNimble } from "@/store/nimble-store";

export const Route = createFileRoute("/")({ component: WelcomePage });

function WelcomePage() {
  const navigate = useNavigate();
  const isAuthenticated = useNimble((s) => s.isAuthenticated);
  const hasPairedHost = useNimble((s) => s.hasPairedHost);
  const signIn = useNimble((s) => s.signIn);
  const createAccount = useNimble((s) => s.createAccount);

  if (isAuthenticated && hasPairedHost) {
    return <Navigate to="/home" />;
  }
  if (isAuthenticated && !hasPairedHost) {
    return <Navigate to="/connect" />;
  }

  function enter(mode: "in" | "create") {
    if (mode === "create") createAccount();
    else signIn();
    void navigate({ to: "/connect" });
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-glow absolute -top-24 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="ambient-glow absolute right-0 bottom-0 size-[22rem] rounded-full bg-accent/12 blur-3xl" />
      </div>
      <div className="stagger-in relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <NimbleLogo variant="hero" className="max-w-lg md:max-w-xl" />
        <p className="mt-2 text-sm tracking-[0.28em] text-muted-foreground uppercase">
          Play · Move · Belong
        </p>
        <div className="mt-10 flex w-full max-w-md flex-col gap-3">
          <Button size="lg" className="w-full" onClick={() => enter("in")}>
            Sign in
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full"
            onClick={() => enter("create")}
          >
            Create account
          </Button>
        </div>
      </div>
    </main>
  );
}
