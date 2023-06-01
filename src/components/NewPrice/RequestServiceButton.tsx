import { View, Text, ActivityIndicator, Pressable } from "react-native";
import React, { Children, useEffect } from "react";
import { MotiView } from "moti";
import { AnimatePresence } from "@legendapp/motion";
import classNames from "classnames";

type Props = {
  children?: any;
  requestButton: RequestButton;
};

const RequestServiceButton = ({ children = null, requestButton }: Props) => {
    useEffect(() => {
        console.log(requestButton)
    }, [requestButton])
  return (
    <MotiView
      style={{ elevation: 3, zIndex: 3 }}
      animate={{ scale: requestButton?.name ? 1 : 0.7, opacity: children ? 1 : 0 }}
      transition={{ type: "timing", duration: 200 }}
      className="  w-full rounded-t-[20px] h-[90]  justify-center items-center bg-white"
    >
      
        {requestButton?.name ? <Pressable
          disabled={requestButton?.isLoading}
          onPress={() => {
            // mutateSnappNewRide(NewRideBody);
            requestButton.mutateRideFunction()
          }}
          className={classNames(
            " w-[80%]  h-[57]  items-center justify-center rounded-[20px]",
            requestButton?.isLoading ? "bg-gray-400" : "bg-blue-600"
          )}
        >
          {requestButton?.isLoading ? (
            <ActivityIndicator color={"#fff"} size={24} />
          ) : (
            <Text className="font-[IRANSansMedium] text-white ">
              درخواست سرویس {requestButton.name}
            </Text>
          )}
        </Pressable> : null}
     
    </MotiView>
  );
};

export default RequestServiceButton;
