import { View, Text, Image, Pressable } from "react-native";
import React from "react";

import { useMapStore } from "../../stores/mapStore";
import { useSnappNewPrice } from "../../ReactQuery/Queries";
import { ArrowRightIcon, SnappTextIcon } from "../Svgs";
import SnappTrip from "./SnappTrip";
import TapsiTrip from "./TapsiTrip";
import { useThemeStore } from "../../stores/themeStore";
import { Motion } from "@legendapp/motion";
import MaximTrip from "./MaximTrip";
type Props = {
  setShowNewTrip: (input: boolean) => void;
};

const NewTrip = ({ setShowNewTrip }: Props) => {
  const { setRouteCoordinate } = useMapStore();
  const { needFocus } = useThemeStore();

  return (
    <>
      <View className=" flex-1 bg-gray-50">
        <View className="h-[60px] bg-white mb-6 shadow-md shadow-gray-400 justify-center items-center relative">
          <Pressable
            hitSlop={10}
            onPress={() => {
              setShowNewTrip(false);
              // setRouteCoordinate({ destination: null, destinationTitle: null });
            }}
            className="absolute right-4"
          >
            <ArrowRightIcon classStyle=" fill-gray-700 w-6 h-6 " />
          </Pressable>
          <Text className="font-[IRANSansMedium] text-gray-700 text-[16px]">
            مقایسه سرویس ها
          </Text>
        </View>
        <View className="px-4 ">
          <View className="bg-gray-100 h-12 w-full rounded-lg justify-center items-center mb-5">
            <Text className="font-[IRANSansMedium] text-gray-500 text-xs">درخواست سرویس به زودی اضافه میشود</Text>
          </View>
          <SnappTrip />
          <TapsiTrip />
          <MaximTrip />
        </View>
      </View>
    </>
  );
};

export default NewTrip;
NewTrip;
