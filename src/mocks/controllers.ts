import { defaultConfig, type GameController, type NearbyController } from "@/types/controller";

export const PAIRED_CONTROLLERS: GameController[] = [
  {
    id: "pad-xbox-1",
    name: "Xbox Wireless Controller",
    family: "xbox",
    bluetoothMode: "xbox-wireless",
    status: "connected",
    playerSlot: 1,
    batteryLabel: "High",
    config: defaultConfig("xbox"),
    lastInputAt: null,
    lastInputLabel: null,
    paired: true,
  },
];

export const NEARBY_CONTROLLERS: NearbyController[] = [
  {
    id: "pad-ps-nearby",
    name: "DualSense Wireless Controller",
    family: "playstation",
    bluetoothMode: "playstation",
    hint: "PlayStation · Hold the create and PS buttons",
  },
  {
    id: "pad-bt2-nearby",
    name: "Classic Gamepad",
    family: "generic",
    bluetoothMode: "classic-2",
    hint: "Bluetooth 2.0 · Hold the pair button",
  },
  {
    id: "pad-bt3-nearby",
    name: "Arena Fight Pad",
    family: "generic",
    bluetoothMode: "classic-3",
    hint: "Bluetooth 3.0 · Hold the pair button",
  },
];
