import type { StreamingProfile, User } from "@/types/nimble";

export const USER: User = {
  id: "user-bruno",
  name: "Bruno",
  handle: "bruno",
};

export const STREAMING_PROFILES: StreamingProfile[] = [
  {
    id: "auto",
    name: "Automatic",
    description: "Nimble chooses the best picture for this connection.",
    isAutomatic: true,
  },
  {
    id: "recommended",
    name: "Recommended",
    description: "A balanced picture with a responsive feel.",
  },
  {
    id: "data-saver",
    name: "Data Saver",
    description: "Uses less data while you play.",
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "Steady picture on most home connections.",
  },
  {
    id: "maximum",
    name: "Maximum Quality",
    description: "The highest picture quality available.",
  },
];
