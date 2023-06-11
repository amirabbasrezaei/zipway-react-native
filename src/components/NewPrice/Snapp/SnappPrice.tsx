import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SignInIcon, SnappTextIcon } from "../../Svgs";
import { useMapStore } from "../../../stores/mapStore";
import { MotiText, MotiView } from "moti";
import SnappLoginModal from "../../SnappAuth/SnappLoginModal";
import { FocusContext, UseFocusContextArgs } from "../../FocusComponent";
import { useAuthenticateStore } from "../../../stores/authenticateStore";
import { useAppStore } from "../../../stores/appStore";
import {
  useSnappNewPrice,
  useSnappServiceTypes,
} from "../../../ReactQuery/SnappRequestHooks";
import SnappPriceItem from "./SnappPriceItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { trpc } from "../../../../utils/trpc";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
  setRequestButton: (e: any) => void;
  requestButton: RequestButton;
};

const UserState = {
  isAuthorized: {
    message: "",
  },
  isNotAuthorized: {
    message: "لطفا وارد حساب اسنپ خود شوید.",
  },
  initial: {
    message: "",
  },
};

const SnappPrice = ({ navigation, setRequestButton, requestButton }: Props) => {
  const { zipwayRideId } = useAppStore();
  const [userState, setUserState] = useState("initial");
  const { setFocusState } = useContext<UseFocusContextArgs>(FocusContext);
  const { snappAuthKey } = useAuthenticateStore();
  const { routeCoordinate } = useMapStore();
  const { data: updateRideData, mutate: mutateUpdateRide } =
    trpc.ride.updateRide.useMutation();

  const snappServiceTypesBody = {
    points: [
      {
        lat: String(routeCoordinate.origin[1]),
        lng: String(routeCoordinate.origin[0]),
      },
      {
        lat: String(routeCoordinate.destination[1]),
        lng: String(routeCoordinate.destination[0]),
      },
    ],
    os: 1,
    version: 251,
    locale: "fa-IR",
  };

  const NewPricePostData = {
    hurry_price: "0",
    package_delivery: false,
    round_trip: false,
    points: [
      {
        lat: routeCoordinate.origin[1],
        lng: routeCoordinate.origin[0],
      },
      {
        lat: routeCoordinate.destination[1],
        lng: routeCoordinate.destination[0],
      },
    ],
    service_types: [1, 2, 5, 7],
    tag: "1",
  };

  const {
    isSnappServiceSuccess,
    isSnappServiceLoading,
    mutateSnappService,
    snappServiceData,
  } = useSnappServiceTypes();

  const {
    newSnappPriceLoading,
    newSnappPriceData,
    isSnappNewPriceSucceed,
    isSnappNewPriceError,
    mutateSnappNewPrice,

    snappNewPriceFailureReason,
  } = useSnappNewPrice();

  useEffect(() => {}, []);

  useEffect(() => {
    if (snappAuthKey && newSnappPriceData?.data && zipwayRideId) {
      // mutateUpdateRide({
      //   rideId: zipwayRideId,
      //   status: "NOT_INITIATED",
      //   snappPrices: services.map((service) => ({
      //     serviceType: service?.type,
      //     price: newSnappPriceData?.data?.prices
      //       ? newSnappPriceData.data.prices.filter(
      //           (item) => item?.type === service?.type
      //         )[0].final / 10
      //       : null,
      //   })),
      // });
      setUserState("isAuthorized");
    }
    if (isSnappNewPriceError) {
      setUserState("isNotAuthorized");
    }
  }, [isSnappNewPriceSucceed, isSnappNewPriceError]);

  useEffect(() => {
    mutateSnappService(snappServiceTypesBody);
    mutateSnappNewPrice(NewPricePostData);
  }, [snappAuthKey]);

  let services =
    snappServiceData?.categories &&
    snappServiceData?.categories.map((category) =>
      category.services.map((service) => service)
    );

  services = services && [].concat(services[0], services[1], services[2]);

  return (
    <View className="mt-4">
      <View className="w-full h-10  flex-row-reverse">
        <SnappTextIcon classStyle="w-24 h-10" />
      </View>
      <View className="flex flex-col h-fit w-full mt-4">
        {userState === "isNotAuthorized" ? (
          <MotiView
            from={{ translateY: 10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: "timing", duration: 500 }}
            className=" bg-white rounded-[15px] h-[200] justify-center items-center flex flex-col gap-y-4"
            onTouchStart={(e) => {
              setFocusState({
                focusComonent: <SnappLoginModal />,
                exitAfterPress: false,
              });
            }}
          >
            <View className="">
              <MotiText className="font-[IRANSansMedium] text-gray-500 text-[12px] ">
                برای استفاده از خدمات وارد اکانت اسنپ خود شوید.
              </MotiText>
            </View>
            <Pressable className="w-28 bg-gray-50 rounded-md h-10 flex flex-row justify-center items-center">
              <Text className="text-[4]  text-[#07a2fc] font-[IRANSansMedium] w-fit">
                ورود
              </Text>

              <SignInIcon classStyle="fill-[#07a2fc] w-4 h-4 ml-2" />
            </Pressable>
          </MotiView>
        ) : (
          <>
            {services?.length &&
              services.map((service) => (
                <SnappPriceItem
                  commission={updateRideData.commission}
                  requestButton={requestButton}
                  selected={requestButton?.type == service?.type}
                  key={service?.type}
                  setRequestButton={setRequestButton}
                  name={service?.name}
                  isLoading={userState === "initial" || newSnappPriceLoading}
                  serviceType={service?.type}
                  navigation={navigation}
                  photoUrl={service?.photo_url}
                  price={
                    newSnappPriceData?.data?.prices
                      ? newSnappPriceData?.data?.prices.filter(
                          (item) => item?.type === service?.type
                        )[0].final / 10
                      : 1000
                  }
                />
              ))}
          </>
        )}
      </View>
    </View>
  );
};

export default SnappPrice;
