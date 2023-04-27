import { View, Text, Pressable } from "react-native";
import React from "react";
import { UserLocationIcon } from "../Svgs";
import { RouteCoordinate } from "../../stores/mapStore";

type Props = {
  moveToUserLocation: () => void;
  routeCoordinate: RouteCoordinate;
};

const UserLocation = ({ moveToUserLocation, routeCoordinate }: Props) => {
  return (
    <>
      {!routeCoordinate?.destination ? <Pressable
        style={{ elevation: 2 }}
        onPress={moveToUserLocation}
        className="bg-white rounded-full justify-center items-center w-10 h-10 absolute right-4 bottom-[190]"
      >
        <UserLocationIcon classStyle="w-5 h-5 fill-gray-500" />
      </Pressable> : null}
    </>
  );
};

export default UserLocation;
