import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { EllipsisIcon, SettingsIcon, SnappTextIcon } from "../Svgs";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useSnappNewPrice } from "../../ReactQuery/Queries";
import { useMapStore } from "../../stores/mapStore";
import ItemOptions from "../ItemOptions";

import SnappLoginModal from "../SnappAuth/SnappLoginModal";
import { FocusContext, UseFocusContextArgs } from "../FocusComponent";
import TapsiLoginModal from "../TapsiAuth/TapsiLoginModal";

type Props = {};

const SnappTrip = (props: Props) => {
  const { setFocusState } =
    useContext<UseFocusContextArgs>(FocusContext);

  const { routeCoordinate } = useMapStore();
  const NewPricePostData = {
    hurry_price: "0",
    package_delivery: false,
    round_trip: false,
    points: [
      {
        lat: routeCoordinate.origin[1],
        lng: routeCoordinate.origin[0],
      },
      {
        lat: routeCoordinate.destination[1],
        lng: routeCoordinate.destination[0],
      },
    ],
    service_types: [1, 2],
    tag: "1",
  };

  const {
    newSnappPriceLoading,
    newSnappPriceData,
    isFetchedSnappNewPrice,
    isSnappNewPriceSucceed,
  } = useSnappNewPrice(NewPricePostData);

  return (
    <View className="flex-row relative mb-5 h-32  bg-white rounded-[15px] shadow-sm shadow-gray-700 items-center justify-between px-6">
      <View className="flex-row items-center justify-center">
        {!isSnappNewPriceSucceed ? (
          <SkeletonPlaceholder speed={1000}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 100, height: 30, borderRadius: 5 }} />
            </View>
          </SkeletonPlaceholder>
        ) : (
          <View className="flex-row items-center justify-center">
            <Text className="text-sm font-[IRANSansBold] text-[12px] text-gray-600 mr-1 top-[1]">
              تومان
            </Text>
            <Text className="text-gray-600 font-[IRANSansBold] text-[17px]">
              {newSnappPriceData.data.prices[0].final / 10}
            </Text>
          </View>
        )}
      </View>
      <View className="absolute top-4 left-3">
        <ItemOptions exitFocusScreenAfterPress={false} icon={<EllipsisIcon classStyle="w-5 h-5 fill-blue-500" />}>
          <Pressable
            onPress={(e) => {
              setFocusState({
                focusComonent: <SnappLoginModal />,
                exitAfterPress: false,
              });
            }}
            className="flex-1 w-full flex flex-row justify-center items-center gap-2 py-2"
          >
            <Text className="text-[7]  text-gray-500 font-[IRANSansMedium] w-fit">
              ورود
            </Text>
            <View>
              <SettingsIcon classStyle="fill-gray-500 w-4 h-4 " />
            </View>
          </Pressable>
        </ItemOptions>
      </View>
      <View className="">
        <SnappTextIcon classStyle="w-24 h-10 " />
      </View>
    </View>
  );
};

export default SnappTrip;
