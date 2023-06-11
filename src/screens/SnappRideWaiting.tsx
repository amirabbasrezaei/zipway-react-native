import { View, Text, Pressable, Image, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { snappWaitingGifRequest } from "../requests/snappAPIs";
import { useAppStore } from "../stores/appStore";
import {
  useSnappCancelWaiting,
  useSnappEvent,
} from "../ReactQuery/SnappRequestHooks";
import { ActivityIndicator } from "react-native";
import classNames from "classnames";
import { trpc } from "../../utils/trpc";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const SnappRideWaiting = ({ navigation }: Props) => {
  const [gif, setGif] = useState();
  const { activeTrip, setActiveTrip, zipwayRideId } = useAppStore();

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
    isSnappCancelWaitingLoading,
  } = useSnappCancelWaiting();

  const {
    isLoading: isUpdateRideLoading,
    mutate: mutateUpdateRide,
    data: updateRideData,
  } = trpc.ride.updateRide.useMutation();

  useEffect(() => {
    if (activeTrip?.provider === "snapp") {
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
      mutateUpdateRide({ rideId: zipwayRideId, status: "CANCELLED" });
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
      mutateUpdateRide({
        rideId: zipwayRideId,
        status: "ACCEPTED",
        trip: {
          accepted: true,
          price: snappEventData?.data?.events[0]?.data.ride_info.final_price,
          provider: "SNAPP",
          tripId:activeTrip.tripId,
          type: activeTrip.type,
          driverInfo: {
            cellphone: snappEventData?.data?.events[0]?.data.driver.cellphone,
            driver_name:
              snappEventData?.data?.events[0]?.data.driver.driver_name,
            image_url: snappEventData?.data?.events[0]?.data.driver.image_url,
            plate: {
              character:
                snappEventData?.data?.events[0]?.data.driver.plate.character,
              iran_id:
                snappEventData?.data?.events[0]?.data.driver.plate.iran_id,
              part_a: snappEventData?.data?.events[0]?.data.driver.plate.part_a,
              part_b: snappEventData?.data?.events[0]?.data.driver.plate.part_b,
            },
            driver_location_info: {
              lat: snappEventData?.data?.events[0]?.data.driver_location_info
                .lat,
              lng: snappEventData?.data?.events[0]?.data.driver_location_info
                .lng,
            },
            plate_number_url:
              snappEventData?.data?.events[0]?.data.driver.plate_number_url,
            vehicle_color:
              snappEventData?.data?.events[0]?.data.driver.vehicle_color,
            vehicle_model:
              snappEventData?.data?.events[0]?.data.driver.vehicle_model,
          },
        },
      });
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
    <View className="flex-1 justify-center items-center bg-white px-14">
      <View className="h-[300] w-[350]">
        {gif ? (
          <Image className="h-[250] w-[350]" source={{ uri: gif }} />
        ) : null}
      </View>
      <Pressable
        disabled={isSnappCancelWaitingLoading}
        className={classNames(
          "  px-4 py-2 rounded-[13px] w-full h-12 items-center justify-center ",
          isSnappCancelWaitingLoading
            ? "bg-gray-100"
            : "bg-white border border-[#e83b4f]"
        )}
        onPress={() => mutateSnappCancelWaiting(activeTrip.tripId)}
      >
        {isSnappCancelWaitingLoading ? (
          <ActivityIndicator size={"small"} color={"#5e5e5e"} />
        ) : (
          <Text className="text-[#e83b4f]  font-[IRANSansMedium] text-[13px]">
            لغو درخواست
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default SnappRideWaiting;
