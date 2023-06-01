import { View, Text, Pressable, BackHandler, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "../Svgs";
import SnappPrice from "./Snapp/SnappPrice";
import TapsiPrice from "./Tapsi/TapsiPrice";

import MaximTrip from "./MaximNewPrice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppStore } from "../../stores/appStore";
import RequestServiceButton from "./RequestServiceButton";
import { SafeAreaView } from "moti";
type Props = {
  setShowNewTrip: (input: boolean) => void;
  navigation: NativeStackNavigationProp<any, any>;
};

const NewPrices = ({ setShowNewTrip, navigation }: Props) => {
  const { setActiveTrip } = useAppStore();
  const [requestButton, setRequestButton] = useState<RequestButton>(null);
  useEffect(() => {
    const backAction = () => {
      setRequestButton(null);
      setActiveTrip(null);
      setShowNewTrip(false);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView className=" w-full h-full flex-1  ">
        {/* <View className="px-4 h-full  ">
            <SnappPrice
              requestButton={requestButton}
              navigation={navigation}
              setRequestButton={setRequestButton}
            />
            <TapsiPrice
              requestButton={requestButton}
              setRequestButton={setRequestButton}
              navigation={navigation}
            />
            <MaximTrip />
          </View> */}
        {Array.from({ length: 20 }, (e, index) => index).map((e) => (
          <View key={e} className="h-14 w-full bg-gray-100 mt-10"></View>
        ))}
      </ScrollView>
  );
};

export default NewPrices;
NewPrices;
