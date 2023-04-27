import { View, Text, Image, Pressable, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ItemOptions from "../ItemOptions";
import {
  ClassicCarIcon,
  EllipsisIcon,
  SettingsIcon,
  SignInIcon,
} from "../Svgs";
import { useNavigation } from "@react-navigation/native";
import { FocusContext, UseFocusContextArgs } from "../FocusComponent";
import TapsiLoginModal from "../TapsiAuth/TapsiLoginModal";
import { useTapsiNewPrice } from "../../ReactQuery/tapsiRequestHooks";
import { useMapStore } from "../../stores/mapStore";
import { useAuthenticateStore } from "../../stores/authenticateStore";
import { MotiText, MotiView } from "moti";
import { useAppStore } from "../../stores/appStore";
import splitNumber from "../../../utils/splitNumber";
import PriceItem from "./PriceItem";

type Props = {};

const UserState = {
  isAuthorized: {
    message: "",
  },
  isNotAuthorized: {
    message: "لطفا وارد حساب تپسی خود شوید.",
  },
  initial: {
    message: "",
  },
};

const TapsiPrice = (props: Props) => {
  const [userState, setUserState] = useState("initial");
  const { setActiveTrip } = useAppStore();

  const {  setFocusState } =
    useContext<UseFocusContextArgs>(FocusContext);
  const { routeCoordinate } = useMapStore();
  const { tapsiAuthKey } = useAuthenticateStore();

  const {
    mutateTapsiNewPrice,
    isTapsiNewPriceLoading,
    isTapsiNewPriceSucceed,
    tapsiNewPriceData,
    isTapsiNewPriceError,
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
  }, [tapsiAuthKey]);

  useEffect(() => {
    if (tapsiAuthKey && isTapsiNewPriceSucceed) {
      setUserState("isAuthorized");
    }
    if (isTapsiNewPriceError) {
      setUserState("isNotAuthorized");
    }
  }, [isTapsiNewPriceSucceed, isTapsiNewPriceError]);


  return (
    <View className="mt-8">
      <View className="w-full flex-row-reverse block relative">
        <Image
          className="w-[114px] h-[26px] "
          source={require("../../../assets/tapsi-logo-fa.png")}
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
                برای استفاده از خدمات وارد اکانت اسنپ خود شوید.
              </MotiText>
            
            <Pressable
              onPress={(e) => {
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
          <>
            <PriceItem
              name="کلاسیک"
              price={
                tapsiNewPriceData?.data["categories"][0]["services"][0][
                  "prices"
                ][0]["passengerShare"]
              }
              onPress={() => null}
              isLoading={userState === "initial" || isTapsiNewPriceLoading}
            />
            <PriceItem
              name="پلاس"
              price={
                tapsiNewPriceData?.data?.categories[1]?.services[1]?.prices[0]
                  .passengerShare
              }
              onPress={() => null}
              isLoading={userState === "initial" || isTapsiNewPriceLoading}
            />
            <PriceItem
              name="موتوپیک"
              price={
                tapsiNewPriceData?.data.categories[0]?.services[2]?.prices[0]
                ?.passengerShare
              }
              onPress={() => null}
              isLoading={userState === "initial" || isTapsiNewPriceLoading}
            />
            <PriceItem
              name="لاین"
              minMaxPrice={{
                max: tapsiNewPriceData?.data?.categories[0]?.services[1]
                  ?.prices[0]?.maxPrice?.passengerShare,
                min: tapsiNewPriceData?.data.categories[0]?.services[1]
                  ?.prices[0]?.minPrice?.passengerShare,
              }}
              onPress={() => null}
              isLoading={userState === "initial" || isTapsiNewPriceLoading}
            />
            <PriceItem
              name="اتوپیک"
              price={
                tapsiNewPriceData?.data.categories[2]?.services[1]?.prices[0]
                ?.passengerShare
              }
              onPress={() => null}
              isLoading={userState === "initial" || isTapsiNewPriceLoading}
            />
            <PriceItem
              name="همیار"
              price={
                tapsiNewPriceData?.data.categories[2]?.services[2]?.prices[0]
                ?.passengerShare
              }
              onPress={() => null}
              isLoading={userState === "initial" || isTapsiNewPriceLoading}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default TapsiPrice;
