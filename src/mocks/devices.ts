import type { Device } from "@/types/nimble";

export const HOST_DEVICE_ID = "bruno-gaming-pc";
export const CLIENT_DEVICE_ID = "living-room-tv";

export const DEVICES: Device[] = [
  {
    id: HOST_DEVICE_ID,
    name: "Bruno's Gaming PC",
    kind: "gaming-pc",
    status: "online",
    isThisDevice: false,
    isHost: true,
    friendlyHardware: "RTX 4070",
    connectionQuality: "excellent",
    lastSeenLabel: "now",
    readyLabel: "Ready to play",
  },
  {
    id: CLIENT_DEVICE_ID,
    name: "Living Room TV",
    kind: "tv",
    status: "online",
    isThisDevice: true,
    isHost: false,
    connectionQuality: "excellent",
    lastSeenLabel: "now",
  },
  {
    id: "bedroom-handheld",
    name: "Bedroom Handheld",
    kind: "handheld",
    status: "offline",
    isThisDevice: false,
    isHost: false,
    lastSeenLabel: "3 days ago",
  },
  {
    id: "studio-notebook",
    name: "Studio Notebook",
    kind: "notebook",
    status: "offline",
    isThisDevice: false,
    isHost: false,
    lastSeenLabel: "Last week",
  },
];
