

import type { UserProfile } from "../types/user.types";

const STORAGE_KEY = "user_profile";

export const UserService = {
  getProfile(): UserProfile {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return {
        id: "u1",
        name: "Guest User",
        email: "guest@email.com",
        phone: "",
        role: "rider",
        createdAt: Date.now(),
      };
    }

    return JSON.parse(data);
  },

  updateProfile(profile: UserProfile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return profile;
  },

  updateAvatar(avatar: string) {
    const profile = this.getProfile();
    const updated = { ...profile, avatar };
    return this.updateProfile(updated);
  },
};