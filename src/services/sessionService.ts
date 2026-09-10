import { CLIENT_DEVICE_ID, HOST_DEVICE_ID } from "@/mocks/devices";
import { deviceService } from "@/services/deviceService";
import { gameService } from "@/services/gameService";
import {
  GameUnavailableError,
  HostOfflineError,
  type ConnectionStatus,
  type GameSession,
  type SessionStatus,
} from "@/types/nimble";

let session: GameSession | null = null;
let seq = 1;

function clone(value: GameSession): GameSession {
  return { ...value, provider: { ...value.provider } };
}

export const sessionService = {
  current(): GameSession | null {
    return session ? clone(session) : null;
  },

  canStart(gameId: string) {
    if (!deviceService.isHostOnline()) throw new HostOfflineError();
    const game = gameService.get(gameId);
    if (!game || game.status === "unavailable" || game.status === "updating") {
      throw new GameUnavailableError();
    }
  },

  startGame(
    gameId: string,
    options?: { qualityProfile?: string },
  ): GameSession {
    this.canStart(gameId);
    session = {
      id: `session-${seq++}`,
      gameId,
      hostDeviceId: HOST_DEVICE_ID,
      clientDeviceId: CLIENT_DEVICE_ID,
      status: "preparing",
      startedAt: null,
      qualityProfile: options?.qualityProfile ?? "auto",
      connectionStatus: "excellent",
      provider: { type: "local-pc", deviceId: HOST_DEVICE_ID },
    };
    gameService.setStatus(gameId, "playing");
    return clone(session);
  },

  setStatus(status: SessionStatus): GameSession | null {
    if (!session) return null;
    session.status = status;
    if (status === "running" && !session.startedAt) {
      session.startedAt = new Date().toISOString();
    }
    return clone(session);
  },

  setConnectionStatus(connectionStatus: ConnectionStatus): GameSession | null {
    if (!session) return null;
    session.connectionStatus = connectionStatus;
    return clone(session);
  },

  setQualityProfile(qualityProfile: string): GameSession | null {
    if (!session) return null;
    session.qualityProfile = qualityProfile;
    return clone(session);
  },

  restart(): GameSession | null {
    if (!session) return null;
    session.status = "launching";
    session.startedAt = null;
    session.connectionStatus = "excellent";
    return clone(session);
  },

  end(): GameSession | null {
    if (!session) return null;
    const ended: GameSession = { ...session, status: "ended" };
    const started = session.startedAt
      ? (Date.now() - new Date(session.startedAt).getTime()) / 3600000
      : 0.05;
    gameService.markPlayed(session.gameId, Math.max(0.05, started));
    session = null;
    return ended;
  },
};
