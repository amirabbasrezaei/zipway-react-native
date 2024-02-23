import { View, Text, ActivityIndicator, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import {
  useTapsiCancelRide,
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
  const { mutate: mutateLog } = trpc.app.log.useMutation();

  const {
    mutateTapsiCancelRideWaiting,
    isTapsiCancelRideWaitingLoading,
    tapsiCancelRideDataWaiting,
  } = useTapsiCancelRideWaiting();

  const {
    mutateTapsiCancelRide,
    tapsiCancelRideData,
    isTapsiCancelRideLoading,
  } = useTapsiCancelRide();

  const {
    isLoading: isUpdateRideLoading,
    mutate: mutateUpdateRide,
    data: updateRideData,
  } = trpc.ride.updateRide.useMutation();

  const { appConfig } = useZipwayConfigStore();

  useEffect(() => {
    if (tapsiCancelRideData?.result == "OK") {
      (async () => {
        await mutateUpdateRide({
          rideId: zipwayRideId,
          status: "CANCELLED",
        });
      })().finally(() => {
        setActiveTrip({ accepted: false });
        navigation.navigate("MapScreen");
      });
    }
  }, [tapsiCancelRideData]);

  useEffect(() => {
    if (tapsiCancelRideDataWaiting?.result == "OK") {
      mutateUpdateRide({
        rideId: zipwayRideId,
        status: "CANCELLED",
      });
      setActiveTrip(null);
      navigation.navigate("MapScreen");
    }
  }, [tapsiCancelRideDataWaiting]);

  useEffect(() => {
    if (
      tapsiRideWaitingStatusData?.data["ride"]["status"] == "DRIVER_ASSIGNED"
    ) {
      (async () => {
         await mutateUpdateRide({
          rideId: zipwayRideId,
          status: "ACCEPTED",
          trip: {
            accepted: true,
            tripId: activeTrip.tripId,
            type: activeTrip.type,
            provider: "TAPSI",
            price: 0,
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
                iran_id: 0,
                part_a: 0,
                part_b: 0,
              },
              vehicle_model:
                tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                  "model"
                ],
            },
          },
        });

      })()
        .then(() => {
          
          if (updateRideData.result == "OK") {
            setActiveTrip({
              accepted: true,
              price: tapsiRideWaitingStatusData.data["ride"]["passengerShare"],
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
                    tapsiRideWaitingStatusData.data["ride"]["driver"][
                      "vehicle"
                    ]["plateNumber"]["payload"]["letter"],
                  iran_id:
                    tapsiRideWaitingStatusData.data["ride"]["driver"][
                      "vehicle"
                    ]["plateNumber"]["payload"]["provinceCode"],
                  part_a:
                    tapsiRideWaitingStatusData.data["ride"]["driver"][
                      "vehicle"
                    ]["plateNumber"]["payload"]["firstPart"],
                  part_b:
                    tapsiRideWaitingStatusData.data["ride"]["driver"][
                      "vehicle"
                    ]["plateNumber"]["payload"]["secondPart"],
                },
                vehicle_model:
                  tapsiRideWaitingStatusData.data["ride"]["driver"]["vehicle"][
                    "model"
                  ],
              },
            });
            navigation.navigate("MapScreen");
          }
        })
        .catch((error) => {
          if (Object.keys(error).length !== 0) {
            const tapsiCancelRideBody = {
              cancellationReason: {
                text: "سفیر دور است",
                code: "DRIVER_WAS_FAR_AWAY",
              },
            };

            mutateTapsiCancelRide({
              rideId: activeTrip.tripId,
              body: tapsiCancelRideBody,
            });

            mutateLog({
              error,
              message: "error while updating ride",
              section: "TapsiRideWaiting",
            });
          }
        });
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
        disabled={
          isTapsiCancelRideWaitingLoading ||
          isUpdateRideLoading ||
          isTapsiCancelRideLoading
        }
        className={classNames(
          "  px-4 py-2 rounded-[13px] w-full h-12 items-center justify-center ",
          isTapsiCancelRideWaitingLoading ||
            isUpdateRideLoading ||
            isTapsiCancelRideLoading
            ? "bg-gray-100"
            : "bg-white border border-[#e83b4f]"
        )}
        onPress={() => mutateTapsiCancelRideWaiting(activeTrip.tripId)}
      >
        {isTapsiCancelRideWaitingLoading ||
        isUpdateRideLoading ||
        isTapsiCancelRideLoading ? (
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
