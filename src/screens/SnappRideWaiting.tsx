import { View, Text, Pressable, Image, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppStore } from "../stores/appStore";
import {
  useSnappCancelRide,
  useSnappCancelWaiting,
  useSnappEvent,
} from "../ReactQuery/SnappRequestHooks";
import { ActivityIndicator } from "react-native";
import classNames from "classnames";
import { trpc } from "../../utils/trpc";
import { useZipwayConfigStore } from "../stores/zipwayConfigStore";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const SnappRideWaiting = ({ navigation }: Props) => {
  const { activeTrip, setActiveTrip, zipwayRideId } = useAppStore();
  const { mutate: mutateLog } = trpc.app.log.useMutation();

  const { refetchSnappEvent, snappEventData } = useSnappEvent();
  const {
    snappCancelWaitingData,
    isSnappCancelWaitingSuccess,
    mutateSnappCancelWaiting,
    isSnappCancelWaitingLoading,
  } = useSnappCancelWaiting();

  const { mutateSnappCancelRide, isSnappCancelRideSuccess, isSnappCancelRideLoading } =
    useSnappCancelRide();
  const { isLoading: isUpdateRideLoading, mutate: mutateUpdateRide } =
    trpc.ride.updateRide.useMutation();
  const { appConfig } = useZipwayConfigStore();
  useEffect(() => {
    const EventLoopCheck = () => {
      refetchSnappEvent();
      return setTimeout(EventLoopCheck, 10000);
    };
    setTimeout(EventLoopCheck, 10000);
  }, []);

  useEffect(() => {
    mutateUpdateRide({ rideId: zipwayRideId, status: "CANCELLED" });

    setActiveTrip(null);
    navigation.navigate("MapScreen");
  }, [isSnappCancelRideSuccess]);

  useEffect(() => {
    if (isSnappCancelWaitingSuccess) {
      (async () => {
        await mutateUpdateRide({ rideId: zipwayRideId, status: "CANCELLED" });
      })().then(() => {
        console.log("snappCancelWaitingData", snappCancelWaitingData);
        setActiveTrip(null);
        navigation.navigate("MapScreen");
      });
    }

    if (snappEventData?.data?.events[0]?.type == "driver_accepted_ride") {
      (async () => {
        await mutateUpdateRide({
          rideId: zipwayRideId,
          status: "ACCEPTED",
          trip: {
            accepted: true,
            price: snappEventData?.data?.events[0]?.data.ride_info.final_price,
            provider: "SNAPP",
            tripId: activeTrip.tripId,
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
                part_a:
                  snappEventData?.data?.events[0]?.data.driver.plate.part_a,
                part_b:
                  snappEventData?.data?.events[0]?.data.driver.plate.part_b,
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
      })()
        .then(() => {
          setActiveTrip({
            accepted: true,
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
                part_a:
                  snappEventData?.data?.events[0]?.data.driver.plate.part_a,
                part_b:
                  snappEventData?.data?.events[0]?.data.driver.plate.part_b,
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
            price: snappEventData?.data?.events[0]?.data.ride_info.final_price,
          });
          navigation.navigate("MapScreen");
        })
        .catch((error) => {
          mutateSnappCancelRide(activeTrip.tripId);
          mutateLog({ error, message: "SnappRideWaiting" });
        });
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

  return (
    <View className="flex-1 justify-center items-center bg-white px-14 gap-y-10">
      <View
        style={{
          width: appConfig.appInfo.rideWaiting.image.width,
          height: appConfig.appInfo.rideWaiting.image.height,
          borderRadius: appConfig.appInfo.rideWaiting.image.borderRadius,
        }}
      >
        {appConfig?.appInfo?.rideWaiting?.image ? (
          <Image
            style={{
              borderRadius: appConfig.appInfo.rideWaiting.image.borderRadius,
            }}
            source={{
              uri: appConfig.appInfo.rideWaiting.image.url,
              width: appConfig.appInfo.rideWaiting.image.width,
              height: appConfig.appInfo.rideWaiting.image.height,
            }}
          />
        ) : null}
      </View>
      <Text className="font-[IRANSans] text-[13px]">
        {appConfig.appInfo.rideWaiting.rideWaitingText}
      </Text>
      <Pressable
        disabled={isSnappCancelWaitingLoading || isSnappCancelRideLoading}
        className={classNames(
          "  px-4 py-2 rounded-[13px] w-full h-12 items-center justify-center ",
          isSnappCancelWaitingLoading || isSnappCancelRideLoading
            ? "bg-gray-100"
            : "bg-white border border-[#e83b4f]"
        )}
        onPress={() => mutateSnappCancelWaiting(activeTrip.tripId)}
      >
        {isSnappCancelWaitingLoading || isUpdateRideLoading || isSnappCancelRideLoading ? (
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
