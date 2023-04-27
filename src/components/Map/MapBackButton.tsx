import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { RouteCoordinate } from "../../stores/mapStore";
import { ArrowRightIcon } from "../Svgs";
import { useAppStore } from "../../stores/appStore";
import { BackHandler } from "react-native";

type Props = {
  routeCoordinate: RouteCoordinate;
  backButtonFn: () => void;
};

const MapBackButton = ({ routeCoordinate, backButtonFn }: Props) => {
  const { activeTrip, setActiveTrip } = useAppStore();

  return (
    <>
      {routeCoordinate?.origin ? (
        <Pressable
          onPress={() => {
            activeTrip ? setActiveTrip(null) : backButtonFn();
          }}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
          }}
          className="rounded-full bg-white absolute top-4 right-4 shadow-md  h-12 w-12 flex  justify-center"
        >
          <ArrowRightIcon classStyle="h-6 h-6 fill-gray-900" />
        </Pressable>
      ) : null}
    </>
  );
};

export default MapBackButton;
