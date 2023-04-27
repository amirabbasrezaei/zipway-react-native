import {  Text, Dimensions, Image } from "react-native";
import React from "react";
import { MotiView, MotiText } from "moti";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import splitNumber from "../../../../utils/splitNumber";
import { ClassicCarIcon } from "../../Svgs";

type Props = {
  name: string;
  price?: undefined | number;
  onPress: (input: any) => void;
  isLoading: boolean;
  minMaxPrice?: {
    min: number;
    max: number
  } | undefined;
  photoUrl?: string
};

const SnappPriceItem = ({ name, price, isLoading = true, minMaxPrice, photoUrl, onPress }: Props) => {

  return (
    <MotiView onTouchStart={onPress} className="h-[70] w-full bg-white rounded-[25px] px-4 mb-3 shadow-sm shadow-gray-700 justify-center flex">
      {isLoading || (!price && !minMaxPrice?.min) ? (
        <SkeletonPlaceholder  borderRadius={4} angle={90}>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width={Dimensions.get("screen").width -65}
            height={70}
            backgroundColor={"#000"}
          >
            <SkeletonPlaceholder.Item  width={110} height={30} />
            <SkeletonPlaceholder.Item width={110} height={30} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <MotiView
          from={{ translateY: 10, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "timing", duration: 500 }}
          className="flex flex-row flex-1  justify-between"
        >
          <MotiView className="flex flex-row-reverse gap-1 items-center">
            <Text className="font-[IRANSansMedium] text-[14px] text-gray-700">
              {minMaxPrice?.min ? `${splitNumber(String(minMaxPrice.min))} - ${splitNumber(String(minMaxPrice.max))}` : splitNumber(String(price))}
            </Text>
            <Text className="font-[IRANSansMedium] text-[14px] text-gray-700">تومان</Text>
          </MotiView>
          <MotiView className="flex flex-row items-center">
            <Text className="font-[IRANSansLight] text-[14px]">{name}</Text>
            {photoUrl ? <Image source={{uri: photoUrl}} className="w-10 h-10 ml-2"/> : <ClassicCarIcon classStyle="w-7 h-7 ml-2" />}
          </MotiView>
        </MotiView>
      )}
    </MotiView>
  );
};

export default SnappPriceItem;
