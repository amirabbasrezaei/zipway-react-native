import MapboxGL from "@rnmapbox/maps";
import { LocationObject } from "expo-location";
import { create } from "zustand";

export interface RouteCoordinate {
  origin?: number[] | null;
  originTitle?: string | null;
  destination?: number[] | null;
  destinationTitle?: string | null;
}

interface MapStoreType {
  searchLocationInput: string;
  setSearchLocationInput: (input: string) => void;
  searchLocationResults: any;
  setSearchLocationsResult: (input: any) => void;
  cameraLocation: number[];
  setCameraLocation: (e: MapStoreType["cameraLocation"]) => void;
  routeCoordinate: RouteCoordinate | null;
  setRouteCoordinate: (input: RouteCoordinate) => void;
  searchedLocationCoordinate: number[];
  setSearchedLocationCoordinate: (
    input: MapStoreType["cameraLocation"]
  ) => void;
  userLocation: MapboxGL.Location | null;
  setUserLocation: (input: MapStoreType["userLocation"]) => void;
  isCameraChanging: boolean;
  setIsCameraChanging: (e: MapStoreType["isCameraChanging"]) => void;
}

export const useMapStore = create<MapStoreType>((set) => ({
  searchLocationInput: "",
  setSearchLocationInput: (input) => set({ searchLocationInput: input }),
  searchLocationResults: [],
  setSearchLocationsResult: (input) => set({ searchLocationResults: input }),
  cameraLocation: [51.35471199999998, 35.65329299999999],
  setCameraLocation: (e) => set({ cameraLocation: e }),
  routeCoordinate: null,
  setRouteCoordinate: (input: RouteCoordinate) =>
    set(({ routeCoordinate }) => ({
      routeCoordinate: { ...routeCoordinate, ...input },
    })),
  searchedLocationCoordinate: [],
  setSearchedLocationCoordinate: (input) =>
    set({ searchedLocationCoordinate: input }),
  userLocation: null,
  setUserLocation: (userLocation) => set({ userLocation }),
  isCameraChanging: false,
  setIsCameraChanging(e) {
    set({ isCameraChanging: e });
  },
}));
