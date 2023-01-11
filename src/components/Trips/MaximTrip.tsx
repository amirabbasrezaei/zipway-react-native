import { View, Text, Image, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ItemOptions from "../ItemOptions";
import { EllipsisIcon, SettingsIcon } from "../Svgs";
import { useNavigation } from "@react-navigation/native";
import { FocusContext, UseFocusContextArgs } from "../FocusComponent";
import { useTapsiNewPrice } from "../../ReactQuery/tapsiRequestHooks";
import { useMapStore } from "../../stores/mapStore";
import MaximLoginModal from "../MaximAuth/MaximLoginModal";
import { useMaximPrice } from "../../ReactQuery/maximRequestHooks";

type Props = {};

const MaximTrip = (props: Props) => {
  const navigation = useNavigation();
  const { focusState, setFocusState } =
    useContext<UseFocusContextArgs>(FocusContext);
  const { routeCoordinate } = useMapStore();

  const {
    data: maximPriceData,
    isLoading: isMaximPriceLoading,
    mutate: mutateMaximPrice,
    isSuccess: isMaximPriceSuccess,
  } = useMaximPrice();

  useEffect(() => {
    mutateMaximPrice()
  }, []);

  return (
    <View className="flex-row relative mb-5 h-32  bg-white rounded-[15px] shadow-sm shadow-gray-700 items-center justify-between px-6">
      <View className="absolute top-4 left-3">
        <ItemOptions
          exitFocusScreenAfterPress={false}
          icon={<EllipsisIcon classStyle="w-5 h-5 fill-blue-500" />}
        >
          <Pressable
            onPress={() => {
              setFocusState({
                focusComonent: <MaximLoginModal />,
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

      <View className="flex-row items-center justify-center">
        {!isMaximPriceSuccess ? (
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
              {maximPriceData.Price}
            </Text>
          </View>
        )}
      </View>
      <View>
        <Image
          className="w-[100px] h-[26px] "
          source={require("../../../assets/maxim-logo.png")}
        />
      </View>
    </View>
  );
};

export default MaximTrip;
