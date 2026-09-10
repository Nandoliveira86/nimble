import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Switch({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "focus-ring peer inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-muted transition-colors duration-[var(--motion-quick)] data-[state=checked]:bg-primary data-[state=checked]:shadow-[var(--shadow-glow)]",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-6 translate-x-0.5 rounded-full bg-muted-foreground transition-transform duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)] data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-primary-foreground" />
    </SwitchPrimitive.Root>
  );
}
