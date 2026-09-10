import { daysAgo } from "@/lib/utils";
import { GAMES } from "@/mocks/games";
import type { DiscoverGame, SourceTip, StoreOffer } from "@/types/discover";

const OFFERS: Record<string, StoreOffer[]> = {
  "neon-harbor": [
    { storefront: "steam", kind: "buy", priceLabel: "$59.99" },
    { storefront: "xbox", kind: "included", priceLabel: "Included", note: "PC Game Pass" },
    { storefront: "epic", kind: "sale", priceLabel: "$29.99", note: "On sale" },
  ],
  "ashen-crown": [
    { storefront: "steam", kind: "buy", priceLabel: "$69.99" },
    { storefront: "gog", kind: "buy", priceLabel: "$69.99" },
    { storefront: "xbox", kind: "buy", priceLabel: "$69.99" },
  ],
  "drift-protocol": [
    { storefront: "epic", kind: "buy", priceLabel: "$49.99" },
    { storefront: "steam", kind: "buy", priceLabel: "$49.99" },
  ],
  "ember-vale": [
    { storefront: "steam", kind: "sale", priceLabel: "$24.99", note: "On sale" },
    { storefront: "gog", kind: "buy", priceLabel: "$39.99" },
  ],
  "void-runner": [
    { storefront: "steam", kind: "buy", priceLabel: "$29.99" },
    { storefront: "gog", kind: "buy", priceLabel: "$29.99" },
  ],
  "iron-hymn": [
    { storefront: "epic", kind: "buy", priceLabel: "$59.99" },
    { storefront: "xbox", kind: "included", priceLabel: "Included", note: "PC Game Pass" },
    { storefront: "steam", kind: "buy", priceLabel: "$59.99" },
  ],
  saltwind: [
    { storefront: "gog", kind: "buy", priceLabel: "$19.99" },
    { storefront: "steam", kind: "buy", priceLabel: "$19.99" },
  ],
  "glass-kingdom": [
    { storefront: "steam", kind: "buy", priceLabel: "$14.99" },
    { storefront: "epic", kind: "buy", priceLabel: "$14.99" },
  ],
  "night-circuit": [
    { storefront: "steam", kind: "buy", priceLabel: "$39.99" },
    { storefront: "ea", kind: "included", priceLabel: "Included", note: "EA Play" },
  ],
  "pale-atlas": [
    { storefront: "steam", kind: "buy", priceLabel: "$49.99" },
    { storefront: "xbox", kind: "buy", priceLabel: "$49.99" },
  ],
  "red-mesa": [
    { storefront: "epic", kind: "sale", priceLabel: "$9.99", note: "On sale" },
    { storefront: "steam", kind: "buy", priceLabel: "$19.99" },
  ],
  whisperwood: [
    { storefront: "gog", kind: "buy", priceLabel: "$24.99" },
    { storefront: "steam", kind: "buy", priceLabel: "$24.99" },
  ],
  skyforge: [
    { storefront: "steam", kind: "buy", priceLabel: "$59.99" },
    { storefront: "ubisoft", kind: "buy", priceLabel: "$59.99" },
  ],
  "lumen-echoes": [
    { storefront: "steam", kind: "buy", priceLabel: "$69.99" },
    { storefront: "battlenet", kind: "buy", priceLabel: "$69.99" },
    { storefront: "xbox", kind: "included", priceLabel: "Included", note: "PC Game Pass" },
  ],
  northwake: [
    { storefront: "steam", kind: "buy", priceLabel: "$44.99" },
    { storefront: "gog", kind: "buy", priceLabel: "$44.99" },
  ],
  "hollow-circuit": [
    { storefront: "xbox", kind: "included", priceLabel: "Included", note: "PC Game Pass" },
    { storefront: "steam", kind: "buy", priceLabel: "$39.99" },
  ],
  "amber-protocol": [
    { storefront: "ea", kind: "buy", priceLabel: "$69.99" },
    { storefront: "steam", kind: "sale", priceLabel: "$34.99", note: "On sale" },
  ],
};

