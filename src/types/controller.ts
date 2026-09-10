export type ControllerFamily = "xbox" | "playstation" | "generic";

export type BluetoothMode =
  | "xbox-wireless"
  | "playstation"
  | "classic-2"
  | "classic-3";

export type PlayerSlot = 1 | 2 | 3 | 4;

export type ControllerStatus =
  | "disconnected"
  | "pairing"
  | "connected"
  | "forwarding";

export type LayoutPreset = "automatic" | "xbox" | "playstation";
export type EmulationTarget = "xbox" | "playstation";

export type FaceButton =
  | "faceDown"
  | "faceRight"
  | "faceLeft"
  | "faceUp"
  | "l1"
  | "r1"
  | "l2"
  | "r2"
  | "select"
  | "start"
  | "l3"
  | "r3"
  | "dpadUp"
  | "dpadDown"
  | "dpadLeft"
  | "dpadRight";

export type ButtonMapping = Record<FaceButton, FaceButton>;

export interface ControllerConfig {
  layout: LayoutPreset;
  emulateAs: EmulationTarget;
  vibration: boolean;
  leftDeadzone: number;
  rightDeadzone: number;
  triggerDeadzone: number;
  invertLook: boolean;
  swapSticks: boolean;
  mapping: ButtonMapping;
}

export interface GameController {
  id: string;
  name: string;
  family: ControllerFamily;
  bluetoothMode: BluetoothMode;
  status: ControllerStatus;
  playerSlot: PlayerSlot | null;
  batteryLabel: string;
  config: ControllerConfig;
  lastInputAt: string | null;
  lastInputLabel: string | null;
  paired: boolean;
}

export interface NearbyController {
  id: string;
  name: string;
  family: ControllerFamily;
  bluetoothMode: BluetoothMode;
  hint: string;
}

export interface ForwardedInput {
  controllerId: string;
  playerSlot: PlayerSlot;
  physical: FaceButton;
  emulated: FaceButton;
  emulatedLabel: string;
  target: EmulationTarget;
  at: string;
}

export const FACE_BUTTONS: FaceButton[] = [
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

export function identityMapping(): ButtonMapping {
  return {
    faceDown: "faceDown",
    faceRight: "faceRight",
    faceLeft: "faceLeft",
    faceUp: "faceUp",
    l1: "l1",
    r1: "r1",
    l2: "l2",
    r2: "r2",
    select: "select",
    start: "start",
    l3: "l3",
    r3: "r3",
    dpadUp: "dpadUp",
    dpadDown: "dpadDown",
    dpadLeft: "dpadLeft",
    dpadRight: "dpadRight",
  };
}

export function defaultConfig(family: ControllerFamily): ControllerConfig {
  return {
    layout: "automatic",
    emulateAs: family === "playstation" ? "playstation" : "xbox",
    vibration: true,
    leftDeadzone: 8,
    rightDeadzone: 8,
    triggerDeadzone: 4,
    invertLook: false,
    swapSticks: false,
    mapping: identityMapping(),
  };
}
