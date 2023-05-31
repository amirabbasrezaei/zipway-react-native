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
import { MinusIcon, PlusIcon, WalletIcon } from "../Svgs";
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
  const { appConfig } = useZipwayConfigStore();
  const [priceAmount, setPriceAmount] = useState<string>(
    String(appConfig.appInfo.minCreatePayment)
  );
  const isPriceAmountTrue = (price: number) => {
    if (
      price < appConfig.appInfo.minCreatePayment ||
      price > appConfig.appInfo.maxCreatePayment
    ) {
      return false;
    }
    return true;
  };
  const [accountState, setAccountState] = useState<AccountState>(
    AccountState.ACCOUNT_INFO
  );

  const {
    data: createPaymentData,
    mutate: mutateCreatePayment,
    isLoading: isCreatePaymentLoading,
    isSuccess: isCreatePaymentSuccess,
  } = trpc.payment.createPayment.useMutation();

  useEffect(() => {
    if (createPaymentData?.pay_link) {
      Linking.openURL(createPaymentData?.pay_link);
    }
  }, [isCreatePaymentSuccess]);

  useEffect(() => {
    if (accountState === AccountState.ACCOUNT_INFO) {
      setPriceAmount(String(appConfig.appInfo.minCreatePayment));
    }
  }, [accountState]);

  useEffect(() => {
    if (Number(priceAmount) < 0) {
      return setPriceAmount("0");
    }
  }, [priceAmount]);

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
      <View className=" h-fit w-full gap-y-10 justify-center items-center">
        <MotiView
          animate={{
            scale: accountState === AccountState.ACCOUNT_INFO ? 1 : 0,
            opacity: accountState === AccountState.ACCOUNT_INFO ? 1 : 0,
          }}
          transition={transition}
          className="items-center justify-center"
        >
          <MotiText className="font-[IRANSansLight] text-[20px] text-black">
            {appConfig.userInfo.name}
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
            width: accountState === AccountState.PAYMENT ? width : width - 60,
          }}
          transition={transition}
          className="w-fit h-30  rounded-lg flex flex-row  items-center justify-between"
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
            className="bg-[#F8F8F8]  px-4 py-2 rounded-[13px]"
          >
            <MotiText className="font-[IRANSansBold]  text-[#28ba48]">
              افزایش اعتبار
            </MotiText>
          </MotiView>
          <MotiView
            animate={{
              scale: accountState === AccountState.ACCOUNT_INFO ? 1 : 1.2,
              right:  accountState === AccountState.ACCOUNT_INFO ? 0 : width/3
            }}
            transition={transition}
            className="w-fit justify-center absolute items-center flex flex-row gap-x-3"
          >
            <MotiView>
              <Text className="font-[IRANSansMedium] text-[17px] text-[#464646]">
                ‌{splitNumber(String(appConfig.userInfo.credit))} تومان‌
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
            {appConfig.appInfo.createPaymentText}
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
            <Pressable
              disabled={
                isCreatePaymentLoading ||
                Number(priceAmount) <= appConfig.appInfo.minCreatePayment
              }
              hitSlop={15}
              onPress={() => setPriceAmount((e) => String(Number(e) - 10000))}
            >
              <MinusIcon
                classStyle={classNames(
                  "w-5 h-5 ",
                  Number(priceAmount) > appConfig.appInfo.minCreatePayment
                    ? "fill-[#7E7E7E]"
                    : "fill-gray-200"
                )}
              />
            </Pressable>
            <View className="w-2/3 relative">
              <TextInput
                onChangeText={(e) => {
                  setPriceAmount(e.split(",").join(""));
                }}
                value={splitNumber(String(priceAmount))}
                returnKeyType="go"
                onSubmitEditing={() =>
                  mutateCreatePayment({
                    amount: Number(priceAmount),
                  })
                }
                keyboardType="number-pad"
                editable={!isCreatePaymentLoading}
                className="h-full font-[IRANSansBold] w-full text-[20px] border-2 text-center border-[#EFEFEF]  rounded-[23px] px-6"
              />
              <View className="absolute left-5 h-full items-center justify-center">
                <Text className="font-[IRANSansMedium] text-[14px] text-gray-500">
                  تومان
                </Text>
              </View>
            </View>
            <Pressable
              disabled={isCreatePaymentLoading}
              hitSlop={15}
              onPress={() => setPriceAmount((e) => String(Number(e) + 10000))}
            >
              <PlusIcon classStyle="w-5 h-5 fill-[#7E7E7E]" />
            </Pressable>
          </MotiView>
          <MotiView className="flex flex-row w-full justify-between ">
            <MotiView
              className={classNames(
                "bg-[rgb(205,205,205)] w-2/3 h-12 items-center justify-center rounded-[17px]",
                isCreatePaymentLoading ||
                  !isPriceAmountTrue(Number(priceAmount))
                  ? "bg-[#cdcdcd]"
                  : "bg-[#3B82F6]"
              )}
              transition={transition}
            >
              <Pressable
                onPress={() =>
                  mutateCreatePayment({
                    amount: Number(priceAmount),
                  })
                }
                disabled={
                  isCreatePaymentLoading ||
                  !isPriceAmountTrue(Number(priceAmount))
                }
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
              className=" h-12  w-1/3 items-center justify-center"
              transition={transition}
            >
              <Pressable
                disabled={isCreatePaymentLoading}
                onPress={() => setAccountState(AccountState.ACCOUNT_INFO)}
                className=" w-full items-center justify-center"
                hitSlop={10}
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
