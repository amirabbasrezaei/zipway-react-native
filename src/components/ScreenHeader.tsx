import { View, Text, Pressable, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { ArrowRightIcon } from "./Svgs";

type Props = {
  name: string;
  isNonNavigationBackButton?: boolean;
  backFn: (input?: any) => void;
};

const ScreenHeader = ({
  backFn,
  name,
  isNonNavigationBackButton = false,
}: Props) => {
  useEffect(() => {
    if (isNonNavigationBackButton) {
      const backAction = () => {
        backFn();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, []);
  return (
    <View className="h-[60px] bg-white mb-6 shadow-md shadow-gray-400 justify-center items-center relative">
      <Pressable
        hitSlop={10}
        onPress={backFn}
        className="absolute right-4"
      >
        <ArrowRightIcon classStyle=" fill-gray-700 w-6 h-6 " />
      </Pressable>
      <Text className="font-[IRANSansMedium] text-gray-700 text-[16px]">
        {name}
      </Text>
    </View>
  );
};

export default ScreenHeader;
