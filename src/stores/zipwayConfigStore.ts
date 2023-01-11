import create from "zustand";

interface AppConfig{
    mapStyles?: any | null;
    banner?: any | null;
}

interface ZipwayConfigType {
  appConfig: AppConfig | null;
  setAppConfig: (appConfig: ZipwayConfigType["appConfig"]) => void;
}

export const useZipwayConfigStore = create<ZipwayConfigType>((set) => ({
  appConfig: null,
  setAppConfig(appConfig) {
    return set({ appConfig });
  },
}));
