import { LocationObject } from "expo-location";
import create from "zustand";

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
  userLocation: LocationObject | null;
  setUserLocation: (input: MapStoreType["userLocation"]) => void;
  // showNewTrip
}

export const useMapStore = create<MapStoreType>((set) => ({
  searchLocationInput: "",
  setSearchLocationInput: (input) => set({ searchLocationInput: input }),
  searchLocationResults: [],
  setSearchLocationsResult: (input) => set({ searchLocationResults: input }),
  cameraLocation: [],
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
}));