const TIPS: SourceTip[] = [
  {
    id: "tip-1",
    gameId: "neon-harbor",
    author: "Maya",
    storefront: "xbox",
    body: "I play it through PC Game Pass. Installs on the gaming PC, then Nimble just finds it.",
    createdAt: daysAgo(2),
  },
  {
    id: "tip-2",
    gameId: "neon-harbor",
    author: "Kenji",
    storefront: "epic",
    body: "Epic has it half off this week. Bought there, launched from my library the same night.",
    createdAt: daysAgo(5),
  },
  {
    id: "tip-3",
    gameId: "ashen-crown",
    author: "Sofia",
    storefront: "steam",
    body: "Steam is the one I use. Cloud saves just work when I stream to the TV.",
    createdAt: daysAgo(8),
  },
  {
    id: "tip-4",
    gameId: "iron-hymn",
    author: "Maya",
    storefront: "xbox",
    body: "Included with Game Pass on PC. No extra purchase if you already subscribe.",
    createdAt: daysAgo(1),
  },
  {
    id: "tip-5",
    gameId: "ember-vale",
    author: "Diego",
    storefront: "steam",
    body: "Caught the Steam sale. Still the best place to pick it up.",
    createdAt: daysAgo(3),
  },
  {
    id: "tip-6",
    gameId: "hollow-circuit",
    author: "Sofia",
    storefront: "xbox",
    body: "Not in my Nimble library yet — grabbed it on Game Pass this morning.",
    createdAt: daysAgo(1),
  },
];

const RATINGS: Record<string, { average: number; count: number }> = {
  "neon-harbor": { average: 4.8, count: 1284 },
  "ashen-crown": { average: 4.6, count: 2109 },
  "drift-protocol": { average: 4.3, count: 876 },
  "ember-vale": { average: 4.7, count: 1540 },
  "void-runner": { average: 4.1, count: 412 },
  "iron-hymn": { average: 4.9, count: 3012 },
  saltwind: { average: 4.4, count: 633 },
  "glass-kingdom": { average: 4.2, count: 290 },
  "night-circuit": { average: 4.0, count: 518 },
  "pale-atlas": { average: 4.5, count: 771 },
  "red-mesa": { average: 3.9, count: 204 },
  whisperwood: { average: 4.6, count: 955 },
  skyforge: { average: 4.3, count: 1104 },
  "lumen-echoes": { average: 4.7, count: 1888 },
  northwake: { average: 4.4, count: 326 },
  "hollow-circuit": { average: 4.2, count: 190 },
  "amber-protocol": { average: 4.1, count: 87 },
};

const EXTRA: DiscoverGame[] = [
  {
    id: "northwake",
    name: "Northwake",
    cover: "",
    heroImage: "",
    description: "A winter campaign across frozen rails. Keep the last train moving.",
    genre: "Strategy",
    year: 2026,
    artClass: "art-northwake",
    inLibrary: false,
    ratingAverage: 4.4,
    ratingCount: 326,
    offers: OFFERS.northwake,
    tips: TIPS.filter((tip) => tip.gameId === "northwake"),
  },
  {
    id: "hollow-circuit",
    name: "Hollow Circuit",
    cover: "",
    heroImage: "",
    description: "A dead metro, a living signal. Trace the line before the city forgets you.",
    genre: "Action",
    year: 2025,
    artClass: "art-hollow-circuit",
    inLibrary: false,
    ratingAverage: 4.2,
    ratingCount: 190,
    offers: OFFERS["hollow-circuit"],
    tips: TIPS.filter((tip) => tip.gameId === "hollow-circuit"),
  },
  {
    id: "amber-protocol",
    name: "Amber Protocol",
    cover: "",
    heroImage: "",
    description: "Classified skies and a jet that should not exist. Break the protocol, or become it.",
    genre: "Sim",
    year: 2026,
    artClass: "art-amber-protocol",
    inLibrary: false,
    ratingAverage: 4.1,
    ratingCount: 87,
    offers: OFFERS["amber-protocol"],
    tips: TIPS.filter((tip) => tip.gameId === "amber-protocol"),
  },
];

export const DISCOVER_GAMES: DiscoverGame[] = [
  ...GAMES.map((game) => ({
    id: game.id,
    name: game.name,
    cover: game.cover,
    heroImage: game.heroImage,
    description: game.description,
    genre: game.genre,
    year: game.year,
    artClass: game.artClass,
    inLibrary: true,
    ratingAverage: RATINGS[game.id]?.average ?? 4,
    ratingCount: RATINGS[game.id]?.count ?? 40,
    offers: OFFERS[game.id] ?? [{ storefront: "steam" as const, kind: "buy" as const, priceLabel: "$59.99" }],
    tips: TIPS.filter((tip) => tip.gameId === game.id),
  })),
  ...EXTRA,
];
