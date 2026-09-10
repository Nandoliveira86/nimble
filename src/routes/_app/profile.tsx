import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { NimbleLogo } from "@/components/logo";
import { useNimble } from "@/store/nimble-store";

export const Route = createFileRoute("/_app/profile")({ component: ProfilePage });

function ProfilePage() {
  const navigate = useNavigate();
  const user = useNimble((s) => s.user);
  const games = useNimble((s) => s.games);
  const signOut = useNimble((s) => s.signOut);
  const isPremium = useNimble((s) => s.isPremium);
  const setPremium = useNimble((s) => s.setPremium);
  const hours = Math.round(games.reduce((sum, game) => sum + game.hoursPlayed, 0));

  return (
    <main className="mx-auto max-w-lg px-4 py-12 md:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="grid size-24 place-items-center rounded-full bg-muted font-display text-3xl font-semibold text-primary shadow-[var(--shadow-glow)]">
          {user?.name.slice(0, 1) ?? "B"}
        </div>
        <h1 className="font-display mt-6 text-3xl font-semibold">{user?.name ?? "Bruno"}</h1>
        <p className="mt-2 text-muted-foreground">
          {isPremium ? "Nimble Premium" : "Your games. Anywhere."}
        </p>
      </div>
      <dl className="mt-10 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-card px-3 py-5 shadow-[var(--shadow-border)]">
          <dt className="text-xs tracking-wide text-muted-foreground uppercase">Games</dt>
          <dd className="mt-2 font-display text-2xl tabular-nums">{games.length}</dd>
        </div>
        <div className="rounded-xl bg-card px-3 py-5 shadow-[var(--shadow-border)]">
          <dt className="text-xs tracking-wide text-muted-foreground uppercase">Hours</dt>
          <dd className="mt-2 font-display text-2xl tabular-nums">{hours}</dd>
        </div>
        <div className="rounded-xl bg-card px-3 py-5 shadow-[var(--shadow-border)]">
          <dt className="text-xs tracking-wide text-muted-foreground uppercase">Devices</dt>
          <dd className="mt-2 font-display text-2xl tabular-nums">2</dd>
        </div>
      </dl>

      <div className="mt-8 rounded-xl bg-card px-5 py-5 text-left shadow-[var(--shadow-border)]">
        <p className="text-sm font-medium">
          {isPremium ? "You are Premium" : "Nimble Premium"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Premium members can recommend where to get a game on Find — Steam, Xbox,
          and the other PC stores. Everyone else can still search, rate, and see
          official storefronts.
        </p>
        {isPremium ? (
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => setPremium(false)}
          >
            Leave Premium
          </Button>
        ) : (
          <Button className="mt-4" onClick={() => setPremium(true)}>
            Become Premium
          </Button>
        )}
      </div>

      <Link
        to="/find"
        className="mt-6 inline-flex h-11 items-center text-sm font-medium underline-offset-4 hover:underline"
      >
        Find a game
      </Link>

      <Button
        variant="secondary"
        className="mt-10 w-full"
        onClick={() => {
          signOut();
          void navigate({ to: "/" });
        }}
      >
        Sign out
      </Button>
      <div className="mt-16 flex justify-center opacity-80">
        <NimbleLogo variant="lockup" size="sm" />
      </div>
    </main>
  );
}
