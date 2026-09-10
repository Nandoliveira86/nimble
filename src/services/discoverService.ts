import { DISCOVER_GAMES } from "@/mocks/discover";
import type {
  DiscoverGame,
  SourceTip,
  StorefrontId,
} from "@/types/discover";

let catalog: DiscoverGame[] = DISCOVER_GAMES.map((game) => ({
  ...game,
  offers: game.offers.map((offer) => ({ ...offer })),
  tips: game.tips.map((tip) => ({ ...tip })),
}));

const myRatings = new Map<string, number>();
let tipSeq = 20;

function clone(game: DiscoverGame): DiscoverGame {
  return {
    ...game,
    offers: game.offers.map((offer) => ({ ...offer })),
    tips: game.tips.map((tip) => ({ ...tip })),
  };
}

export const discoverService = {
  list(): DiscoverGame[] {
    return catalog.map(clone);
  },

  get(id: string): DiscoverGame | undefined {
    const found = catalog.find((item) => item.id === id);
    return found ? clone(found) : undefined;
  },

  search(query: string, storefront?: StorefrontId | "all"): DiscoverGame[] {
    const q = query.trim().toLowerCase();
    return catalog
      .filter((game) => {
        const matchesQuery =
          !q ||
          game.name.toLowerCase().includes(q) ||
          game.genre.toLowerCase().includes(q) ||
          game.offers.some((offer) => offer.storefront.includes(q));
        const matchesStore =
          !storefront || storefront === "all"
            ? true
            : game.offers.some((offer) => offer.storefront === storefront);
        return matchesQuery && matchesStore;
      })
      .map(clone)
      .sort((a, b) => b.ratingAverage - a.ratingAverage);
  },

  myRating(gameId: string): number | null {
    return myRatings.get(gameId) ?? null;
  },

  rate(gameId: string, stars: number): DiscoverGame | undefined {
    const game = catalog.find((item) => item.id === gameId);
    if (!game) return undefined;
    const previous = myRatings.get(gameId);
    const next = Math.min(5, Math.max(1, Math.round(stars)));
    if (previous) {
      const total = game.ratingAverage * game.ratingCount - previous + next;
      game.ratingAverage = Math.round((total / game.ratingCount) * 10) / 10;
    } else {
      const total = game.ratingAverage * game.ratingCount + next;
      game.ratingCount += 1;
      game.ratingAverage = Math.round((total / game.ratingCount) * 10) / 10;
    }
    myRatings.set(gameId, next);
    return clone(game);
  },

  addTip(
    gameId: string,
    input: { author: string; storefront: StorefrontId; body: string },
  ): SourceTip {
    const game = catalog.find((item) => item.id === gameId);
    if (!game) throw new Error("Game not found.");
    const body = input.body.trim();
    if (body.length < 8) throw new Error("Say a little more about where you got it.");
    const tip: SourceTip = {
      id: `tip-${tipSeq++}`,
      gameId,
      author: input.author,
      storefront: input.storefront,
      body,
      createdAt: new Date().toISOString(),
    };
    game.tips = [tip, ...game.tips];
    return { ...tip };
  },
};
