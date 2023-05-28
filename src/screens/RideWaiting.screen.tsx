import { View, Text, Pressable, Image, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { snappWaitingGifRequest } from "../requests/snappAPIs";
import { useAppStore } from "../stores/appStore";
import {
  useSnappCancelWaiting,
  useSnappEvent,
} from "../ReactQuery/SnappRequestHooks";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const RideWaiting = ({ navigation }: Props) => {
  const [gif, setGif] = useState();
  const { activeTrip, setActiveTrip } = useAppStore();

  const {
    refetchSnappEvent,
    snappEventData,
    isSnappEventSuccess,
    isSnappEventFetched,
  } = useSnappEvent();
  const {
    snappCancelWaitingData,
    isSnappCancelWaitingSuccess,
    mutateSnappCancelWaiting,
  } = useSnappCancelWaiting();

  useEffect(() => {
    if (activeTrip.provider === "snapp") {
      snappWaitingGifRequest()
        .then((res) => {
          setGif(res["data"]["waiting_gif"]);
        })
        .catch(console.error);
    }
    const EventLoopCheck = () => {
      refetchSnappEvent();
      return setTimeout(EventLoopCheck, 10000);
    };
    setTimeout(EventLoopCheck, 10000);
  }, []);

  useEffect(() => {
    if (isSnappCancelWaitingSuccess) {
      console.log("snappCancelWaitingData", snappCancelWaitingData);
      setActiveTrip(null);
      navigation.navigate("MapScreen");
    }
    snappEventData?.data?.events &&
      console.log(
        "inside useEffect snappEventData type:",
        snappEventData?.data?.events[0]?.type
      );
    if (snappEventData?.data?.events[0]?.type === "driver_accepted_ride") {
      setActiveTrip({
        accepted: true,
        driverInfo: {
          cellphone: snappEventData?.data?.events[0]?.data.driver.cellphone,
          driver_name: snappEventData?.data?.events[0]?.data.driver.driver_name,
          image_url: snappEventData?.data?.events[0]?.data.driver.image_url,
          plate: {
            character:
              snappEventData?.data?.events[0]?.data.driver.plate.character,
            iran_id: snappEventData?.data?.events[0]?.data.driver.plate.iran_id,
            part_a: snappEventData?.data?.events[0]?.data.driver.plate.part_a,
            part_b: snappEventData?.data?.events[0]?.data.driver.plate.part_b,
          },
          driver_location_info: {
            lat: snappEventData?.data?.events[0]?.data.driver_location_info.lat,
            lng: snappEventData?.data?.events[0]?.data.driver_location_info.lng,
          },
          plate_number_url:
            snappEventData?.data?.events[0]?.data.driver.plate_number_url,
          vehicle_color:
            snappEventData?.data?.events[0]?.data.driver.vehicle_color,
          vehicle_model:
            snappEventData?.data?.events[0]?.data.driver.vehicle_model,
        },
        price: snappEventData?.data?.events[0]?.data.ride_info.final_price,
      });
      navigation.navigate("MapScreen");
    }
  }, [isSnappCancelWaitingSuccess, snappEventData]);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // console.log("activeTrip", activeTrip);
  snappEventData?.data?.events &&
    console.log("snappEventData", snappEventData?.data?.events[0]);
  // console.log("snappEventData", snappEventData);
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="h-[300] w-[350]">
        {gif ? (
          <Image className="h-[250] w-[350]" source={{ uri: gif }} />
        ) : null}
      </View>
      <Pressable
        className="border border-blue-500 px-4 py-2 rounded-md"
        onPress={() => mutateSnappCancelWaiting(activeTrip.tripId)}
      >
        <Text className="font-[IRANSansBold] text-blue-500">لغو درخواست</Text>
      </Pressable>
    </View>
  );
};

export default RideWaiting;
