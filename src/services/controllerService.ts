import { delay } from "@/lib/utils";
import { NEARBY_CONTROLLERS, PAIRED_CONTROLLERS } from "@/mocks/controllers";
import {
  defaultConfig,
  identityMapping,
  type BluetoothMode,
  type ControllerConfig,
  type ControllerFamily,
  type EmulationTarget,
  type FaceButton,
  type ForwardedInput,
  type GameController,
  type NearbyController,
  type PlayerSlot,
} from "@/types/controller";

let controllers: GameController[] = PAIRED_CONTROLLERS.map((item) => ({
  ...item,
  config: { ...item.config, mapping: { ...item.config.mapping } },
}));

let forwarding = false;
let lastForward: ForwardedInput | null = null;
const recentForwards: ForwardedInput[] = [];

function clone(controller: GameController): GameController {
  return {
    ...controller,
    config: { ...controller.config, mapping: { ...controller.config.mapping } },
  };
}

function nextSlot(): PlayerSlot | null {
  const used = new Set(
    controllers.filter((item) => item.paired).map((item) => item.playerSlot),
  );
  const slots: PlayerSlot[] = [1, 2, 3, 4];
  return slots.find((slot) => !used.has(slot)) ?? null;
}

function bluetoothLabel(mode: BluetoothMode) {
  if (mode === "xbox-wireless") return "Xbox Wireless";
  if (mode === "playstation") return "PlayStation";
  if (mode === "classic-2") return "Bluetooth 2.0";
  return "Bluetooth 3.0";
}

function familyName(family: ControllerFamily) {
  if (family === "xbox") return "Xbox";
  if (family === "playstation") return "PlayStation";
  return "Generic";
}

const XBOX_LABELS: Record<FaceButton, string> = {
  faceDown: "A",
  faceRight: "B",
  faceLeft: "X",
  faceUp: "Y",
  l1: "LB",
  r1: "RB",
  l2: "LT",
  r2: "RT",
  select: "View",
  start: "Menu",
  l3: "LS",
  r3: "RS",
  dpadUp: "D-Up",
  dpadDown: "D-Down",
  dpadLeft: "D-Left",
  dpadRight: "D-Right",
};

const PLAYSTATION_LABELS: Record<FaceButton, string> = {
  faceDown: "Cross",
  faceRight: "Circle",
  faceLeft: "Square",
  faceUp: "Triangle",
  l1: "L1",
  r1: "R1",
  l2: "L2",
  r2: "R2",
  select: "Create",
  start: "Options",
  l3: "L3",
  r3: "R3",
  dpadUp: "D-Up",
  dpadDown: "D-Down",
  dpadLeft: "D-Left",
  dpadRight: "D-Right",
};

function emulatedLabel(target: EmulationTarget, button: FaceButton) {
  return target === "playstation" ? PLAYSTATION_LABELS[button] : XBOX_LABELS[button];
}

function physicalLabel(family: ControllerFamily, button: FaceButton) {
  if (family === "playstation") return PLAYSTATION_LABELS[button];
  return XBOX_LABELS[button];
}

export const controllerService = {
  list(): GameController[] {
    return controllers.map(clone);
  },

  get(id: string): GameController | undefined {
    const found = controllers.find((item) => item.id === id);
    return found ? clone(found) : undefined;
  },

  bluetoothLabel,
  familyName,
  physicalLabel,
  emulatedLabel,

  isForwarding() {
    return forwarding;
  },

  lastForwarded(): ForwardedInput | null {
    return lastForward ? { ...lastForward } : null;
  },

  recentForwards(): ForwardedInput[] {
    return recentForwards.slice(0, 8);
  },

  async scan(): Promise<NearbyController[]> {
    await delay(1600);
    const pairedIds = new Set(controllers.map((item) => item.id));
    return NEARBY_CONTROLLERS.filter((item) => !pairedIds.has(item.id)).map((item) => ({
      ...item,
    }));
  },

  async pair(nearby: NearbyController): Promise<GameController> {
    const slot = nextSlot();
    if (!slot) {
      throw new Error("All four player spots are taken.");
    }
    await delay(1200);
    const controller: GameController = {
      id: nearby.id,
      name: nearby.name,
      family: nearby.family,
      bluetoothMode: nearby.bluetoothMode,
      status: forwarding ? "forwarding" : "connected",
      playerSlot: slot,
      batteryLabel: "Full",
      config: defaultConfig(nearby.family),
      lastInputAt: null,
      lastInputLabel: null,
      paired: true,
    };
    controllers = [...controllers, controller];
    return clone(controller);
  },

  unpair(id: string): GameController[] {
    controllers = controllers.filter((item) => item.id !== id);
    return this.list();
  },

  assignSlot(id: string, slot: PlayerSlot): GameController | undefined {
    const current = controllers.find((item) => item.id === id);
    if (!current) return undefined;
    const occupant = controllers.find(
      (item) => item.id !== id && item.playerSlot === slot,
    );
    if (occupant) occupant.playerSlot = current.playerSlot;
    current.playerSlot = slot;
    return clone(current);
  },

  updateConfig(
    id: string,
    patch: Partial<ControllerConfig>,
  ): GameController | undefined {
    const current = controllers.find((item) => item.id === id);
    if (!current) return undefined;
    current.config = {
      ...current.config,
      ...patch,
      mapping: patch.mapping ?? current.config.mapping,
    };
    return clone(current);
  },

  remap(id: string, from: FaceButton, to: FaceButton): GameController | undefined {
    const current = controllers.find((item) => item.id === id);
    if (!current) return undefined;
    const mapping = { ...current.config.mapping };
    const swap = mapping[from];
    mapping[from] = mapping[to];
    mapping[to] = swap;
    current.config.mapping = mapping;
    return clone(current);
  },

  resetMapping(id: string): GameController | undefined {
    return this.updateConfig(id, { mapping: identityMapping() });
  },

  startForwarding() {
    forwarding = true;
    controllers = controllers.map((item) =>
      item.paired ? { ...item, status: "forwarding" as const } : item,
    );
  },

  stopForwarding() {
    forwarding = false;
    lastForward = null;
    recentForwards.length = 0;
    controllers = controllers.map((item) =>
      item.paired ? { ...item, status: "connected" as const } : item,
    );
  },

  forwardInput(id: string, physical: FaceButton): ForwardedInput | null {
    const current = controllers.find((item) => item.id === id);
    if (!current || !current.playerSlot) return null;
    const emulated = current.config.mapping[physical];
    const packet: ForwardedInput = {
      controllerId: current.id,
      playerSlot: current.playerSlot,
      physical,
      emulated,
      emulatedLabel: emulatedLabel(current.config.emulateAs, emulated),
      target: current.config.emulateAs,
      at: new Date().toISOString(),
    };
    lastForward = packet;
    recentForwards.unshift(packet);
    if (recentForwards.length > 12) recentForwards.pop();
    current.lastInputAt = packet.at;
    current.lastInputLabel = packet.emulatedLabel;
    current.status = forwarding ? "forwarding" : current.status;
    return { ...packet };
  },

  testPress(id: string, physical: FaceButton = "faceDown") {
    return this.forwardInput(id, physical);
  },
};
