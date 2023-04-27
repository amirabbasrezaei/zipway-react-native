import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAppStore } from "../../stores/appStore";
import SnappNewRide from "./SnappNewRide";
import TapsiNewRide from "./TapsiNewRide";
import MaximNewRide from "./MaximNewRide";
import { BackHandler } from "react-native";

type Props = {};

const NewRide = ({}: Props) => {
  const { activeTrip, setActiveTrip } = useAppStore();
  useEffect(() => {
    const backAction = () => {
      setActiveTrip(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View className="p-4 flex-1 ">
      {activeTrip === "snapp" ? (
        <SnappNewRide />
      ) : activeTrip === "tapsi" ? (
        <TapsiNewRide />
      ) : activeTrip === "maxim" ? (
        <MaximNewRide />
      ) : null}
    </View>
  );
};

export default NewRide;
