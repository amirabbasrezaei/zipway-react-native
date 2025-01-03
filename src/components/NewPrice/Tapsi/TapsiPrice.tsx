import { View, Text, Image, Pressable, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SignInIcon } from "../../Svgs";
import { FocusContext, UseFocusContextArgs } from "../../FocusComponent";
import TapsiLoginModal from "../../TapsiAuth/TapsiLoginModal";
import {
  useTapsiNewPrice,
  useTapsiPassengerInit,
} from "../../../ReactQuery/tapsiRequestHooks";
import { useMapStore } from "../../../stores/mapStore";
import { useAuthenticateStore } from "../../../stores/authenticateStore";
import { AnimatePresence, MotiText, MotiView } from "moti";

import TapsiPriceItem from "./TapsiPriceItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { trpc } from "../../../../utils/trpc";
import { useAppStore } from "../../../stores/appStore";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import PriceLoading from "../PriceLoading";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
  setRequestButton: (e: any) => void;
  requestButton: RequestButton;
};

const TapsiPrice = ({ navigation, setRequestButton, requestButton }: Props) => {
  const [userState, setUserState] = useState("initial");
  const { zipwayRideId } = useAppStore();
  const { setFocusState } = useContext<UseFocusContextArgs>(FocusContext);
  const { routeCoordinate } = useMapStore();
  const { tapsiAuthKey } = useAuthenticateStore();
  const {
    tapsiPassengerInitData,
    isTapsiPassengerInitLoading,
    refetchTapsiPassengerInit,
  } = useTapsiPassengerInit();
  const {
    data: updateRideData,
    mutate: mutateUpdateRide,
    isLoading: isUpdateRideLoading,
  } = trpc.ride.updateRide.useMutation({
    retry: false,
  });

  const {
    mutateTapsiNewPrice,
    isTapsiNewPriceLoading,
    isTapsiNewPriceSucceed,
    tapsiNewPriceData,
    tapsiNewPriceFailureReason,
  } = useTapsiNewPrice();

  const body = {
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
    hasReturn: false,
    waitingTime: 0,
    gateway: "CAB",
    initiatedVia: "WEB",
  };

  useEffect(() => {
    mutateTapsiNewPrice(body);
    refetchTapsiPassengerInit();
  }, [tapsiAuthKey]);

  useEffect(() => {
    if (
      tapsiAuthKey &&
      isTapsiNewPriceSucceed &&
      tapsiPassengerInitData?.data
    ) {
      try {
        let filteredData: Array<any> = [];
        tapsiNewPriceData?.data["categories"].map((category) => {
          return category?.services?.map((service) => {
            filteredData.push({
              type: service.key,
              price: service.prices[0]?.passengerShare
                ? service.prices[0]?.passengerShare
                : 0,
              categoryType: category.key,
              tripToken: tapsiNewPriceData?.data.token,

            });
          });
        });

        mutateUpdateRide({
          rideId: zipwayRideId,
          status: "NOT_INITIATED",
          tapsiPrices: filteredData,
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (!tapsiPassengerInitData) {
      setUserState("initial");
    }
  }, [isTapsiNewPriceSucceed, tapsiPassengerInitData, tapsiNewPriceData]);

  useEffect(() => {
    if (tapsiNewPriceFailureReason) {
      setUserState("isNotAuthorized");
    }
  }, [tapsiNewPriceFailureReason]);

  useEffect(() => {
    if (updateRideData?.result == "OK") {
      setUserState("isAuthorized");
    }
  }, [updateRideData]);

  return (
    <View className="mt-8  h-fit">
      <View className="w-full flex-row-reverse block relative ">
        <Image
          className="w-[114px] h-[26px] "
          source={require("../../../../assets/tapsi-logo-fa.png")}
        />
      </View>
      <View className="flex flex-col h-fit w-full mt-4">
        {userState === "isNotAuthorized" ? (
          <MotiView
            from={{ translateY: 10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: "timing", duration: 500 }}
            className=" bg-white h-[200] rounded-[15px] justify-center items-center flex flex-col gap-y-4"
          >
            <MotiText className="font-[IRANSansMedium] text-gray-500 text-[12px] ">
              برای استفاده از خدمات وارد اکانت تپسی خود شوید.
            </MotiText>

            <Pressable
              onPress={() => {
                setFocusState({
                  focusComonent: <TapsiLoginModal />,
                  exitAfterPress: false,
                });
              }}
              className="w-28 bg-gray-50 rounded-md h-10 flex flex-row justify-center items-center"
            >
              <Text className="text-[4]  text-[#07a2fc] font-[IRANSansMedium] w-fit">
                ورود
              </Text>

              <SignInIcon classStyle="fill-[#07a2fc] w-4 h-4 ml-2" />
            </Pressable>
          </MotiView>
        ) : (
          <AnimatePresence exitBeforeEnter={true}>
            {updateRideData?.commission ? (
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "timing", duration: 200 }}
                key="tapsiPricesList"
              >
                {tapsiNewPriceData?.data["categories"].map((category) => (
                  <View key={category.key} className="mt-5">
                    <Text className="font-[IRANSansMedium] mb-3 mr-3 text-gray-500">
                      {category.title}
                    </Text>
                    {category?.services?.map((service) =>
                      tapsiPassengerInitData?.data
                        ? Object.entries(
                            tapsiPassengerInitData?.data.services
                          ).map(
                            ([
                              tapsiInitPassengerSeriveKey,
                              tapsiInitPassengerSerivce,
                            ]: any[]) => {
                              return tapsiInitPassengerSeriveKey ==
                                service.key ? (
                                <TapsiPriceItem
                                  selected={
                                    requestButton?.category == category.key &&
                                    requestButton?.type ==
                                      tapsiInitPassengerSeriveKey
                                  }
                                  requestButton={requestButton}
                                  setRequestButton={setRequestButton}
                                  categoryType={category.key}
                                  rideToken={tapsiNewPriceData?.data.token}
                                  key={
                                    tapsiInitPassengerSeriveKey + category.key
                                  }
                                  serviceType={tapsiInitPassengerSeriveKey}
                                  routeCoordinate={routeCoordinate}
                                  navigation={navigation}
                                  commission={
                                    updateRideData.commission.tapsi[
                                      category.key + tapsiInitPassengerSeriveKey
                                    ].amount
                                  }
                                  name={tapsiInitPassengerSerivce.title}
                                  price={service.prices[0]?.passengerShare}
                                  iconUrl={tapsiInitPassengerSerivce.iconUrl}
                                  minMaxPrice={{
                                    max: service.prices[0]?.maxPrice
                                      ?.passengerShare,
                                    min: service.prices[0]?.minPrice
                                      ?.passengerShare,
                                  }}
                                  onPress={() => null}
                                  isLoading={
                                    userState === "initial" ||
                                    isTapsiNewPriceLoading
                                  }
                                />
                              ) : null;
                            }
                          )
                        : null
                    )}
                  </View>
                ))}
              </MotiView>
            ) : isTapsiNewPriceLoading ||
              isTapsiPassengerInitLoading ||
              isUpdateRideLoading ? (
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "timing", duration: 200 }}
                key="tapsiPricesLoading"
              >
                <PriceLoading />
                <PriceLoading />
                <PriceLoading />
              </MotiView>
            ) : null}
          </AnimatePresence>
        )}
      </View>
    </View>
  );
};

export default TapsiPrice;
