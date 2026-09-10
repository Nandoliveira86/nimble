import { useEffect } from "react";
import { controllerService } from "@/services/controllerService";
import { useNimble } from "@/store/nimble-store";
import type { FaceButton } from "@/types/controller";

const BUTTON_MAP: FaceButton[] = [
  "faceDown",
  "faceRight",
  "faceLeft",
  "faceUp",
  "l1",
  "r1",
  "l2",
  "r2",
  "select",
  "start",
  "l3",
  "r3",
  "dpadUp",
  "dpadDown",
  "dpadLeft",
  "dpadRight",
];

export function useControllerForwarding(enabled: boolean) {
  const refresh = useNimble((s) => s.refreshControllers);

  useEffect(() => {
    if (!enabled) return;
    const held = new Set<string>();
    let raf = 0;

    const poll = () => {
      const pads = navigator.getGamepads?.() ?? [];
      const paired = controllerService.list();
      pads.forEach((pad, index) => {
        if (!pad) return;
        const target = paired[index] ?? paired[0];
        if (!target) return;
        pad.buttons.forEach((button, buttonIndex) => {
          const physical = BUTTON_MAP[buttonIndex];
          if (!physical) return;
          const key = `${target.id}:${physical}`;
          if (button.pressed && !held.has(key)) {
            held.add(key);
            controllerService.forwardInput(target.id, physical);
            refresh();
          }
          if (!button.pressed) held.delete(key);
        });
      });
      raf = requestAnimationFrame(poll);
    };

    raf = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(raf);
  }, [enabled, refresh]);
}
