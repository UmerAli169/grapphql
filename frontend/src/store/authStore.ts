import { changePassword, updateContactInfo } from "@/services/internal";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState { 
  user: any | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void; 
  logout: () => void;
  updatePassword: (data: {
    oldPassword: string;
    newPassword: string;
  }) => Promise<void>;
  updateContactInfo: (data: {
    firstName: string;
    lastName: string; 
    email: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updatePassword: async (data) => {
        await changePassword(data);
      },
      updateContactInfo: async (data) => {
        const updatedUser = await updateContactInfo(data);
        set({ user: updatedUser, isAuthenticated: !!updatedUser });
      },
    }),
    { name: "auth-store" }
  )
);
