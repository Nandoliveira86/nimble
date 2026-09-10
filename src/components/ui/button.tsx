import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)] select-none disabled:pointer-events-none disabled:opacity-40 active:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-brand text-foreground shadow-[var(--shadow-cta)] hover:shadow-[var(--shadow-glow)]",
        secondary:
          "bg-elevated text-secondary-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:text-accent",
        ghost:
          "bg-transparent text-foreground hover:bg-muted hover:text-primary",
        danger:
          "bg-destructive text-foreground hover:bg-destructive/90",
        outline:
          "bg-transparent text-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:text-primary",
      },
      size: {
        sm: "h-10 rounded-lg px-3.5 text-sm",
        md: "h-12 rounded-lg px-5 text-sm",
        lg: "h-14 rounded-lg px-7 text-base",
        xl: "h-16 rounded-xl px-8 text-lg",
        icon: "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), "focus-ring", className)}
      {...props}
    />
  );
}
