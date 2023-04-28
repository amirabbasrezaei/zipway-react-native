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
  useNewSnappRide,
  useSnappNewPrice,
  useSnappServiceTypes,
} from "../../../ReactQuery/SnappRequestHooks";
import SnappPriceItem from "./SnappPriceItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
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

const SnappPrice = ({navigation}: Props) => {
  const { setActiveTrip } = useAppStore();
  const [userState, setUserState] = useState("initial");
  const { setFocusState } = useContext<UseFocusContextArgs>(FocusContext);
  const { snappAuthKey } = useAuthenticateStore();
  const { mutateSnappNewRide } = useNewSnappRide();
  const { routeCoordinate } = useMapStore();

  const body = {
    destination_details: "بزرگراه یادگار امام، چهارم، دوم جنوبی",
    destination_lat: routeCoordinate.destination[1],
    destination_lng: routeCoordinate.destination[0],
    destination_place_id: 0,
    intercity_tcv: 0,
    is_for_friend: false,
    services: false,
    is_paid_by_recipient: false,
    round_trip: false,
    origin_lat: routeCoordinate.origin[1],
    origin_lng: routeCoordinate.origin[0],
    service_type: 1,
  };

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

  useEffect(() => {
    if (snappAuthKey && isSnappNewPriceSucceed) {
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
                  name={service.name}
                  isLoading={userState === "initial" || newSnappPriceLoading}
                  key={service.name}
                  onPress={() => {
                    // setActiveTrip({
                    //   provider: "snapp",
                    //   accepted: false,
                    //   type: service.type,
                    // });
                    // navigation.navigate("RideWaiting");
                  }}
                  photoUrl={service.photo_url}
                  price={
                    newSnappPriceData?.data.prices?.filter(
                      (item) => item.type === service.type
                    )[0].final / 10
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
