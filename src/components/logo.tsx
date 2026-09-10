import { cn } from "@/lib/utils";

type LogoVariant = "hero" | "lockup" | "mark";
type LogoSize = "sm" | "md" | "lg" | "xl";

interface NimbleLogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  markOnly?: boolean;
  className?: string;
}

const markBox: Record<LogoSize, string> = {
  sm: "size-7",
  md: "size-9",
  lg: "size-12",
  xl: "size-16",
};

const lockupHeight: Record<LogoSize, string> = {
  sm: "h-7",
  md: "h-9",
  lg: "h-12",
  xl: "h-16",
};

export function NimbleLogo({
  size = "md",
  variant,
  markOnly = false,
  className,
}: NimbleLogoProps) {
  const resolved: LogoVariant = variant ?? (markOnly ? "mark" : "lockup");

  if (resolved === "hero") {
    return (
      <img
        src="/brand/logo-hero.png"
        alt="Nimble Game"
        className={cn("h-auto w-full max-w-xl object-contain", className)}
      />
    );
  }

  if (resolved === "mark") {
    return (
      <img
        src="/brand/logo-mark-white.png"
        alt="Nimble Game"
        className={cn(markBox[size], "object-contain", className)}
      />
    );
  }

  return (
    <img
      src="/brand/logo-lockup-white.png"
      alt="Nimble Game"
      className={cn(lockupHeight[size], "w-auto object-contain", className)}
    />
  );
}
