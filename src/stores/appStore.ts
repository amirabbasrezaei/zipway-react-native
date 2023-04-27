import create from "zustand";

interface AppStoreType {
  activeTrip: {
    provider: string;
    type: string;
    accepted: boolean;
  } | null;
  setActiveTrip: (input: AppStoreType["activeTrip"]) => void;
}

export const useAppStore = create<AppStoreType>((set) => ({
  activeTrip: null,
  setActiveTrip(input) {
    set({ activeTrip: input });
  },
}));
