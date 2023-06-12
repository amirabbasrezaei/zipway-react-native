import { Pressable } from "react-native";
import React from "react";
import { RouteCoordinate } from "../../stores/mapStore";
import { ArrowRightIcon } from "../Svgs";


type Props = {
  routeCoordinate: RouteCoordinate;
  backButtonFn: () => void;
  setRouteCoordinate: (e) => void
};

const MapBackButton = ({ routeCoordinate, backButtonFn }: Props) => {


  return (
    <>
      {routeCoordinate?.origin ? (
        <Pressable
          onPress={() => {
            backButtonFn();
            console.log("dgfg")
          }}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            elevation: 4,
            zIndex: 4
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
