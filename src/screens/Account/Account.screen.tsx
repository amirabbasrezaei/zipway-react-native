import { View, Text, BackHandler, Pressable } from "react-native";
import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { trpc } from "../../../utils/trpc";
import Account from "../../components/account/Account";
import { ArrowRightIcon } from "../../components/Svgs";
import { SafeAreaView } from "moti";

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
    <SafeAreaView className="">
   
      <Account goToPayment={params?.goToPayment} navigation={navigation} />
    </SafeAreaView>
  );
};

export default AccountScreen;
