import { cn } from "@/lib/utils";
import { controllerService } from "@/services/controllerService";
import type { ControllerFamily, FaceButton } from "@/types/controller";

const GROUPS: { title: string; buttons: FaceButton[] }[] = [
  { title: "Shoulders", buttons: ["l2", "l1", "r1", "r2"] },
  { title: "Face", buttons: ["faceUp", "faceLeft", "faceDown", "faceRight"] },
  { title: "D-pad", buttons: ["dpadUp", "dpadLeft", "dpadDown", "dpadRight"] },
  { title: "System", buttons: ["select", "start", "l3", "r3"] },
];

interface ControllerFaceProps {
  family: ControllerFamily;
  active?: FaceButton | null;
  waiting?: FaceButton | null;
  onSelect?: (button: FaceButton) => void;
}

export function ControllerFace({
  family,
  active,
  waiting,
  onSelect,
}: ControllerFaceProps) {
  return (
    <div className="space-y-5">
      {GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {group.title}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {group.buttons.map((id) => {
              const label = controllerService.physicalLabel(family, id);
              const isActive = active === id;
              const isWaiting = waiting === id;
              return (
                <button
                  key={id}
                  type="button"
                  data-focusable
                  onClick={() => onSelect?.(id)}
                  className={cn(
                    "h-11 rounded-lg text-sm font-medium",
                    isActive && "bg-primary text-primary-foreground",
                    isWaiting && !isActive && "bg-muted shadow-[var(--shadow-focus)]",
                    !isActive && !isWaiting && "bg-muted text-foreground hover:bg-secondary",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
