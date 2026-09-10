import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  onChange,
  size = "md",
  readOnly = false,
}: {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md";
  readOnly?: boolean;
}) {
  const icon = size === "sm" ? "size-3.5" : "size-5";
  return (
    <div className="flex items-center gap-1" role={readOnly ? "img" : "radiogroup"}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = value >= star - 0.25;
        const half = !filled && value >= star - 0.75;
        return (
          <button
            key={star}
            type="button"
            data-focusable={!readOnly || undefined}
            disabled={readOnly}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            onClick={() => onChange?.(star)}
            className={cn(
              "grid place-items-center rounded-sm",
              readOnly && "pointer-events-none",
            )}
          >
            <Star
              className={cn(
                icon,
                filled || half ? "text-accent" : "text-subtle",
              )}
              fill={filled ? "currentColor" : "none"}
            />
          </button>
        );
      })}
    </div>
  );
}

export function RatingLabel({ average, count }: { average: number; count: number }) {
  return (
    <p className="flex items-center gap-2 text-sm">
      <Star className="size-3.5 text-accent" fill="currentColor" />
      <span className="tabular-nums font-medium">{average.toFixed(1)}</span>
      <span className="text-muted-foreground">
        {count.toLocaleString()} ratings
      </span>
    </p>
  );
}
