import {
  View,
  Text,
  Pressable,
  BackHandler,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon, SnappTextIcon } from "../Svgs";
import SnappPrice from "./Snapp/SnappPrice";
import TapsiPrice from "./Tapsi/TapsiPrice";

import MaximTrip from "./MaximNewPrice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MotiView } from "moti";
import { useAppStore } from "../../stores/appStore";
import classNames from "classnames";
import RequestServiceButton from "./RequestServiceButton";
type Props = {
  setShowNewTrip: (input: boolean) => void;
  navigation: NativeStackNavigationProp<any, any>;
};

const NewPrices = ({ setShowNewTrip, navigation }: Props) => {
  const { activeTrip, setActiveTrip } = useAppStore();
  const [requestButton, setRequestButton] = useState<string>("");
  useEffect(() => {
    const backAction = () => {
      setShowNewTrip(false);
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
    <>
      <View className=" flex-1 bg-gray-50 relative items">
        <View
          style={{ elevation: 20, zIndex: 20 }}
          className="h-[60px] bg-white  shadow-md shadow-gray-400 justify-center items-center relative"
        >
          <Pressable
            hitSlop={10}
            onPress={() => {
              setShowNewTrip(false);
              setActiveTrip(null);
            }}
            className="absolute right-4"
          >
            <ArrowRightIcon classStyle=" fill-gray-700 w-6 h-6 " />
          </Pressable>
          <Text className="font-[IRANSansMedium] text-gray-700 text-[16px]">
            مقایسه سرویس ها
          </Text>
        </View>
        <ScrollView className="flex flex-col flex-1 ">
          <View className="px-4 fl  ">
            <SnappPrice navigation={navigation} />
            <TapsiPrice
              setRequestButton={setRequestButton}
              navigation={navigation}
            />
            <MaximTrip />
          </View>
        </ScrollView>
        <RequestServiceButton children={requestButton} />
      </View>
    </>
  );
};

export default NewPrices;
NewPrices;
