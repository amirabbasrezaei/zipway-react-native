import {create} from "zustand";

export interface AuthenticateStoreType {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: AuthenticateStoreType["phoneNumber"]) => void;
  maximAuthKey: string | null;
  setMaximAuthKey: (authkey: AuthenticateStoreType["maximAuthKey"]) => void;
  snappAuthKey: string | null;
  setSnappAuthKey: (authkey: AuthenticateStoreType["snappAuthKey"]) => void;
  tapsiAuthKey: string | null;
  setTapsiAuthKey: (authkey: AuthenticateStoreType["snappAuthKey"]) => void;
}

export const useAuthenticateStore = create<AuthenticateStoreType>((set) => ({
  phoneNumber: null,
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  maximAuthKey: null,
  setMaximAuthKey(authkey) {
    return set({ maximAuthKey: authkey });
  },
  snappAuthKey: null,
  setSnappAuthKey(authkey) {
    return set({ snappAuthKey: authkey });
  },
  tapsiAuthKey: null,
  setTapsiAuthKey(authkey) {
    return set({ tapsiAuthKey: authkey });
  },
}));
