import create from "zustand";

interface ThemeStoreType {
  needFocus: boolean;
  setNeedFocus: (input: ThemeStoreType["needFocus"]) => void;
}

export const useThemeStore = create<ThemeStoreType>((set) => ({
  needFocus: false,
  setNeedFocus: (input) => set({ needFocus: input }),
}));
