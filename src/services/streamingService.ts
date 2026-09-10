import { STREAMING_PROFILES } from "@/mocks/user";
import type {
  DataUsage,
  DecoderMode,
  DisplayResolution,
  FrameRateMode,
  HdrMode,
  StreamingProfile,
} from "@/types/nimble";

interface StreamingSettings {
  profileId: string;
  preferLowLatency: boolean;
  dataUsage: DataUsage;
  resolution: DisplayResolution;
  hdr: HdrMode;
  frameRate: FrameRateMode;
  decoder: DecoderMode;
}

let settings: StreamingSettings = {
  profileId: "auto",
  preferLowLatency: true,
  dataUsage: "standard",
  resolution: "automatic",
  hdr: "automatic",
  frameRate: "automatic",
  decoder: "automatic",
};

export const streamingService = {
  profiles(): StreamingProfile[] {
    return STREAMING_PROFILES.map((profile) => ({ ...profile }));
  },

  settings(): StreamingSettings {
    return { ...settings };
  },

  setProfile(profileId: string) {
    settings = { ...settings, profileId };
    return this.settings();
  },

  update(patch: Partial<StreamingSettings>) {
    settings = { ...settings, ...patch };
    return this.settings();
  },
};
