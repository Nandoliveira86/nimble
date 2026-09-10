import {
  GameUnavailableError,
  HostOfflineError,
  type Game,
} from "@/types/nimble";
import { sessionService } from "@/services/sessionService";

export type PlayBlock =
  | { type: "offline" }
  | { type: "unavailable"; message: string }
  | null;

export function checkPlay(game: Game): PlayBlock {
  try {
    sessionService.canStart(game.id);
    return null;
  } catch (error) {
    if (error instanceof HostOfflineError) return { type: "offline" };
    if (error instanceof GameUnavailableError) {
      return {
        type: "unavailable",
        message:
          game.status === "updating"
            ? "This game is still updating on your PC."
            : "This game is not installed on your PC.",
      };
    }
    throw error;
  }
}
