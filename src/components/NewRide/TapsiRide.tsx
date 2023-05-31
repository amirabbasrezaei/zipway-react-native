import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Pressable,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNewSnappRide } from "../../ReactQuery/SnappRequestHooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppStore } from "../../stores/appStore";
import { PhoneIcon } from "../Svgs";
import { useTapsiCancelRide, useTapsiRideWaitingStatus } from "../../ReactQuery/tapsiRequestHooks";
import splitNumber from "../../../utils/splitNumber";
import { MotiView } from "moti";
import { SvgUri } from "react-native-svg";

type Props = { navigation: NativeStackNavigationProp<any, any> };

const TapsiNewRide = ({ navigation }: Props) => {
  const { activeTrip, setActiveTrip } = useAppStore();
  const [isCancelRideProgressBarActive, setIsCancelRideProgressBarActive] =
    useState<boolean>(false);
    const { isTapsiRideWaitingStatusLoading, tapsiRideWaitingStatusData } =
    useTapsiRideWaitingStatus(activeTrip.tripId);
  const [cancelRideProgressBar, setCancelRideProgressBar] = useState<number>(0);
  const {
    mutateTapsiCancelRide,
    tapsiCancelRideData,
    isTapsiCancelRideLoading,
  } = useTapsiCancelRide();

  const tapsiCancelRideBody = {
    cancellationReason: {
      text: "سفیر دور است",
      code: "DRIVER_WAS_FAR_AWAY",
    },
  };

  useEffect(() => {
    if (isCancelRideProgressBarActive && cancelRideProgressBar <= 95) {
      setTimeout(() => {
        setCancelRideProgressBar((count) => count + 5);
      }, 30);
    } else if (cancelRideProgressBar > 0 && cancelRideProgressBar < 95) {
      setCancelRideProgressBar(0);
    } else if (cancelRideProgressBar > 95) {
      mutateTapsiCancelRide({
        rideId: activeTrip.tripId,
        body: tapsiCancelRideBody,
      });
    }
  }, [isCancelRideProgressBarActive, cancelRideProgressBar]);

  useEffect(() => {
    if (tapsiCancelRideData?.result == "OK") {
      setActiveTrip({ accepted: false });
    }
    console.log(tapsiRideWaitingStatusData)
  }, [tapsiCancelRideData, tapsiRideWaitingStatusData]);
  return (
    <View className="flex flex-col gap-y-6 flex-1 h-full w-full px-6 pt-2 items-center">
      <View className="w-full flex flex-row items-center justify-between">
        {activeTrip.driverInfo?.plate_number_url ? (
          <SvgUri uri={activeTrip.driverInfo.plate_number_url} />
        ) : (
          <View className="border border-cyan-600 rounded-lg px-3 py-2 flex flex-row gap-[2]">
            <Text key={"firstPart"} className="font-[IRANSans] text-gray-600">
              {activeTrip.driverInfo.plate.part_a}
            </Text>
            <Text className="font-[IRANSans] text-gray-600" key={"letter"}>
              {activeTrip.driverInfo.plate.character}
            </Text>
            <Text className="font-[IRANSans] text-gray-600" key={"secondPart"}>
              {activeTrip.driverInfo.plate.part_a}
            </Text>
            <Text className="font-[IRANSans] text-gray-600" key={"province-ID"}>
              {activeTrip.driverInfo.plate.iran_id}
            </Text>
          </View>
        )}
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
        disabled={isTapsiCancelRideLoading}
        onPressIn={() => {
          setIsCancelRideProgressBarActive(true);

          console.log("sdadf");
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
          className="bg-red-400 absolute left-0 bottom-0 flex-1 h-full  rounded-[14px]"
          transition={{ type: "timing", duration: 100 }}
          animate={{ width: `${cancelRideProgressBar}%` }}
        />
        {isTapsiCancelRideLoading ? (
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

export default TapsiNewRide;
