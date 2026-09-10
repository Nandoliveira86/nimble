import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/authService";
import { controllerService } from "@/services/controllerService";
import { deviceService } from "@/services/deviceService";
import { discoverService } from "@/services/discoverService";
import { gameService } from "@/services/gameService";
import { sessionService } from "@/services/sessionService";
import { streamingService } from "@/services/streamingService";
import type {
  ControllerConfig,
  FaceButton,
  ForwardedInput,
  GameController,
  NearbyController,
  PlayerSlot,
} from "@/types/controller";
import type { DiscoverGame, StorefrontId } from "@/types/discover";
import type {
  ConnectionStatus,
  DataUsage,
  DecoderMode,
  Device,
  DisplayResolution,
  FrameRateMode,
  Game,
  GameSession,
  HdrMode,
  SessionStatus,
  StreamingProfile,
  User,
} from "@/types/nimble";

interface NimbleState {
  hydrated: boolean;
  isAuthenticated: boolean;
  hasPairedHost: boolean;
  user: User | null;
  games: Game[];
  devices: Device[];
  session: GameSession | null;
  hostOnline: boolean;
  qualityProfileId: string;
  profiles: StreamingProfile[];
  preferLowLatency: boolean;
  dataUsage: DataUsage;
  displayResolution: DisplayResolution;
  hdr: HdrMode;
  frameRate: FrameRateMode;
  decoder: DecoderMode;
  volume: number;
  vibration: boolean;
  connectionStatus: ConnectionStatus;
  favoriteIds: string[];
  controllers: GameController[];
  lastForward: ForwardedInput | null;
  isPremium: boolean;
  discover: DiscoverGame[];
  myRatings: Record<string, number>;
}

interface NimbleActions {
  markHydrated: () => void;
  refreshCatalog: () => void;
  signIn: () => void;
  createAccount: () => void;
  signOut: () => void;
  completePairing: () => void;
  toggleFavorite: (gameId: string) => void;
  setHostOnline: (online: boolean) => void;
  wakeHost: () => Promise<void>;
  sleepHost: () => void;
  startSession: (gameId: string) => GameSession;
  setSessionStatus: (status: SessionStatus) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setQualityProfile: (profileId: string) => void;
  restartSession: () => void;
  endSession: () => void;
  setPreferLowLatency: (value: boolean) => void;
  setDataUsage: (value: DataUsage) => void;
  setDisplayResolution: (value: DisplayResolution) => void;
  setHdr: (value: HdrMode) => void;
  setFrameRate: (value: FrameRateMode) => void;
  setDecoder: (value: DecoderMode) => void;
  setVolume: (value: number) => void;
  setVibration: (value: boolean) => void;
  refreshControllers: () => void;
  pairController: (nearby: NearbyController) => Promise<GameController>;
  unpairController: (id: string) => void;
  assignControllerSlot: (id: string, slot: PlayerSlot) => void;
  updateControllerConfig: (id: string, patch: Partial<ControllerConfig>) => void;
  remapController: (id: string, from: FaceButton, to: FaceButton) => void;
  resetControllerMapping: (id: string) => void;
  testControllerInput: (id: string, physical?: FaceButton) => void;
  setPremium: (value: boolean) => void;
  rateDiscoverGame: (gameId: string, stars: number) => void;
  recommendSource: (
    gameId: string,
    input: { storefront: StorefrontId; body: string },
  ) => void;
}

export type NimbleStore = NimbleState & NimbleActions;

const streaming = streamingService.settings();

function withFavorites(ids: string[]): Game[] {
  return gameService.setFavorites(ids);
}

function syncControllers() {
  return {
    controllers: controllerService.list(),
    lastForward: controllerService.lastForwarded(),
  };
}

