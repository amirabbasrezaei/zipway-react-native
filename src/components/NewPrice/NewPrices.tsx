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
    <View className=" flex-1 bg-gray-50 relative">
      <View className="h-[60px] bg-white  shadow-md shadow-gray-400 justify-center items-center relative">
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
      <ScrollView
        style={{ elevation: 10, zIndex: 10 }}
        className="flex-1 w-full h-full "
      >
        <View className="px-4 h-full  ">
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
        </View>
        {/* {Array.from({length: 20}, (e, index) => index).map((e) => <View  key={e} className="h-14 w-full bg-black mt-10"></View>)} */}
      </ScrollView>
      <RequestServiceButton navigation={} requestButton={requestButton} />
    </View>
  );
};

export default NewPrices;
NewPrices;
