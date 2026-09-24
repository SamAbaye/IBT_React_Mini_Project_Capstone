// store/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(

    (set) => ({
        user: null,
        isLoggedIn: false,

        login: (userData) => set({ user: userData, isLoggedIn: true }),

        logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage", // key in localStorage
    },
);

export default useAuthStore;
