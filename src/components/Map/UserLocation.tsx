import { View, Text, Pressable, Linking } from "react-native";
import React, { useEffect } from "react";
import { UserLocationIcon } from "../Svgs";
import { RouteCoordinate } from "../../stores/mapStore";
import * as Location from "expo-location";

type Props = {
  moveToUserLocation: () => void;
  routeCoordinate: RouteCoordinate;
};

const UserLocation = ({ moveToUserLocation, routeCoordinate }: Props) => {
  function userLocationFunction() {
    (async () => {
      const {status} = await Location.getForegroundPermissionsAsync()
      console.log(status)
      if (status == "granted") {
        moveToUserLocation();
        return;
      }
      if (status == "denied") {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status == "granted"){
          moveToUserLocation();
        }
        return;
      }
    })();
  }

  useEffect(() => {
    userLocationFunction()
  }, [Location.getCurrentPositionAsync])

  return (
    <>
      {!routeCoordinate?.destination || !routeCoordinate?.origin ? (
        <Pressable
          style={{ elevation: 4, zIndex: 4 }}
          onPress={() => userLocationFunction()}
          className="bg-white rounded-full justify-center items-center w-10 h-10 absolute right-4 bottom-[190]"
        >
          <UserLocationIcon classStyle="w-5 h-5 fill-gray-500" />
        </Pressable>
      ) : null}
    </>
  );
};

export default UserLocation;
