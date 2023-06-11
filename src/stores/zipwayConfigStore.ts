import create from "zustand";
import type { ZipwayConfigPayload } from "../../../zipway-server/src/controllers/app.controller";

// interface AppConfig{
//     mapStyles?: any | null;
//     banner?: any | null;
//     userInfo?: {
//     name: string;
//     credit: number;
//     phoneNumber: string
//   } 
// }

interface ZipwayConfigType {
  appConfig:ZipwayConfigPayload;
  setAppConfig: (appConfig: ZipwayConfigType["appConfig"]) => void;
}

export const useZipwayConfigStore = create<ZipwayConfigType>((set) => ({
  appConfig: null,
  setAppConfig(appConfig) {
    return set({ appConfig });
  },
}));
