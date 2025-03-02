import { create } from "zustand";

interface Store {
  showGithubLogin: boolean;
  setShowGithubLogin: (showGithubLogin: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  showGithubLogin: false,
  setShowGithubLogin: (showGithubLogin: boolean) => set({ showGithubLogin }),
}));
