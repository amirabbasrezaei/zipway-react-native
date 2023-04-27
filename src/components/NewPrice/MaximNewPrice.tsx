import { View, Text, Image, Pressable, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ItemOptions from "../ItemOptions";
import { EllipsisIcon, SettingsIcon, SignInIcon } from "../Svgs";
import { useNavigation } from "@react-navigation/native";
import { FocusContext, UseFocusContextArgs } from "../FocusComponent";
import { useTapsiNewPrice } from "../../ReactQuery/tapsiRequestHooks";
import { useMapStore } from "../../stores/mapStore";
import MaximLoginModal from "../MaximAuth/MaximLoginModal";
import { useMaximPrice } from "../../ReactQuery/maximRequestHooks";
import { MotiText, MotiView } from "moti";
import PriceItem from "./PriceItem";

type Props = {};

const UserState = {
  isAuthorized: {
    message: "",
  },
  isNotAuthorized: {
    message: "لطفا وارد حساب ماکسیم خود شوید.",
  },
  initial: {
    message: "",
  },
};

const MaximTrip = (props: Props) => {
  const [userState, setUserState] = useState("initial");
  const navigation = useNavigation();
  const { focusState, setFocusState } =
    useContext<UseFocusContextArgs>(FocusContext);
  const { routeCoordinate } = useMapStore();

  const {
    data: maximPriceData,
    isLoading: isMaximPriceLoading,
    mutate: mutateMaximPrice,
    isSuccess: isMaximPriceSuccess,
    isError: isMaximPriceError,
  } = useMaximPrice();

  useEffect(() => {
    mutateMaximPrice();
  }, []);

  useEffect(() => {
    if (isMaximPriceSuccess) {
      setUserState("isAuthorized");
    }
    if (isMaximPriceError) {
      setUserState("isNotAuthorized");
    }
  }, [isMaximPriceSuccess, isMaximPriceError]);

  return (
    // <>
    //   <View className="flex-row relative mb-5 h-[130] w-full bg-white rounded-[15px] shadow-sm shadow-gray-700 items-center justify-between px-6">
    //     {userState === "initial" || isMaximPriceLoading ? (
    //       <SkeletonPlaceholder borderRadius={4} angle={90}>
    //         <SkeletonPlaceholder.Item
    //           flexDirection="row"
    //           alignItems="center"
    //           justifyContent="space-between"
    //           width={Dimensions.get("window").width - 75}
    //         >
    //           <SkeletonPlaceholder.Item width={80} height={25} />
    //           <SkeletonPlaceholder.Item width={110} height={40} />
    //         </SkeletonPlaceholder.Item>
    //       </SkeletonPlaceholder>
    //     ) : userState === "isNotAuthorized" ? (
    //       <MotiView
    //         from={{ translateY: 10, opacity: 0 }}
    //         animate={{ translateY: 0, opacity: 1 }}
    //         transition={{type: "timing", duration: 500}}

    //         className="flex-row gap-2 w-full h-full  flex-1 relative items-center justify-between"
    //       >
    //         <Pressable
    //           onPress={() => {
    //             setFocusState({
    //               focusComonent: <MaximLoginModal />,
    //               exitAfterPress: false,
    //             });
    //           }}
    //           className="w-24 bg-gray-50 rounded-md h-10 flex flex-row justify-center items-center"
    //         >
    //           <Text className="text-[4]  text-[#07a2fc] font-[IRANSansMedium] w-fit">
    //             ورود
    //           </Text>

    //           <SignInIcon classStyle="fill-[#07a2fc] w-4 h-4 ml-2" />
    //         </Pressable>
    //         <View className="absolute bottom-2 left-0 w-fit">
    //           <MotiText className="font-[IRANSansLight] text-gray-700 text-[12px] ">
    //             {UserState.isNotAuthorized.message}
    //           </MotiText>
    //         </View>
    //         <View>

    //           <Image
    //             className="w-[100px] h-[26px] "
    //             source={require("../../../assets/maxim-logo.png")}
    //           />
    //         </View>
    //       </MotiView>
    //     ) : (
    //       <>
    //         <MotiView
    //           from={{ translateY: 10, opacity: 0 }}
    //           animate={{ translateY: 0, opacity: 1 }}
    //           transition={{type: "timing", duration: 500}}
    //           className="flex-row items-center justify-center"
    //         >
    //           <View className="flex-row items-center justify-center">
    //             <Text className="text-sm font-[IRANSansBold] text-[12px] text-gray-600 mr-1 top-[1]">
    //               تومان
    //             </Text>
    //             <Text className="text-gray-600 font-[IRANSansBold] text-[17px]">
    //               {maximPriceData.Price}
    //             </Text>
    //           </View>
    //         </MotiView>
    //         <Image
    //             className="w-[100px] h-[26px] "
    //             source={require("../../../assets/maxim-logo.png")}
    //           />
    //       </>
    //     )}
    //   </View>
    // </>

    <View className="mt-8">
      <View className="w-full flex-row-reverse h-[26px] ">
        <Image
          className="w-[100px] h-[26px] "
          source={require("../../../assets/maxim-logo.png")}
        />
      </View>

      <View className="flex flex-col h-fit w-full mt-4">
        {userState === "isNotAuthorized" ? (
          <MotiView
            from={{ translateY: 10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: "timing", duration: 500 }}
            className="h-[200] bg-white rounded-[15px] justify-center items-center flex flex-col gap-y-4"
          >
            <View className="">
              <MotiText className="font-[IRANSansMedium] text-gray-500 text-[12px] ">
                برای استفاده از خدمات وارد اکانت ماکسیم خود شوید.
              </MotiText>
            </View>
            <Pressable
              onPress={(e) => {
                setFocusState({
                  focusComonent: <MaximLoginModal />,
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
              name=""
              price={maximPriceData?.Price}
              onPress={() => null}
              isLoading={userState === "initial" || isMaximPriceLoading}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default MaximTrip;
