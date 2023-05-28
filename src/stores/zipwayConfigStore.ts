import create from "zustand";

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
  appConfig:any;
  setAppConfig: (appConfig: ZipwayConfigType["appConfig"]) => void;
}

export const useZipwayConfigStore = create<ZipwayConfigType>((set) => ({
  appConfig: null,
  setAppConfig(appConfig) {
    return set({ appConfig });
  },
}));