export const useNimble = create<NimbleStore>()(
  persist(
    (set, get) => ({
      hydrated: false,
      isAuthenticated: false,
      hasPairedHost: false,
      user: null,
      games: gameService.list(),
      devices: deviceService.list(),
      session: null,
      hostOnline: deviceService.isHostOnline(),
      qualityProfileId: streaming.profileId,
      profiles: streamingService.profiles(),
      preferLowLatency: streaming.preferLowLatency,
      dataUsage: streaming.dataUsage,
      displayResolution: streaming.resolution,
      hdr: streaming.hdr,
      frameRate: streaming.frameRate,
      decoder: streaming.decoder,
      volume: 80,
      vibration: true,
      connectionStatus: "excellent",
      favoriteIds: gameService
        .list()
        .filter((game) => game.favorite)
        .map((game) => game.id),
      controllers: controllerService.list(),
      lastForward: null,
      isPremium: false,
      discover: discoverService.list(),
      myRatings: {},

      markHydrated: () => set({ hydrated: true }),

      refreshCatalog: () =>
        set({
          games: withFavorites(get().favoriteIds),
          devices: deviceService.list(),
          session: sessionService.current(),
          hostOnline: deviceService.isHostOnline(),
          ...syncControllers(),
        }),

      signIn: () =>
        set({
          isAuthenticated: true,
          user: authService.currentUser(),
        }),

      createAccount: () =>
        set({
          isAuthenticated: true,
          user: authService.currentUser(),
        }),

      signOut: () => {
        if (get().session) sessionService.end();
        controllerService.stopForwarding();
        set({
          isAuthenticated: false,
          user: null,
          session: null,
          ...syncControllers(),
        });
      },

      completePairing: () => set({ hasPairedHost: true }),

      toggleFavorite: (gameId) => {
        const next = gameService.toggleFavorite(gameId);
        const favoriteIds = next?.favorite
          ? Array.from(new Set([...get().favoriteIds, gameId]))
          : get().favoriteIds.filter((id) => id !== gameId);
        set({
          favoriteIds,
          games: withFavorites(favoriteIds),
        });
      },

      setHostOnline: (online) => {
        deviceService.setHostOnline(online);
        set({
          hostOnline: online,
          devices: deviceService.list(),
        });
      },

      wakeHost: async () => {
        await deviceService.wakeHost();
        set({
          hostOnline: true,
          devices: deviceService.list(),
        });
      },

      sleepHost: () => {
        deviceService.sleepHost();
        set({
          hostOnline: false,
          devices: deviceService.list(),
        });
      },

      startSession: (gameId) => {
        const session = sessionService.startGame(gameId, {
          qualityProfile: get().qualityProfileId,
        });
        controllerService.startForwarding();
        set({
          session,
          games: withFavorites(get().favoriteIds),
          connectionStatus: "excellent",
          ...syncControllers(),
        });
        return session;
      },

      setSessionStatus: (status) => {
        const session = sessionService.setStatus(status);
        set({ session });
      },

      setConnectionStatus: (status) => {
        const session = sessionService.setConnectionStatus(status);
        set({ session, connectionStatus: status });
      },

      setQualityProfile: (profileId) => {
        streamingService.setProfile(profileId);
        const session = sessionService.setQualityProfile(profileId);
        set({ qualityProfileId: profileId, session });
      },

      restartSession: () => {
        const session = sessionService.restart();
        set({ session, connectionStatus: "excellent" });
      },

      endSession: () => {
        sessionService.end();
        controllerService.stopForwarding();
        set({
          session: null,
          games: withFavorites(get().favoriteIds),
          connectionStatus: "excellent",
          ...syncControllers(),
        });
      },

      setPreferLowLatency: (value) => {
        streamingService.update({ preferLowLatency: value });
        set({ preferLowLatency: value });
      },
      setDataUsage: (value) => {
        streamingService.update({ dataUsage: value });
        set({ dataUsage: value });
      },
      setDisplayResolution: (value) => {
        streamingService.update({ resolution: value });
        set({ displayResolution: value });
      },
      setHdr: (value) => {
        streamingService.update({ hdr: value });
        set({ hdr: value });
      },
      setFrameRate: (value) => {
        streamingService.update({ frameRate: value });
        set({ frameRate: value });
      },
      setDecoder: (value) => {
        streamingService.update({ decoder: value });
        set({ decoder: value });
      },
      setVolume: (value) => set({ volume: value }),
      setVibration: (value) => {
        set({ vibration: value });
        const primary = get().controllers.find((item) => item.playerSlot === 1);
        if (primary) {
          controllerService.updateConfig(primary.id, { vibration: value });
          set(syncControllers());
        }
      },

      refreshControllers: () => set(syncControllers()),

      pairController: async (nearby) => {
        const paired = await controllerService.pair(nearby);
        set(syncControllers());
        return paired;
      },

      unpairController: (id) => {
        controllerService.unpair(id);
        set(syncControllers());
      },

      assignControllerSlot: (id, slot) => {
        controllerService.assignSlot(id, slot);
        set(syncControllers());
      },

      updateControllerConfig: (id, patch) => {
        controllerService.updateConfig(id, patch);
        set(syncControllers());
      },

      remapController: (id, from, to) => {
        controllerService.remap(id, from, to);
        set(syncControllers());
      },

      resetControllerMapping: (id) => {
        controllerService.resetMapping(id);
        set(syncControllers());
      },

      testControllerInput: (id, physical = "faceDown") => {
        controllerService.testPress(id, physical);
        set(syncControllers());
      },

      setPremium: (value) => set({ isPremium: value }),

      rateDiscoverGame: (gameId, stars) => {
        discoverService.rate(gameId, stars);
        set({
          discover: discoverService.list(),
          myRatings: { ...get().myRatings, [gameId]: stars },
        });
      },

      recommendSource: (gameId, input) => {
        if (!get().isPremium) {
          throw new Error("Premium members can recommend sources.");
        }
        const user = get().user;
        discoverService.addTip(gameId, {
          author: user?.name ?? "You",
          storefront: input.storefront,
          body: input.body,
        });
        set({ discover: discoverService.list() });
      },
    }),
    {
      name: "nimble.v1",
      skipHydration: true,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        hasPairedHost: state.hasPairedHost,
        hostOnline: state.hostOnline,
        qualityProfileId: state.qualityProfileId,
        preferLowLatency: state.preferLowLatency,
        dataUsage: state.dataUsage,
        displayResolution: state.displayResolution,
        hdr: state.hdr,
        frameRate: state.frameRate,
        decoder: state.decoder,
        volume: state.volume,
        vibration: state.vibration,
        favoriteIds: state.favoriteIds,
        isPremium: state.isPremium,
        myRatings: state.myRatings,
      }),
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<NimbleState>;
        if (typeof saved.hostOnline === "boolean") {
          deviceService.setHostOnline(saved.hostOnline);
        }
        const favoriteIds = saved.favoriteIds ?? current.favoriteIds;
        const myRatings = saved.myRatings ?? current.myRatings;
        Object.entries(myRatings).forEach(([id, stars]) => {
          discoverService.rate(id, stars);
        });
        return {
          ...current,
          ...saved,
          favoriteIds,
          games: withFavorites(favoriteIds),
          devices: deviceService.list(),
          hostOnline: deviceService.isHostOnline(),
          user: saved.isAuthenticated ? authService.currentUser() : null,
          session: null,
          controllers: controllerService.list(),
          lastForward: null,
          discover: discoverService.list(),
          isPremium: saved.isPremium ?? current.isPremium,
          myRatings: saved.myRatings ?? current.myRatings,
        };
      },
    },
  ),
);

export function useHostDevice() {
  return useNimble((state) => state.devices.find((device) => device.isHost));
}
