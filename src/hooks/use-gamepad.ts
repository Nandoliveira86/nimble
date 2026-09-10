import { useEffect } from "react";

function press(key: string) {
  const target = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : document.body;
  target.dispatchEvent(
    new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }),
  );
}

export function useGamepadNavigation() {
  useEffect(() => {
    let raf = 0;
    let last = 0;
    const cooldown = 180;

    const poll = (time: number) => {
      const pad = navigator.getGamepads?.()[0];
      if (pad && time - last > cooldown) {
        const [ax, ay] = pad.axes;
        if (pad.buttons[12]?.pressed || ay < -0.55) {
          press("ArrowUp");
          last = time;
        } else if (pad.buttons[13]?.pressed || ay > 0.55) {
          press("ArrowDown");
          last = time;
        } else if (pad.buttons[14]?.pressed || ax < -0.55) {
          press("ArrowLeft");
          last = time;
        } else if (pad.buttons[15]?.pressed || ax > 0.55) {
          press("ArrowRight");
          last = time;
        } else if (pad.buttons[0]?.pressed) {
          press("Enter");
          last = time;
        } else if (pad.buttons[1]?.pressed || pad.buttons[9]?.pressed) {
          press("Escape");
          last = time;
        }
      }
      raf = requestAnimationFrame(poll);
    };

    raf = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(raf);
  }, []);
}
