

import { useEffect, useState } from "react";
import type { UserProfile } from "../types/user.types";
import { UserService } from "../services/user.service"; 

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(UserService.getProfile());
  }, []);

  const updateProfile = (data: UserProfile) => {
    const updated = UserService.updateProfile(data);
    setUser(updated);
  };

  const updateAvatar = (avatar: string) => {
    const updated = UserService.updateAvatar(avatar);
    setUser(updated);
  };

  return {
    user,
    updateProfile,
    updateAvatar,
  };
};