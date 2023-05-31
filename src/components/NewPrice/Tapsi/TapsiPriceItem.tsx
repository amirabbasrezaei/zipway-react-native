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
  setRequestButton: (e: any) => void;
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
}: Props) => {
  const { setActiveTrip, activeTrip } = useAppStore();
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
    console.log(tapsiRideData);
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
  }, [isTapsiRideSucceed]);

  useEffect(() => {
    if (
      activeTrip?.categoryType == categoryType &&
      activeTrip?.type == serviceType
    ) {
      console.log(tapsiRideError);
      setRequestButton(
        <Pressable
          disabled={isTapsiRideLoading}
          onPress={() => {
            mutateTapsiRide(requestRideBody);
          }}
          style={{ elevation: 2, zIndex: 2 }}
          className={classNames(
            " w-[80%]  h-[57]  items-center justify-center rounded-[20px]",
            isTapsiRideLoading ? "bg-gray-400" : "bg-blue-600"
          )}
        >
          {isTapsiRideLoading ? (
            <ActivityIndicator color={"#fff"} size={24} />
          ) : (
            <Text className="font-[IRANSansMedium] text-white ">
              درخواست سرویس {name}
            </Text>
          )}
        </Pressable>
      );
    }
  }, [activeTrip, tapsiRideError, isTapsiRideLoading]);

  return (
    <>
      <Pressable
        onPress={() => {
          setActiveTrip({
            serviceName: name,
            categoryType: categoryType,
            type: serviceType,
          });
          // console.log(categoryType + serviceType);
        }}
      >
        <MotiView
          className={classNames(
            "h-[70] w-full  rounded-[25px] px-4 mb-3 shadow-sm shadow-gray-700 justify-center flex",
            activeTrip?.type == serviceType ? "bg-blue-200" : "bg-white"
          )}
        >
          {isLoading || (!price && !minMaxPrice?.min) ? (
            <SkeletonPlaceholder borderRadius={4} angle={90}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width={Dimensions.get("screen").width - 65}
                height={70}
                backgroundColor={"#000"}
              >
                <SkeletonPlaceholder.Item width={110} height={30} />
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
          )}
        </MotiView>
      </Pressable>
    </>
  );
};

export default TapsiPriceItem;
