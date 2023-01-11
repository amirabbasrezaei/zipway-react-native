import create from "zustand";

export interface AuthenticateStoreType {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: AuthenticateStoreType["phoneNumber"]) => void;
  maximAuthKey: string | null;
  setMaximAuthKey: (authkey: AuthenticateStoreType["maximAuthKey"]) => void;
}

export const useAuthenticateStore = create<AuthenticateStoreType>((set) => ({
  phoneNumber: null,
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  maximAuthKey: null,
  setMaximAuthKey(authkey) {
    return set({ maximAuthKey: authkey });
  },
}));
