import { USER } from "@/mocks/user";
import type { User } from "@/types/nimble";

export const authService = {
  currentUser(): User {
    return { ...USER };
  },

  async signIn(): Promise<User> {
    return { ...USER };
  },

  async createAccount(): Promise<User> {
    return { ...USER };
  },

  signOut() {
    return null;
  },
};
