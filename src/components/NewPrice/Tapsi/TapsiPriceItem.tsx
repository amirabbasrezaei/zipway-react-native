import {
  Text,
  Dimensions,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { MotiView, MotiText } from "moti";
import splitNumber from "../../../../utils/splitNumber";
import { ClassicCarIcon } from "../../Svgs";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTapsiRide } from "../../../ReactQuery/tapsiRequestHooks";
import { useAppStore } from "../../../stores/appStore";
import { RouteCoordinate } from "../../../stores/mapStore";
import classNames from "classnames";
import { trpc } from "../../../../utils/trpc";
import PriceLoading from "../PriceLoading";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
  name: string;
  price?: undefined | number;
  onPress: (input: any) => void;
  isLoading: boolean;
  minMaxPrice?:
    | {
        min: number;
        max: number;
      }
    | undefined;
  iconUrl?: string;
  serviceType: string;
  categoryType: string;
  routeCoordinate: RouteCoordinate;
  rideToken: string;
  key: React.Key;
  setRequestButton: (e: RequestButton) => void;
  requestButton: RequestButton;
  selected: boolean;
  commission: number;
};

const TapsiPriceItem = ({
  name,
  price,
  isLoading = true,
  minMaxPrice,
  iconUrl,
  navigation,
  serviceType,
  routeCoordinate,
  rideToken,
  categoryType,
  setRequestButton,
  requestButton,
  selected,
  commission,
}: Props) => {
  const { setActiveTrip, activeTrip, zipwayRideId } = useAppStore();
  const {
    isLoading: isUpdateRideLoading,
    mutate: mutateUpdateRide,
    data: updateRideData,
  } = trpc.ride.updateRide.useMutation();
  const {
    isTapsiRideSucceed,
    tapsiRideData,
    mutateTapsiRide,
    tapsiRideError,
    isTapsiRideLoading,
  } = useTapsiRide();
  const requestRideBody = {
    origin: {
      latitude: routeCoordinate.origin[1],
      longitude: routeCoordinate.origin[0],
    },
    destinations: [
      {
        latitude: routeCoordinate.destination[1],
        longitude: routeCoordinate.destination[0],
      },
    ],
    serviceKey: serviceType,
    token: rideToken,
    numberOfPassengers: 1,
    hasReturn: false,
    waitingTime: 0,
    gateway: "CAB",
    deliveryRequestDetails: {
      sender: null,
      receivers: null,
      payer: null,
      description: null,
      showDeliveryBottomSheet: false,
    },
    initiatedVia: "WEB",
  };

  useEffect(() => {
    if (tapsiRideData?.data.ride.status == "FINDING_DRIVER") {
      setActiveTrip({
        provider: "tapsi",
        accepted: false,
        type: serviceType,
        tripId: tapsiRideData["data"]["ride"]["id"],
        tapsiRideToken: rideToken,
      });
      navigation.navigate("TapsiRideWaiting");
    }
  }, [tapsiRideData]);

  useEffect(() => {
    if (selected) {
      setRequestButton({
        name: name,
        type: serviceType,
        category: categoryType,
        isLoading: isTapsiRideLoading || isUpdateRideLoading,
        mutateRideFunction: () =>
          mutateUpdateRide({
            rideId: zipwayRideId,
            status: "FINDING_DRIVER",
            trip: {
              accepted: false,
              categoryType,
              numberOfPassengers: 1,
              price,
              provider: "TAPSI",
              type: serviceType,
            },
          }),
        commission,
      });
    }
  }, [selected, isTapsiRideLoading, isUpdateRideLoading]);

  useEffect(() => {
    if (updateRideData?.result == "OK") {
      mutateTapsiRide(requestRideBody);
    }
  }, [updateRideData]);

  return (
    <>
      {price || minMaxPrice?.min ? (
        <Pressable
          onPress={() =>
            setRequestButton({
              name: name,
              type: serviceType,
              category: categoryType,
              mutateRideFunction: () =>
                mutateUpdateRide({
                  rideId: zipwayRideId,
                  status: "FINDING_DRIVER",
                  trip: {
                    accepted: false,
                    categoryType,
                    numberOfPassengers: 1,
                    price,
                    provider: "TAPSI",
                    type: serviceType,
                  },
                }),
              isLoading: isTapsiRideLoading || isUpdateRideLoading,
              commission,
            })
          }
        >
          <MotiView
            className={classNames(
              "h-[70] w-full  rounded-[25px] px-4 mb-3 shadow-sm shadow-gray-300 justify-center flex",
              requestButton?.type == serviceType ? "bg-blue-200" : "bg-white"
            )}
          >
            <MotiView
              from={{ translateY: 10, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ type: "timing", duration: 500 }}
              className="flex flex-row flex-1  justify-between"
            >
              <MotiView className="flex flex-row-reverse gap-1 items-center">
                <Text className="font-[IRANSansMedium] text-[14px] text-gray-700">
                  {minMaxPrice?.min
                    ? `${splitNumber(String(minMaxPrice.min))} - ${splitNumber(
                        String(minMaxPrice.max)
                      )}`
                    : splitNumber(String(price))}
                </Text>
                <Text className="font-[IRANSansMedium] text-[14px] text-gray-700">
                  تومان
                </Text>
              </MotiView>
              <MotiView className="flex flex-row items-center">
                <Text className="font-[IRANSansLight] text-[14px]">{name}</Text>
                {iconUrl ? (
                  <Image source={{ uri: iconUrl }} className="w-10 h-10 ml-2" />
                ) : (
                  <ClassicCarIcon classStyle="w-7 h-7 ml-2" />
                )}
              </MotiView>
            </MotiView>
          </MotiView>
        </Pressable>
      ) : (
        <MotiView className="w-full items-center justify-center">
          <Text className="font-[IRANSansLight] text-gray-500">در حال حاضر سرویسی برای این مسیر ارائه نمیشود</Text>
        </MotiView>
      )}
    </>
  );
};

export default TapsiPriceItem;
