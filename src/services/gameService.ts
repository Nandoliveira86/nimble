import { GAMES, RECOMMENDED_IDS } from "@/mocks/games";
import type { Game, GameStatus } from "@/types/nimble";

let games: Game[] = GAMES.map((game) => ({ ...game }));

function clone(game: Game): Game {
  return { ...game };
}

export const gameService = {
  list(): Game[] {
    return games.map(clone);
  },

  get(id: string): Game | undefined {
    const game = games.find((item) => item.id === id);
    return game ? clone(game) : undefined;
  },

  setFavorites(ids: string[]) {
    const set = new Set(ids);
    games = games.map((game) => ({
      ...game,
      favorite: set.has(game.id),
    }));
    return this.list();
  },

  toggleFavorite(id: string): Game | undefined {
    const game = games.find((item) => item.id === id);
    if (!game) return undefined;
    game.favorite = !game.favorite;
    return clone(game);
  },

  setStatus(id: string, status: GameStatus): Game | undefined {
    const game = games.find((item) => item.id === id);
    if (!game) return undefined;
    game.status = status;
    if (status === "playing") game.installed = true;
    return clone(game);
  },

  markPlayed(id: string, extraHours: number): Game | undefined {
    const game = games.find((item) => item.id === id);
    if (!game) return undefined;
    game.lastPlayed = new Date().toISOString();
    game.hoursPlayed = Math.round((game.hoursPlayed + extraHours) * 10) / 10;
    if (game.status === "playing") game.status = "ready";
    return clone(game);
  },

  sections(list: Game[] = games) {
    const byLastPlayed = [...list]
      .filter((game) => game.lastPlayed)
      .sort(
        (a, b) =>
          new Date(b.lastPlayed ?? 0).getTime() -
          new Date(a.lastPlayed ?? 0).getTime(),
      );

    const recommended = RECOMMENDED_IDS.map((id) =>
      list.find((game) => game.id === id),
    ).filter((game): game is Game => Boolean(game));

    return {
      continuePlaying: byLastPlayed.slice(0, 3),
      recentlyPlayed: byLastPlayed.slice(0, 8),
      favorites: list.filter((game) => game.favorite),
      installed: list.filter((game) => game.installed),
      recommended,
      library: [...list].sort((a, b) => a.name.localeCompare(b.name)),
    };
  },

  search(query: string, list: Game[] = games): Game[] {
    const q = query.trim().toLowerCase();
    if (!q) return list.map(clone);
    return list
      .filter((game) => {
        const haystack = `${game.name} ${game.genre} ${game.platform}`.toLowerCase();
        return haystack.includes(q);
      })
      .map(clone);
  },
};
