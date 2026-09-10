import { useState } from "react";
import { ControllerFace } from "@/components/controller-face";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { controllerService } from "@/services/controllerService";
import { useNimble } from "@/store/nimble-store";
import type {
  EmulationTarget,
  FaceButton,
  GameController,
  LayoutPreset,
  PlayerSlot,
} from "@/types/controller";

function Choice<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
      <p className="text-sm font-medium">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            data-focusable
            onClick={() => onChange(option.id)}
            className={cn(
              "h-10 rounded-full px-4 text-sm",
              value === option.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
      <span className="flex items-center justify-between text-sm font-medium">
        {label}
        <span className="tabular-nums text-muted-foreground">{value}%</span>
      </span>
      <input
        type="range"
        min={0}
        max={30}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-primary"
      />
    </label>
  );
}

export function ControllerConfigure({
  controller,
  compact = false,
}: {
  controller: GameController;
  compact?: boolean;
}) {
  const assignSlot = useNimble((s) => s.assignControllerSlot);
  const update = useNimble((s) => s.updateControllerConfig);
  const remap = useNimble((s) => s.remapController);
  const reset = useNimble((s) => s.resetControllerMapping);
  const test = useNimble((s) => s.testControllerInput);
  const lastForward = useNimble((s) => s.lastForward);
  const [waiting, setWaiting] = useState<FaceButton | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const layout: LayoutPreset =
    controller.config.layout === "automatic"
      ? controller.family === "playstation"
        ? "playstation"
        : "xbox"
      : controller.config.layout;

  function handleSelect(button: FaceButton) {
    if (!waiting) {
      setWaiting(button);
      setFeedback("Now choose the button to swap with.");
      return;
    }
    if (waiting === button) {
      setWaiting(null);
      setFeedback(null);
      return;
    }
    remap(controller.id, waiting, button);
    setWaiting(null);
    setFeedback("Buttons swapped.");
  }

  function sendTest(button: FaceButton = "faceDown") {
    test(controller.id, button);
    const packet = controllerService.lastForwarded();
    if (packet) {
      setFeedback(
        `Sent ${packet.emulatedLabel} to your PC as ${packet.target === "xbox" ? "Xbox" : "PlayStation"}.`,
      );
    }
  }

  return (
    <div className="space-y-4">
      {!compact ? (
        <Choice<PlayerSlot>
          label="Player"
          value={controller.playerSlot ?? 1}
          onChange={(slot) => assignSlot(controller.id, slot)}
          options={[
            { id: 1, label: "Player 1" },
            { id: 2, label: "Player 2" },
            { id: 3, label: "Player 3" },
            { id: 4, label: "Player 4" },
          ]}
        />
      ) : null}

      <Choice<LayoutPreset>
        label="Button labels"
        value={controller.config.layout}
        onChange={(value) => update(controller.id, { layout: value })}
        options={[
          { id: "automatic", label: "Automatic" },
          { id: "xbox", label: "Xbox" },
          { id: "playstation", label: "PlayStation" },
        ]}
      />

      <Choice<EmulationTarget>
        label="Send to PC as"
        value={controller.config.emulateAs}
        onChange={(value) => update(controller.id, { emulateAs: value })}
        options={[
          { id: "xbox", label: "Xbox controller" },
          { id: "playstation", label: "PlayStation controller" },
        ]}
      />

      <label className="flex items-center justify-between rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
        <span className="text-sm font-medium">Vibration</span>
        <Switch
          checked={controller.config.vibration}
          onCheckedChange={(value) => update(controller.id, { vibration: value })}
        />
      </label>
      <label className="flex items-center justify-between rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
        <span className="text-sm font-medium">Invert look</span>
        <Switch
          checked={controller.config.invertLook}
          onCheckedChange={(value) => update(controller.id, { invertLook: value })}
        />
      </label>
      <label className="flex items-center justify-between rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
        <span className="text-sm font-medium">Swap sticks</span>
        <Switch
          checked={controller.config.swapSticks}
          onCheckedChange={(value) => update(controller.id, { swapSticks: value })}
        />
      </label>

      <SliderRow
        label="Left stick dead zone"
        value={controller.config.leftDeadzone}
        onChange={(value) => update(controller.id, { leftDeadzone: value })}
      />
      <SliderRow
        label="Right stick dead zone"
        value={controller.config.rightDeadzone}
        onChange={(value) => update(controller.id, { rightDeadzone: value })}
      />
      <SliderRow
        label="Trigger dead zone"
        value={controller.config.triggerDeadzone}
        onChange={(value) => update(controller.id, { triggerDeadzone: value })}
      />

      <div className="rounded-xl bg-card px-5 py-5 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Button mapping</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Choose two buttons to swap. Nimble still sends a standard pad to your PC.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => reset(controller.id)}>
            Reset
          </Button>
        </div>
        <div className="mt-5">
          <ControllerFace
            family={layout === "playstation" ? "playstation" : controller.family}
            waiting={waiting}
            active={lastForward?.controllerId === controller.id ? lastForward.physical : null}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => sendTest("faceDown")}>Test input</Button>
        <Button variant="secondary" onClick={() => sendTest("start")}>
          Test menu
        </Button>
      </div>
      {feedback ? (
        <p className="text-sm text-muted-foreground">{feedback}</p>
      ) : null}
    </div>
  );
}
