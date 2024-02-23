import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, SnappTextIcon } from "../Svgs";
import { PhoneNumberInput, StepState } from "./MaximLoginModal";
import classNames from "classnames";
import { useVerifySnappSmsToken } from "../../ReactQuery/SnappRequestHooks";
import * as SecureStore from "expo-secure-store";
import {
  getHash,
  requestHint,
  startOtpListener,
  useOtpVerify,
} from "react-native-otp-verify";
import { useVerifyMaximCode } from "../../ReactQuery/maximRequestHooks";
import { useAuthenticateStore } from "../../stores/authenticateStore";
import { MotiView } from "moti";

type Props = {
  step: StepState;
  setStep: (input: Props["step"]) => void;
  phoneNumberInput: PhoneNumberInput;
};

const MaximVerifySMS = ({ setStep, step, phoneNumberInput }: Props) => {
  const [code, setCode] = useState<string>("");
  const inputRef = useRef(null);
  const {maximAuthKey} = useAuthenticateStore()

  const {
    mutate: mutateVerifyMaximCode,
    data: verifyMaximCodeData,
    isLoading: isVerifyMaximCodeLoading,
    isSuccess: isVerifyMaximCodeSuccess,
  } = useVerifyMaximCode();
  const {
    otp,
    message: otpMessage,
    timeoutError,
    stopListener,
    startListener,
  } = useOtpVerify({ numberOfDigits: 4 });

  useEffect(() => {
    if (code.length === 4) {
      mutateVerifyMaximCode({ code, phoneNumber: phoneNumberInput, authKey: maximAuthKey });
    }
  }, [code]);

  useEffect(() => {
    if (otp) {
      setCode(otp);
    }
  }, [otp]);

  useEffect(() => {
    if (verifyMaximCodeData?.Success) {
      console.log(verifyMaximCodeData)
      setStep(0);
    }
  }, [isVerifyMaximCodeSuccess]);

  return (
    <MotiView
      from={{ translateX: 300, opacity: 0.5 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -300, opacity: 0.5 }}
      onTouchStart={(e) => e.stopPropagation()}
      style={{ elevation: 1 }}
      className="bg-white w-[80%] h-[340px]  shodow rounded-[10px] justify-between items-center flex flex-col p-4"
    >
      <View className="w-full justify-between flex-row-reverse mt-4 relative">
        <Image
          className="w-[100px] h-[26px] "
          source={require("../../../assets/maxim-logo.png")}
        />
        <Pressable
          hitSlop={10}
          className="flex-row justify-center items-center  absolute top-0 right-0"
          onPress={() => setStep(1)}
        >
          <ArrowLeftIcon classStyle="w-5 h-5 fill-gray-500" />
          <Text className="font-[IRANSansLight] text-gray-500 ml-2 text-xs">
            تغییر شماره
          </Text>
        </Pressable>
      </View>
      <Text className="text-gray-500 w-full font-[IRANSansMedium]">
        کد تائید را وارد کنید
      </Text>
      <View
        // onTouchStart={inputRef?.current?.focus}
        className="relative  w-full h-16 "
      >
        <TextInput
          selectionColor={"transparent"}
          ref={inputRef}
          className="text-gray-500 bg-transparent text-transparent absolute z-20 right-0 top-0 left-0 bottom-0  flex-1"
          autoFocus
          keyboardType="numeric"
          value={code}
          onChangeText={setCode}
          key={"hiddenTextInput"}
          autoComplete="sms-otp"
          textContentType="oneTimeCode"
          maxLength={6}
        />
        <View className="flex-1 z-10 justify-around flex flex-row gap-2">
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl font-[IRANSansMedium] text-gray-500">
              {code.length > 0 && code.charAt(0)}
            </Text>
          </View>
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl font-[IRANSansMedium] text-gray-500">
              {code.length > 0 && code.charAt(1)}
            </Text>
          </View>
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl font-[IRANSansMedium] text-gray-500">
              {code.length > 0 && code.charAt(2)}
            </Text>
          </View>
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl font-[IRANSansMedium] text-gray-500">
              {code.length > 0 && code.charAt(3)}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => {
          mutateVerifyMaximCode({ code, phoneNumber: phoneNumberInput, authKey: maximAuthKey });
        }}
        className={classNames(
          " h-[55]  w-full rounded-md mt-4 justify-center items-center",
          isVerifyMaximCodeLoading ? "bg-gray-100" : "bg-blue-500"
        )}
      >
        {isVerifyMaximCodeLoading ? (
          <ActivityIndicator size="small" color="rgb(59,130,246)" />
        ) : (
          <Text className="font-[IRANSansMedium] text-white">تائید</Text>
        )}
      </Pressable>
    </MotiView>
  );
};

export default MaximVerifySMS;
