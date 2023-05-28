import create from "zustand";

type DriverType = {
  plate: {
    character: string;
    iran_id: number;
    part_a: number;
    part_b: number;
  };
  cellphone: string;
  driver_name: string;
  image_url: string;
  plate_number_url: string;
  vehicle_color: string;
  vehicle_model: string;
  driver_location_info: {
    lat: number;
    lng: number;
  };
  
};

interface AppStoreType {
  activeTrip: {
    provider?: string;
    type?: string;
    accepted?: boolean;
    tripId?: string;
    driverInfo?: DriverType;
    price?: number
  } | null;
  setActiveTrip: (input: AppStoreType["activeTrip"]) => void;
}

export const useAppStore = create<AppStoreType>((set) => ({
  activeTrip: null,
  setActiveTrip(input) {
    set(({ activeTrip }) => ({ activeTrip: { ...activeTrip, ...input } }));
  },
}));
// {
  // accepted: true,
  // provider: "snapp",
  // driverInfo: {
  //   cellphone: "+989303183091",
  //   driver_name: "میثم حقدوست وفا",
  //   image_url: "https://statics.snapp.ir/driver/yWoMBgOKlVZq7DqGpdNL-1.jpg",
  //   plate: {
  //     character: "ع",
  //     iran_id: 53,
  //     part_a: 18,
  //     part_b: 413,
  //     type: 1,
  //   },
  //   plate_number_url:
  //     "https://statics.snapp.ir/plates/v2/eyJjaGFyYWN0ZXIiOjEwLCJpcmFuX2lkIjo1MywicGFydF9hIjoxOCwicGFydF9iIjo0MTMsInR5cGUiOjF9.svg",
  //   vehicle_color: "F7D74E",
  //   vehicle_model: "سمند تاکسی زرد",
  //   driver_location_info: {
  //     lat: 35.6503798,
  //     lng: 51.3488862,
  //   },
  // },
  // price: 80000
// }