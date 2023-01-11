import { View, Text, Keyboard } from "react-native";
import React from "react";
import { SearchLocationResultType } from "./SearchLocation";
import { useMapStore } from "../../stores/mapStore";

type Props = {
  location: SearchLocationResultType;
  setIsInputActive: (e: any) => void
};

const SearchLocationItem = ({ location, setIsInputActive }: Props) => {
  const {x: longitude, y: latitude} = location.location
  const {setSearchedLocationCoordinate} = useMapStore()

  const pressHandler = () => {
    setSearchedLocationCoordinate([Number(longitude), Number(latitude)]);
    setIsInputActive(false)
    Keyboard.dismiss()
  }
  return (
    <View onTouchEnd={pressHandler} className=" border-b border-slate-100 rounded-sm my-1 flex justify-center  text-center">
      <View>
        <Text  className=" pt-4 px-6 font-[IRANSansMedium] text-gray-800 rounded-md text-[15px] ">{location.title}</Text>
        <Text className="border-slate-100 font-[IRANSansLight] text-gray-600 pb-4 pt-1 px-6 rounded-md text-[14px]">{location.region}</Text>
      </View>
    </View>
  );
};

export default SearchLocationItem;
