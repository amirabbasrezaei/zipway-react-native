import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useZipwayConfigStore } from "../../../stores/zipwayConfigStore";
import { useZipwayConfig } from "../../../ReactQuery/Mutations";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const PaymentSuccess = ({ navigation }: Props) => {
  const params =
    navigation?.getState()?.routes[navigation.getState().index]?.params;
  const { setAppConfig } = useZipwayConfigStore();
  const {
    zipwayConfigRefetch,
    zipwayConfigData,
    isZipwayConfigSuccess,
  } = useZipwayConfig();
  useEffect(() => {
    if (isZipwayConfigSuccess) {
      setAppConfig(zipwayConfigData);
    }
  }, [zipwayConfigData]);

  return (
    <View className="items-center justify-center flex-1 relative">
      <Image
        className="w-[200px] "
        source={require("../../../../assets/successfull_payment.png")}
      />
      <Text className="font-[IRANSansMedium] text-green-600 text-[15px] mt-4">
        تراکنش موفق
      </Text>
      <Text className="font-[IRANSans] text-gray-400 text-[15px] ">
        {`(${params?.message})`}
      </Text>
      <View
        className="absolute bottom-40 bg-gray-100 px-5 py-3 rounded-xl"
        onTouchStart={() => navigation.navigate("Account")}
      >
        <Text className="font-[IRANSansMedium]  text-gray-500">بزن بریم</Text>
      </View>
    </View>
  );
};

export default PaymentSuccess;
