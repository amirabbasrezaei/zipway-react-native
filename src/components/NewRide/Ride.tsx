import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAppStore } from "../../stores/appStore";
import SnappNewRide from "./SnappRide";
import TapsiNewRide from "./TapsiRide";
import MaximNewRide from "./MaximRide";
import { BackHandler } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const NewRide = ({ navigation }: Props) => {
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
      {activeTrip.provider === "snapp" ? (
        <SnappNewRide navigation={navigation} />
      ) : activeTrip.provider === "tapsi" ? (
        <TapsiNewRide />
      ) : activeTrip.provider === "maxim" ? (
        <MaximNewRide />
      ) : null}
    </View>
  );
};

export default NewRide;
