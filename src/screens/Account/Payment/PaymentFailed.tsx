import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const PaymentFailed = ({ navigation }: Props) => {
  const params =
    navigation?.getState()?.routes[navigation.getState().index]?.params;
  console.log(navigation?.getState());
  return (
    <View className="items-center justify-center flex-1 relative">
      <Image
        className="w-[200px] h-[200px]"
        source={require("../../../../assets/failed_payment.png")}
      />
      <Text className="font-[IRANSansMedium] text-red-600 text-[15px] mt-4">
        تراکنش ناموفق
      </Text>
      <Text className="font-[IRANSans] text-gray-400 text-[15px] ">
        {`(${params?.message})`}
      </Text>
      <View
        className="absolute bottom-40 bg-gray-100 px-5 py-3 rounded-xl"
        onTouchStart={() => navigation.navigate("Account")}
      >
        <Text className="font-[IRANSansMedium]  text-gray-500">
          بازگشت به حساب کاربری
        </Text>
      </View>
    </View>
  );
};

export default PaymentFailed;
