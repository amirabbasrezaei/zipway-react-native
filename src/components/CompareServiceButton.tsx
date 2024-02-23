import {
  View,
  Text,
  Pressable,
  Vibration,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { ArrowLeftIcon } from "./Svgs";
import { AnimatePresence, MotiView } from "moti";
import { useAppStore } from "../stores/appStore";
import { useMapStore } from "../stores/mapStore";
import { trpc } from "../../utils/trpc";

type Props = {};

const CompareServiceButton = ({}: Props) => {
  const { showNewTrip, setShowNewTrip, setZipwayRideId } = useAppStore();
  const { routeCoordinate } = useMapStore();
  const {
    mutate: mutateRequestRide,
    data: RequestRideData,
    isLoading: isLoadingRequestRide,
    isSuccess,
    error,
  } = trpc.ride.requestRide.useMutation();

  useEffect(() => {
    if (RequestRideData?.result == "OK") {
      setZipwayRideId(RequestRideData.data.rideId)
      setShowNewTrip(true);
      console.log(RequestRideData);
    }
  }, [RequestRideData]);
  return (
    <AnimatePresence>
      {routeCoordinate?.destination &&
      routeCoordinate?.origin &&
      !showNewTrip ? (
        <MotiView
          style={{ zIndex: 6 }}
          from={{ opacity: 0, scale: 0.7, bottom: 0 }}
          animate={{ opacity: 1, scale: 1, bottom: 30 }}
          exit={{ opacity: 0, scale: 0.7, bottom: 0 }}
          transition={{ type: "timing", duration: 200 }}
          className="h-14 w-full bg-transparent  absolute justify-center items-center"
        >
          <Pressable
            onPress={() => {
              mutateRequestRide({
                destinationCoordinates: [
                  
                   {longitude: Number(routeCoordinate.destination[0]), latitude: Number(routeCoordinate.destination[1])}
                  
                ],
                destinationDescription: routeCoordinate.destinationTitle,
                originCoordinate: {longitude: routeCoordinate.origin[0], latitude: routeCoordinate.origin[1]},
                originDescription: routeCoordinate.destinationTitle,
              });
              Vibration.vibrate([50, 50]);
            }}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,

              zIndex: 2,
            }}
            className="h-full rounded-[25px] w-[300] bg-white flex flex-row items-center justify-between"
          >
            <View className="h-full w-[20%]  items-center justify-center">
              <ArrowLeftIcon classStyle="fill-[#027de8] w-8 h-8" />
            </View>
            <MotiView
              transition={{ duration: 100, type: "timing" }}
              from={{ width: "100%" }}
              animate={{ width: "80%", backgroundColor: isLoadingRequestRide ?  "#a1a1a1" : "#027de8"}}

              className=" absolute right-0  h-full rounded-[25px] items-center justify-center"
            >
              {isLoadingRequestRide ? (
                <ActivityIndicator color={"#fff"} size={24} />
              ) : (
                <Text className="text-center font-[IRANSansMedium] text-[18] text-white">
                  مقایسه سرویس ها
                </Text>
              )}
            </MotiView>
          </Pressable>
        </MotiView>
      ) : null}
    </AnimatePresence>
  );
};

export default CompareServiceButton;
