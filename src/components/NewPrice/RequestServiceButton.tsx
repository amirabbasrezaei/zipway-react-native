import { View, Text, ActivityIndicator, Pressable } from "react-native";
import React, { Children, useEffect } from "react";
import { MotiText, MotiView } from "moti";
import { AnimatePresence } from "moti";
import classNames from "classnames";
import { useZipwayConfigStore } from "../../stores/zipwayConfigStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  children?: any;
  requestButton: RequestButton;
  navigation: NativeStackNavigationProp<any, any>;
};

const RequestServiceButton = ({ requestButton, navigation }: Props) => {
  const { appConfig } = useZipwayConfigStore();
  console.log(requestButton?.name)
  return (
    <>
      <AnimatePresence exitBeforeEnter={true} key={"requestButtonAnimatePresence"}>
        {requestButton?.name ? (
          <MotiView
            style={{
              elevation: 11,
              zIndex: 11,
              shadowColor: "#000",
              shadowOffset: { width: 20, height: - 20 },
              shadowOpacity: 0.5
            }}
            from={{  opacity: 0 }}
            animate={{
            
              opacity: 1,
            }}
            exit={{  opacity: 0 }}
            transition={{ type: "timing",  duration: 300 }}
            className=" fixed bg-white bottom-0 right-0 left-0 w-full shadow-lg rounded-t-[20px] h-[80]  justify-center items-center "
          >
            {appConfig.userInfo.credit >= requestButton?.commission ? (
              <Pressable
                disabled={requestButton?.isLoading}
                onPress={() => {
                  // mutateSnappNewRide(NewRideBody);
                  requestButton.mutateRideFunction();
                }}
                className={classNames(
                  " w-[90%]  h-[57]  items-center justify-center rounded-[20px]",
                  requestButton?.isLoading ? "bg-gray-400" : "bg-blue-600"
                )}
              >
                {requestButton?.isLoading ? (
                  <ActivityIndicator color={"#fff"} size={24} />
                ) : (
                  <AnimatePresence exitBeforeEnter={true} key={"dfgdfb"}>
                    <MotiText
                      transition={{ type: "timing", duration: 100, delay: 10 }}
                      key={requestButton?.type}
                      from={{ opacity: 0, scale: 0.6, translateY: 20 }}
                      animate={{ opacity: 1, scale: 1, translateY: 0 }}
                      exit={{ opacity: 0, scale: 0.6, translateY: -20 }}
                      className="font-[IRANSansMedium] text-white "
                    >
                      درخواست سرویس {requestButton.name}
                    </MotiText>
                  </AnimatePresence>
                )}
              </Pressable>
            ) : (
              <Pressable
                onPress={() =>
                  navigation.navigate("Account", { goToPayment: true })
                }
                className=" w-full"
              >
                <MotiView className="flex flex-row items-center justify-center gap-x-3 w-full">
                  <MotiView className="bg-blue-500 px-4 py-2 rounded-[20px]">
                    <MotiText className="font-[IRANSansMedium] text-white ">
                      افزایش اعتبار
                    </MotiText>
                  </MotiView>
                  <MotiText className="font-[IRANSansMedium] text-gray-600 text-[11px]">
                    {appConfig.appInfo.notEnoughCredit.requestServiceButton}
                  </MotiText>
                </MotiView>
              </Pressable>
            )}
          </MotiView>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default RequestServiceButton;
