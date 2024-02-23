import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSendTapsiVerifySMS } from "../../ReactQuery/tapsiRequestHooks";
import { PhoneNumberInput, StepState } from "./SnappLoginModal";
import { ArrowLeftIcon, LoadingSpinner, SnappTextIcon, XMarkIcon } from "../Svgs";
import classNames from "classnames";
import {
  useSnappConfigMutation,
  useSnappRequestVerifySms,
} from "../../ReactQuery/SnappRequestHooks";
import { useAuthenticateStore } from "../../stores/authenticateStore";
import { MotiView } from "moti";

type Props = {
  step: StepState;
  setStep: (input: Props["step"]) => void;
  phoneNumberInput: PhoneNumberInput;
  setPhoneNumberInput: (input: Props["phoneNumberInput"]) => void;
};

const SnappSignIn = ({
  setStep,
  step,
  phoneNumberInput,
  setPhoneNumberInput,
}: Props) => {

  const { phoneNumber } = useAuthenticateStore();


  const {
    mutuateSnappRequestVerifySms,
    isSnappRequestVerifySmsLoading,
    snappRequestVerifySmsData,
    isSnappRequestVerifySmsSucceed,
  } = useSnappRequestVerifySms();

  const {
    snappConfigMutate,
    snappConfigData,
    isSnappConfigSuccess,
    isSnappConfigLoading,
  } = useSnappConfigMutation();


  useEffect(() => {
    if (!snappConfigData?.data.length && !isSnappConfigSuccess) {
      snappConfigMutate();
    }
  }, []);

  useEffect(() => {
    if (phoneNumber) {
      setPhoneNumberInput(phoneNumber);
    }
  }, []);

  useEffect(() => {
    const backAction = () => {
      setStep(0)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);



  useEffect(() => {
    if (isSnappRequestVerifySmsSucceed) {
      setStep(2);
    }
  }, [isSnappRequestVerifySmsSucceed]);

  return (
    <MotiView
    transition={{type: "timing", duration: 300}}
      from={{ translateX: 300, opacity: 0.5 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -300, opacity: 0.5 }}
      onTouchStart={(e) => e.stopPropagation()}
      style={{ elevation: 1 }}
      className="bg-white  w-[80%] h-[300px]  shodow rounded-[10px] justify-between items-center flex flex-col p-4"
    >
      <View className="w-full justify-between flex-row-reverse mt-4 relative">
      <SnappTextIcon classStyle="w-24 h-10 " />
        <Pressable
          hitSlop={10}
          className="flex-row justify-center items-center  absolute top-0 right-0"
          onPress={() => setStep(0)}
        >
          <XMarkIcon classStyle="w-5 h-5 fill-gray-500" />
        </Pressable>
      </View>
      <Text className="text-gray-500 w-full mt-4 font-[IRANSansMedium]">
        لطفا شماره ای که قبلا با آن در اسنپ ثبت نام کرده اید را وارد کنید
      </Text>
      <TextInput
        autoFocus
        keyboardType="numeric"
        value={phoneNumberInput}
        onChangeText={(e) => !isNaN(Number(e)) && setPhoneNumberInput(e)}
        placeholder="شماره موبایل"
        className="bg-gray-100  font-[IRANSansMedium]  w-full h-[50] mt-6 rounded-md px-5"
      />
      <Pressable
        onPress={() => {
          mutuateSnappRequestVerifySms({ cellphone: phoneNumberInput });
        }}
        onTouchStart={() => {}}
        disabled={phoneNumberInput?.length < 11 || phoneNumberInput === null}
        className={classNames(
          " h-[50]  w-full rounded-md  justify-center items-center",
          phoneNumberInput?.length < 11 || phoneNumberInput === null
            ? "bg-blue-200"
            : "bg-blue-500"
        )}
      >
        {isSnappRequestVerifySmsLoading ? (
          <ActivityIndicator
            color={"rgb(59,130,246)"}
            size={30}
            animating={true}
          />
        ) : (
          <Text className="font-[IRANSansMedium] text-white">ورود</Text>
        )}
      </Pressable>
    </MotiView>
  );
};

export default SnappSignIn;
