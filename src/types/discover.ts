export type StorefrontId =
  | "steam"
  | "xbox"
  | "epic"
  | "gog"
  | "ea"
  | "ubisoft"
  | "battlenet"
  | "amazon";

export type OfferKind = "buy" | "included" | "sale";

export interface StoreOffer {
  storefront: StorefrontId;
  kind: OfferKind;
  priceLabel: string;
  note?: string;
}

export interface SourceTip {
  id: string;
  gameId: string;
  author: string;
  storefront: StorefrontId;
  body: string;
  createdAt: string;
}

export interface DiscoverGame {
  id: string;
  name: string;
  cover: string;
  heroImage: string;
  description: string;
  genre: string;
  year: number;
  artClass: string;
  inLibrary: boolean;
  ratingAverage: number;
  ratingCount: number;
  offers: StoreOffer[];
  tips: SourceTip[];
}

export const STOREFRONTS: {
  id: StorefrontId;
  name: string;
  short: string;
}[] = [
  { id: "steam", name: "Steam", short: "Steam" },
  { id: "xbox", name: "Xbox for PC", short: "Xbox" },
  { id: "epic", name: "Epic Games Store", short: "Epic" },
  { id: "gog", name: "GOG", short: "GOG" },
  { id: "ea", name: "EA App", short: "EA" },
  { id: "ubisoft", name: "Ubisoft Connect", short: "Ubisoft" },
  { id: "battlenet", name: "Battle.net", short: "Battle.net" },
  { id: "amazon", name: "Amazon Games", short: "Amazon" },
];

export function storefrontName(id: StorefrontId) {
  return STOREFRONTS.find((item) => item.id === id)?.name ?? id;
}
