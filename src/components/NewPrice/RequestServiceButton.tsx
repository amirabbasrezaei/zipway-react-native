import { View, Text } from "react-native";
import React, { Children } from "react";

type Props = {
    children?: any
};

const RequestServiceButton = ({children}: Props) => {
  return (
    <View
      className="w-full h-[90] absolute  bottom-0 left-0 right-0 bg-white justify-center items-center "
    >{children}</View>
  );
};

export default RequestServiceButton;
