import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Compass,
  Gamepad2,
  House,
  LayoutGrid,
  Search,
  Settings,
  Tv,
} from "lucide-react";
import { useEffect } from "react";
import { NimbleLogo } from "@/components/logo";
import { useGamepadNavigation } from "@/hooks/use-gamepad";
import { cn } from "@/lib/utils";
import { useNimble } from "@/store/nimble-store";

const NAV = [
  { to: "/home", label: "Home", icon: House },
  { to: "/library", label: "Library", icon: LayoutGrid },
  { to: "/find", label: "Find", icon: Compass },
  { to: "/search", label: "Search", icon: Search, hideMobile: true },
  { to: "/devices", label: "Devices", icon: Tv },
  { to: "/controllers", label: "Controllers", icon: Gamepad2 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = useNimble((s) => s.hydrated);
  const isAuthenticated = useNimble((s) => s.isAuthenticated);
  const hasPairedHost = useNimble((s) => s.hasPairedHost);
  const user = useNimble((s) => s.user);
  const isPremium = useNimble((s) => s.isPremium);

  useGamepadNavigation();

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      void navigate({ to: "/" });
      return;
    }
    if (!hasPairedHost) {
      void navigate({ to: "/connect" });
    }
  }, [hydrated, isAuthenticated, hasPairedHost, navigate]);

  if (!hydrated || !isAuthenticated || !hasPairedHost) {
    return <div className="min-h-dvh bg-background" />;
  }

  const navPath = pathname.startsWith("/controllers")
    ? "/controllers"
    : pathname.startsWith("/find")
      ? "/find"
      : pathname;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-4 md:px-8">
          <Link to="/home" className="shrink-0 focus-ring rounded-md">
            <NimbleLogo variant="mark" size="sm" className="md:hidden" />
            <NimbleLogo variant="lockup" size="sm" className="hidden md:block" />
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV.map((item) => {
              const active = navPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  data-focusable
                  className={cn(
                    "rounded-full px-2.5 py-2 text-sm font-medium transition-colors duration-[var(--motion-quick)]",
                    active
                      ? "text-primary shadow-[var(--shadow-glow)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            {isPremium ? (
              <span className="hidden rounded-full bg-muted px-3 py-1 text-[0.65rem] font-medium tracking-wide text-primary uppercase sm:inline">
                Premium
              </span>
            ) : null}
            <Link
              to="/profile"
              data-focusable
              aria-label="Profile"
              className={cn(
                "grid size-10 place-items-center rounded-full bg-muted text-sm font-semibold",
                pathname === "/profile"
                  ? "text-primary shadow-[var(--shadow-focus)]"
                  : "focus-ring",
              )}
            >
              {user?.name.slice(0, 1) ?? "B"}
            </Link>
          </div>
        </div>
      </header>

      <div className="pb-24 md:pb-10">{children}</div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-around px-1 py-2">
          {NAV.filter((item) => !("hideMobile" in item && item.hideMobile)).map(
            (item) => {
              const Icon = item.icon;
              const active = navPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 rounded-md px-1 text-[0.6rem]",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              );
            },
          )}
        </div>
      </nav>
    </div>
  );
}
