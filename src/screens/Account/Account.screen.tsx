import { View, Text, BackHandler, Pressable } from "react-native";
import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { trpc } from "../../../utils/trpc";
import Account from "../../components/account/Account";
import { ArrowRightIcon } from "../../components/Svgs";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

type AccountScreenParams = {};

const AccountScreen = ({ navigation }: Props) => {
  const {
    data: inquiryPaymentData,
    mutate: mutateInquiryPayment,
    isLoading: isInquiryPaymenLoading,
    isSuccess: isInquiryPaymenSuccess,
    error,
  } = trpc.payment.inquiryPayment.useMutation();

  const params =
    navigation?.getState()?.routes[navigation.getState().index]?.params;
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (params?.status) {
      mutateInquiryPayment({
        order_id: params?.order_id,
        servicePaymentId: params?.id,
        track_id: params?.track_id,
      });
    }
  }, [params]);

  error && console.log("error", error);

  useEffect(() => {
    if (isInquiryPaymenSuccess) {
      console.log("inquiryPaymentData", inquiryPaymentData);
      if (inquiryPaymentData["paymentStatus"] === "FAILED") {
        navigation.navigate("PaymentFailed", {
          message: inquiryPaymentData.message,
        });
      }
      if (inquiryPaymentData["paymentStatus"] === "PAYED") {
        navigation.navigate("PaymentSuccess", {
          message: inquiryPaymentData.message,
        });
      }
    }
  }, [inquiryPaymentData]);
  console.log(params);
  return (
    <View className="gap-y-10 flex flex-col">
      <View className="h-[60] bg-white   justify-center items-center relative mb-[40] w-full">
        <Pressable
          hitSlop={10}
          onPress={() => {
            navigation.goBack();
          }}
          className="absolute right-4"
        >
          <ArrowRightIcon classStyle=" fill-gray-700 w-6 h-6 " />
        </Pressable>
        <Text className="font-[IRANSansMedium] text-gray-700 text-[16px]">
          حساب کاربری
        </Text>
      </View>
      <Account navigation={navigation} />
    </View>
  );
};

export default AccountScreen;
