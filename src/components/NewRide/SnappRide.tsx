import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppStore } from "../../stores/appStore";
import { Image } from "react-native";
import { Pressable } from "react-native";
import { Linking } from "react-native";
import { PhoneIcon } from "../Svgs";
import { SvgUri } from "react-native-svg";
import { useSnappCancelRide } from "../../ReactQuery/SnappRequestHooks";
import { MotiView } from "moti";
import splitNumber from "../../../utils/splitNumber";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type Props = { navigation: NativeStackNavigationProp<any, any> };

const SnappNewRide = ({ navigation }: Props) => {
  const { activeTrip, setActiveTrip } = useAppStore();
  const [cancelRideProgressBar, setCancelRideProgressBar] = useState<number>(0);
  const [isCancelRideProgressBarActive, setIsCancelRideProgressBarActive] =
    useState<boolean>(false);
  const {
    mutateSnappCancelRide,
    isSnappCancelRideSuccess,
    isSnappCancelRideLoading,
  } = useSnappCancelRide();

  useEffect(() => {
    if (isCancelRideProgressBarActive && cancelRideProgressBar <= 95) {
      setTimeout(() => {
        setCancelRideProgressBar((count) => count + 5);
      }, 30);
    } else if (cancelRideProgressBar > 0 && cancelRideProgressBar < 95) {
      setCancelRideProgressBar(0);
    } else if (cancelRideProgressBar > 95) {
      mutateSnappCancelRide(activeTrip.tripId);
    }
  }, [isCancelRideProgressBarActive, cancelRideProgressBar]);

  useEffect(() => {
    if (isSnappCancelRideSuccess) {
      setActiveTrip({accepted: false});;
    }
  }, [isSnappCancelRideSuccess]);

  console.log(cancelRideProgressBar);
  console.log(isCancelRideProgressBarActive);
  
  return (
    <View className="flex flex-col gap-y-6 flex-1 h-full w-full px-6 pt-2 items-center">
      <View className="w-full flex flex-row items-center justify-between">
        <SvgUri uri={activeTrip.driverInfo.plate_number_url} />
        <Text className="font-[IRANSansMedium] text-gray-600 text-[17px]">
          {activeTrip.driverInfo.vehicle_model}
        </Text>
      </View>
      <View className="w-full flex items-center justify-between flex-row ">
        <Pressable
          className="bg-gray-50 p-2 rounded-full"
          onPress={() =>
            Linking.openURL(`tel:${activeTrip.driverInfo.cellphone}`)
          }
        >
          <PhoneIcon classStyle="w-7 h-7 fill-blue-600 " />
        </Pressable>
        <View className="flex-row items-center  gap-4">
          <Text className="font-[IRANSansLight] text-gray-800 text-[12px]">
            {activeTrip.driverInfo.driver_name}
          </Text>
          <Image
            className="w-14 h-14 rounded-full"
            source={{ uri: activeTrip.driverInfo.image_url }}
          />
        </View>
      </View>
      <View className="w-full flex felx-row items-start justify-center">
        <Text className="font-[IRANSansMedium]">
          {splitNumber(String(activeTrip.price / 10))} تومان
        </Text>
      </View>
      <Pressable
        onPressIn={() => {
          setIsCancelRideProgressBarActive(true);
          
          console.log("sdadf")
        }}
        onPressOut={() => {
          if (cancelRideProgressBar != 100) {
            setIsCancelRideProgressBarActive(false);
          }
        }}
        hitSlop={10}
        className="w-full  flex items-center justify-center absolute bottom-0 h-12"
      >
        <MotiView
          className="bg-red-500 absolute left-0 bottom-0 flex-1 h-full  rounded-[14px]"
          transition={{ type: "timing", duration: 100 }}
          animate={{ width: `${cancelRideProgressBar}%` }}
        />
        {isSnappCancelRideLoading ? (
          <ActivityIndicator size={"small"} color="#fff" />
        ) : (
          <Text className="font-[IRANSansMedium] text-gray-700 text-[11px] ">
            لغو درخواست
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default SnappNewRide;
