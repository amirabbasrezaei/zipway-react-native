import { View, Text, ActivityIndicator, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import {
  useTapsiCancelRideWaiting,
  useTapsiRideWaitingStatus,
} from "../ReactQuery/tapsiRequestHooks";
import classNames from "classnames";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppStore } from "../stores/appStore";
import { trpc } from "../../utils/trpc";
import { useZipwayConfigStore } from "../stores/zipwayConfigStore";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const TapsiRideWaiting = ({ navigation }: Props) => {
  const { activeTrip, setActiveTrip, zipwayRideId } = useAppStore();
  const { tapsiRideWaitingStatusData } = useTapsiRideWaitingStatus(
    activeTrip.tripId
  );
  const {
    mutateTapsiCancelRideWaiting,
    isTapsiCancelRideWaitingLoading,
    tapsiCancelRideDataWaiting,
  } = useTapsiCancelRideWaiting();
  const { isLoading: isUpdateRideLoading, mutate: mutateUpdateRide } =
    trpc.ride.updateRide.useMutation();
  const { appConfig } = useZipwayConfigStore();
  console.log(appConfig?.appInfo);
  useEffect(() => {
    if (tapsiCancelRideDataWaiting?.result == "OK") {
      mutateUpdateRide({
        rideId: zipwayRideId,
        status: "CANCELLED",
      });
      setActiveTrip(null);
      navigation.navigate("MapScreen");
    }
    if (
      tapsiRideWaitingStatusData?.data["ride"]["status"] == "DRIVER_ASSIGNED"
    ) {
      mutateUpdateRide({
        rideId: zipwayRideId,
        status: "ACCEPTED",
        trip: {
          accepted: true,
          tripId: activeTrip.tripId,
          type: activeTrip.type,
          provider: "TAPSI",
          driverInfo: {
            cellphone:
              tapsiRideWaitingStatusData.data["ride"]["driver"]["profile"][
                "phoneNumber"
              ],
            driver_location_info: {
              lat: tapsiRideWaitingStatusData.data["ride"]["driver"][
                "location"
              ]["latitude"],
              lng: tapsiRideWaitingStatusData.data["ride"]["driver"][
                "location"
              ]["longitude"],
            },
            driver_name:
              tapsiRideWaitingStatusData.data["ride"]["driver"]["profile"][
                "firstName"
              ] +
              tapsiRideWaitingStatusData.data["ride"]["driver"]["profile"][
                "lastName"
              ],
            image_url:
              tapsiRideWaitingStatusData.data["ride"]["driver"]["profile"][
                "pictureUrl"
              ],
            vehicle_color:
              tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                "color"
              ],
            plate: {
              character:
                tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                  "plateNumber"
                ]["payload"]["letter"],
              iran_id:
                tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                  "plateNumber"
                ]["payload"]["provinceCode"],
              part_a:
                tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                  "plateNumber"
                ]["payload"]["firstPart"],
              part_b:
                tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                  "plateNumber"
                ]["payload"]["secondPart"],
            },
            vehicle_model:
              tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                "model"
              ],
          },
        },
      });
      setActiveTrip({
        accepted: true,
        price: tapsiRideWaitingStatusData.data["ride"]["passengerShare"],
        driverInfo: {
          cellphone:
            tapsiRideWaitingStatusData.data["ride"]["driver"]["profile"][
              "phoneNumber"
            ],
          driver_location_info: {
            lat: tapsiRideWaitingStatusData.data["ride"]["driver"]["location"][
              "latitude"
            ],
            lng: tapsiRideWaitingStatusData.data["ride"]["driver"]["location"][
              "longitude"
            ],
          },
          driver_name:
            tapsiRideWaitingStatusData.data["ride"]["driver"]["profile"][
              "firstName"
            ] +
            tapsiRideWaitingStatusData.data["ride"]["driver"]["profile"][
              "lastName"
            ],
          image_url:
            tapsiRideWaitingStatusData.data["ride"]["driver"]["profile"][
              "pictureUrl"
            ],
          vehicle_color:
            tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
              "color"
            ],
          plate: {
            character:
              tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                "plateNumber"
              ]["payload"]["letter"],
            iran_id:
              tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                "plateNumber"
              ]["payload"]["provinceCode"],
            part_a:
              tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                "plateNumber"
              ]["payload"]["firstPart"],
            part_b:
              tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                "plateNumber"
              ]["payload"]["secondPart"],
          },
          vehicle_model:
            tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
              "model"
            ],
        },
      });
      navigation.navigate("MapScreen");
    }
  }, [tapsiRideWaitingStatusData]);

  return (
    <View className="flex-1 justify-center items-center bg-white px-14 gap-y-10">
      <View
        style={{
          width: appConfig.appInfo.rideWaiting.image.width,
          height: appConfig.appInfo.rideWaiting.image.height,
        }}
      >
        {appConfig?.appInfo?.rideWaiting?.image ? (
          <Image
            style={{
              borderRadius: appConfig.appInfo.rideWaiting.image.borderRadius,
            }}
            // className="h-[250] w-[350]"
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
        disabled={isTapsiCancelRideWaitingLoading || isUpdateRideLoading}
        className={classNames(
          "  px-4 py-2 rounded-[13px] w-full h-12 items-center justify-center ",
          isTapsiCancelRideWaitingLoading || isUpdateRideLoading
            ? "bg-gray-100"
            : "bg-white border border-[#e83b4f]"
        )}
        onPress={() => mutateTapsiCancelRideWaiting(activeTrip.tripId)}
      >
        {isTapsiCancelRideWaitingLoading || isUpdateRideLoading ? (
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

export default TapsiRideWaiting;
