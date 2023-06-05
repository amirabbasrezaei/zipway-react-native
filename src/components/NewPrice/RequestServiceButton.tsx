import { View, Text, ActivityIndicator, Pressable } from "react-native";
import React, { Children, useEffect } from "react";
import { MotiText, MotiView } from "moti";
import { AnimatePresence } from "moti";
import classNames from "classnames";

type Props = {
  children?: any;
  requestButton: RequestButton;
};

const RequestServiceButton = ({  requestButton }: Props) => {
    useEffect(() => {
        console.log(requestButton)
    }, [requestButton])
  return (
    <MotiView
      style={{ elevation: 3, zIndex: 3 }}
      animate={{ scale: requestButton?.name ? 1 : 0.7, opacity: requestButton?.name ? 1 : 0 }}
      transition={{ type: "timing", duration: 200 }}
      className=" fixed bottom-0 right-0 left-0 w-full rounded-t-[20px] h-[90]  justify-center items-center bg-white"
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
            <AnimatePresence>
            <MotiText transition={{type: "timing"}} key={requestButton?.name} from={{opacity:0, scale:0.5, translateY: 30}} animate={{opacity:1, scale:1, translateY: 0}} exit={{opacity:0, scale:0.5, translateY: -30}}className="font-[IRANSansMedium] text-white ">
              درخواست سرویس {requestButton.name}
            </MotiText >
            </AnimatePresence>
          )}
        </Pressable> : null}
     
    </MotiView>
  );
};

export default RequestServiceButton;
