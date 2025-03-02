import { create } from "zustand";
export const useStore = create((set) => ({
    showGithubLogin: false,
    setShowGithubLogin: (showGithubLogin) => set({ showGithubLogin }),
}));
