import { View, Text } from "react-native";
import React from "react";
import { LocationMarkerIcon } from "../Svgs";
import { RouteCoordinate } from "../../stores/mapStore";

type Props = {
  routeCoordinate: RouteCoordinate;
};

const MapMarker = ({ routeCoordinate }: Props) => {
  return (
    <>
      {!(routeCoordinate?.origin && routeCoordinate?.destination) ? (
        <View
          className={
            "w-[55] h-[54] absolute  flex flex-col   justify-center items-center"
          }
        >
          <View className=" h-full relative bottom-5">
            <LocationMarkerIcon classStyle="w-[40] h-[40]  z-10 fill-black" />
            <View className="  h-[17] flex bottom-[3]  justify-center items-center">
              {/* <View className="border-r-2 w-0 h-full rounded-b-lg   right-[0.3]"></View> */}
              <View className="bg-gray-800 w-[4] h-[4] rounded-full mt-1" />
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default MapMarker;
