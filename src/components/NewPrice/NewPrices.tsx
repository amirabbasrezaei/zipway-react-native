import {
  View,
  Text,
  Pressable,
  BackHandler,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { ArrowRightIcon, SnappTextIcon } from "../Svgs";
import SnappPrice from "./Snapp/SnappPrice";
import TapsiPrice from "./TapsiNewPrice";

import MaximTrip from "./MaximNewPrice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type Props = {
  setShowNewTrip: (input: boolean) => void;
  navigation: NativeStackNavigationProp<any, any>;

};

const NewPrices = ({ setShowNewTrip, navigation }: Props) => {
  useEffect(() => {
    const backAction = () => {
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
    <>
      <View className=" flex-1 bg-gray-50 ">
        <View
          style={{ elevation: 20, zIndex: 20 }}
          className="h-[60px] bg-white  shadow-md shadow-gray-400 justify-center items-center relative"
        >
          <Pressable
            hitSlop={10}
            onPress={() => {
              setShowNewTrip(false);
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
            <SnappPrice navigation={navigation}/>
            <TapsiPrice />
            <MaximTrip />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default NewPrices;
NewPrices;
