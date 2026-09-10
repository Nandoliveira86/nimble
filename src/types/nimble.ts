export type GameStatus =
  | "installed"
  | "ready"
  | "playing"
  | "updating"
  | "unavailable";

export type GamePlatform = "Steam" | "Epic" | "GOG" | "Nimble";

export interface Game {
  id: string;
  name: string;
  cover: string;
  heroImage: string;
  description: string;
  platform: GamePlatform;
  installed: boolean;
  favorite: boolean;
  lastPlayed: string | null;
  hoursPlayed: number;
  status: GameStatus;
  genre: string;
  year: number;
  installSize: string;
  artClass: string;
}

export type DeviceKind =
  | "gaming-pc"
  | "tv"
  | "handheld"
  | "notebook"
  | "tablet"
  | "future";

export interface Device {
  id: string;
  name: string;
  kind: DeviceKind;
  status: "online" | "offline";
  isThisDevice: boolean;
  isHost: boolean;
  friendlyHardware?: string;
  connectionQuality?: "excellent" | "good" | "poor";
  lastSeenLabel: string;
  readyLabel?: string;
}

export type SessionStatus =
  | "idle"
  | "preparing"
  | "connecting"
  | "launching"
  | "running"
  | "suspended"
  | "ending"
  | "ended"
  | "error";

export type ConnectionStatus =
  | "excellent"
  | "good"
  | "unstable"
  | "offline";

export type ComputeProvider =
  | { type: "local-pc"; deviceId: string }
  | { type: "cloud-gpu"; id: string };

export interface GameSession {
  id: string;
  gameId: string;
  hostDeviceId: string;
  clientDeviceId: string;
  status: SessionStatus;
  startedAt: string | null;
  qualityProfile: string;
  connectionStatus: ConnectionStatus;
  provider: ComputeProvider;
}

export interface StreamingProfile {
  id: string;
  name: string;
  description: string;
  isAutomatic?: boolean;
}

export interface User {
  id: string;
  name: string;
  handle: string;
}

export type DataUsage = "standard" | "save";
export type DisplayResolution = "automatic" | "1080p" | "1440p" | "4k";
export type HdrMode = "automatic" | "on" | "off";
export type DecoderMode = "automatic" | "hardware" | "software";
export type FrameRateMode = "automatic" | "60" | "120";

export class HostOfflineError extends Error {
  readonly code = "HOST_OFFLINE" as const;
  constructor() {
    super("Your gaming PC is offline.");
    this.name = "HostOfflineError";
  }
}

export class GameUnavailableError extends Error {
  readonly code = "GAME_UNAVAILABLE" as const;
  constructor() {
    super("This game is not ready on your PC.");
    this.name = "GameUnavailableError";
  }
}
