import {
  Text,
  Pressable,
  TextInput,
  Linking,
  View,
  Dimensions,
  ViewStyle,
  ImageStyle,
  ActivityIndicator,
} from "react-native";
import * as Application from "expo-application";
import React, { useEffect, useState } from "react";
import {
  MotiText,
  MotiTransitionProp,
  MotiView,
  StyleValueWithReplacedTransforms,
} from "moti";
import { useZipwayConfigStore } from "../../stores/zipwayConfigStore";
import { trpc } from "../../../utils/trpc";
import { useAppStore } from "../../stores/appStore";
import {  MinusIcon, PlusIcon, WalletIcon } from "../Svgs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import classNames from "classnames";

import { TextStyle } from "react-native";
import splitNumber from "../../../utils/splitNumber";
type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

enum AccountState {
  ACCOUNT_INFO,
  PAYMENT,
}

const { height, width } = Dimensions.get("window");

const transition: MotiTransitionProp<
  StyleValueWithReplacedTransforms<ViewStyle | ImageStyle | TextStyle>
> = {
  type: "timing",
  duration: 300,
};

const Account = ({ navigation }: Props) => {
  const [priceAmount, setPriceAmount] = useState<string>("20000");
  const [accountState, setAccountState] = useState<AccountState>(
    AccountState.ACCOUNT_INFO
  );
  const { appConfig } = useZipwayConfigStore();
  const {
    data: createPaymentData,
    mutate: mutateCreatePayment,
    isLoading: isCreatePaymentLoading,
    isSuccess: isCreatePaymentSuccess,
  } = trpc.payment.createPayment.useMutation();

  useEffect(() => {
    if (createPaymentData?.pay_link) {
      console.log(createPaymentData);
      Linking.openURL(createPaymentData?.pay_link);
    }
  }, [isCreatePaymentSuccess]);

  useEffect(() => {
    if (accountState === AccountState.ACCOUNT_INFO) {
      setPriceAmount("20000");
    }
  }, [accountState]);

  return (
    <MotiView
      animate={
        {
          // translateY: accountState === AccountState.PAYMENT ? -80 : 0,
        }
      }
      transition={transition}
      style={{ height: height - 120 }}
      className={classNames("items-center justify-between  px-7 w-full ")}
    >
      <View className=" h-fit w-full gap-y-10">
        <MotiView
          animate={{
            scale: accountState === AccountState.ACCOUNT_INFO ? 1 : 0,
            opacity: accountState === AccountState.ACCOUNT_INFO ? 1 : 0,
          }}
          transition={transition}
          className="items-center justify-center"
        >
          <MotiText className="font-[IRANSansLight] text-[20px] text-black">
            {/* {appConfig.userInfo.name} */}
            امیرعباس رضائی
          </MotiText>
          <Text className="font-[IRANSansLight] text-[14px] text-black">
            {appConfig.userInfo.phoneNumber}
          </Text>
        </MotiView>

        <MotiView
          animate={{
            justifyContent:
              accountState === AccountState.ACCOUNT_INFO
                ? "space-between"
                : null,
            translateX: accountState === AccountState.PAYMENT ? -130 : 0,
          }}
          transition={transition}
          className="w-full h-30  rounded-lg flex flex-row  items-center justify-between"
        >
          <MotiView
            onTouchStart={() => {
              setAccountState(AccountState.PAYMENT);
            }}
            animate={{
              scale: accountState === AccountState.ACCOUNT_INFO ? 1 : 0,
              opacity: accountState === AccountState.ACCOUNT_INFO ? 1 : 0,
            }}
            transition={transition}
            className="bg-[#F8F8F8] px-4 py-2 rounded-[13px]"
          >
            <MotiText className="font-[IRANSansBold] text-[#00D42F]">
              افزایش اعتبار
            </MotiText>
          </MotiView>

          <MotiView
            animate={{
              scale: accountState === AccountState.ACCOUNT_INFO ? 1 : 1.2,
            }}
            className="w-fit justify-center items-center flex flex-row gap-x-3"
          >
            <MotiView>
              <Text className="font-[IRANSansMedium] text-[17px] text-[#464646]">
                ‌{appConfig.userInfo.credit} تومان‌
              </Text>
            </MotiView>
            <MotiView className="w-7 h-7">
              <WalletIcon classStyle="w-full h-full " />
            </MotiView>
          </MotiView>
        </MotiView>
        <MotiView
          animate={{
            scale: accountState === AccountState.PAYMENT ? 1 : 0,
            opacity: accountState === AccountState.PAYMENT ? 1 : 0,
          }}
          style={{ direction: "rtl" }}
          transition={transition}
          className=" bg-[#F8F8F8] rounded-[19px] p-3"
        >
          <MotiText
            style={{ direction: "rtl" }}
            className="font-[IRANSans]   text-[#6B6B6B]"
          >
            حداقل مبلغ مورد نیاز برای افزایش اعتبار حساب ۲۰۰۰۰ تومان می باشد.
          </MotiText>
        </MotiView>

        <MotiView
          className="flex flex-col w-full items-center "
          animate={{
            scale: accountState === AccountState.PAYMENT ? 1 : 0,
            opacity: accountState === AccountState.PAYMENT ? 1 : 0,
          }}
          transition={{ type: "timing", duration: 300 }}
        >
          <MotiView className="flex mb-10 flex-row items-center justify-between  h-14 w-5/6">
            <View
              onTouchStart={() =>
                setPriceAmount((e) => String(Number(e) - 10000))
              }
            >
              <MinusIcon classStyle="w-5 h-5 fill-[#7E7E7E]" />
            </View>
            <View className="w-2/3 relative">
              <TextInput
                onChangeText={(e) => setPriceAmount(e)}
                value={splitNumber(String(priceAmount))}
                keyboardType="numeric"
                className="h-full font-[IRANSansBold] w-full text-[20px] border-2 text-center border-[#EFEFEF]  rounded-[23px] px-6"
              />
              <View className="absolute left-5 h-full items-center justify-center">
                <Text className="font-[IRANSansMedium] text-[14px] text-gray-500">
                  تومان
                </Text>
              </View>
            </View>
            <View
              onTouchStart={() =>
                setPriceAmount((e) => String(Number(e) + 10000))
              }
            >
              <PlusIcon classStyle="w-5 h-5 fill-[#7E7E7E]" />
            </View>
          </MotiView>
          <MotiView className="flex flex-row w-full justify-between ">
            <MotiView
              animate={{
                width: isCreatePaymentLoading ? "100%" : "70%",
              }}
              className={classNames(
                "bg-[rgb(205,205,205)] h-12 items-center justify-center rounded-[17px]",
                isCreatePaymentLoading ? "bg-[#cdcdcd]" : "bg-[#3B82F6]"
              )}
              transition={transition}
            >
              <Pressable
                onPress={() =>
                  mutateCreatePayment({
                    amount: Number(priceAmount),
                  })
                }
                disabled={isCreatePaymentLoading}
                className=" flex-1 w-full items-center justify-center"
              >
                {isCreatePaymentLoading ? (
                  <ActivityIndicator size={"small"} color={"#fff"} />
                ) : (
                  <Text className="text-white font-[IRANSansBold]">پرداخت</Text>
                )}
              </Pressable>
            </MotiView>
            <MotiView
              className=" h-12 w-[30%] items-center justify-center"
              animate={{
                scale: isCreatePaymentLoading ? 0 : 1,
                opacity: isCreatePaymentLoading ? 0 : 1,
              }}
              transition={transition}
            >
              <Pressable
                onPress={() => setAccountState(AccountState.ACCOUNT_INFO)}
                className=" w-full items-center justify-center"
              >
                <Text className="text-[#8C8C8C] font-[IRANSansMedium]">
                  انصراف
                </Text>
              </Pressable>
            </MotiView>
          </MotiView>
        </MotiView>
      </View>

      <View
        onTouchStart={() => {
          navigation.navigate("Logout");
        }}
        className="h-fit items-center gap-y-5"
      >
        <Text className="font-[IRANSans] text-[13px] text-[#515151]">
          خروج از حساب کاربری
        </Text>
        <Text className="font-[IRANSans] text-[#818181]">
          نسخه {Application.nativeApplicationVersion}
        </Text>
      </View>
      {/* 
      <TextInput
        value={value}
        onChangeText={(e) => setValue(e)}
        className="w-full h-22 bg-gray-100 "
        keyboardType="numeric"
      />
      <Pressable
        className="w-full justify-center items-center h-14"
        onPress={() =>
          mutateCreatePayment({
            amount: Number(value)
          })
        }
      >
        <Text>افزایش اعتبار</Text>
      </Pressable> */}
    </MotiView>
  );
};

export default Account;
