import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { Motion } from "@legendapp/motion";
import { PhoneNumberInput, StepState } from "./MaximLoginModal";
import { XMarkIcon } from "../Svgs";
import classNames from "classnames";
import { useSendMaximVerifyCode } from "../../ReactQuery/maximRequestHooks";
import * as SecureStore from "expo-secure-store";
import { useAuthenticateStore } from "../../stores/authenticateStore";

type Props = {
  step: StepState;
  setStep: (input: Props["step"]) => void;
  phoneNumberInput: PhoneNumberInput;
  setPhoneNumberInput: (input: Props["phoneNumberInput"]) => void;
};

const MaximSignIn = ({
  setStep,
  step,
  phoneNumberInput,
  setPhoneNumberInput,
}: Props) => {
  const {
    data: sendMaximVerifyCodeData,
    isSuccess: isSendMaximVerifyCodeSuccess,
    mutate: mutateSendMaximVerifyCode,
    isLoading: isSendMaximVerifyCodeLoading,
  } = useSendMaximVerifyCode();

  const { setMaximAuthKey, phoneNumber, maximAuthKey } = useAuthenticateStore();
  useEffect(() => {
    if (phoneNumber) {
      console.log("phoneNumber, maximAuthKey", phoneNumber, maximAuthKey)
      setPhoneNumberInput(phoneNumber);
    }
  }, []);

  useEffect(() => {
    console.log(sendMaximVerifyCodeData);
    if (sendMaximVerifyCodeData?.Success) {
      console.log(sendMaximVerifyCodeData)
      setMaximAuthKey(sendMaximVerifyCodeData.AuthKey);
      (async () =>
        await SecureStore.setItemAsync(
          "maximAuthKey",
          sendMaximVerifyCodeData.AuthKey
        ))();
      setStep(2);
    }
  }, [sendMaximVerifyCodeData]);

  return (
    <Motion.View
      initial={{ translateX: 300, opacity: 0.5 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -300, opacity: 0.5 }}
      onTouchStart={(e) => e.stopPropagation()}
      style={{ elevation: 1 }}
      className="bg-white  w-[80%] h-[300px]  shodow rounded-[10px] justify-between items-center flex flex-col p-4"
    >
      <View className="w-full justify-between flex-row-reverse mt-4 relative">
        <Image
          className="w-[100px] h-[26px] "
          source={require("../../../assets/maxim-logo.png")}
        />
        <Pressable
          hitSlop={10}
          className="flex-row justify-center items-center  absolute top-0 right-0"
          onPress={() => setStep(0)}
        >
          <XMarkIcon classStyle="w-5 h-5 fill-gray-500" />
        </Pressable>
      </View>
      <Text className="text-gray-500 w-full mt-4 font-[IRANSansMedium]">
        لطفا شماره ای که قبلا با آن در ماکسیم ثبت نام کرده اید را وارد کنید
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
          mutateSendMaximVerifyCode({phoneNumber});
        }}
        disabled={phoneNumberInput?.length < 11 || phoneNumberInput === null}
        className={classNames(
          " h-[50]  w-full rounded-md  justify-center items-center",
          phoneNumberInput?.length < 11 ||
            phoneNumberInput === null ||
            isSendMaximVerifyCodeLoading
            ? "bg-gray-200"
            : "bg-blue-500"
        )}
      >
        {isSendMaximVerifyCodeLoading ? (
          <ActivityIndicator
            color={"rgb(59,130,246)"}
            size={30}
            animating={true}
          />
        ) : (
          <Text className="font-[IRANSansMedium] text-white">ورود</Text>
        )}
      </Pressable>
    </Motion.View>
  );
};

export default MaximSignIn;
