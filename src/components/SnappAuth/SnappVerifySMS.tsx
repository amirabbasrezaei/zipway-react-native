import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Motion } from "@legendapp/motion";
import { ArrowLeftIcon, SnappTextIcon } from "../Svgs";
import { PhoneNumberInput, StepState } from "./SnappLoginModal";
import classNames from "classnames";
import { useVerifySnappSmsToken } from "../../ReactQuery/SnappRequestHooks";
import * as SecureStore from "expo-secure-store";
import {
  getHash,
  requestHint,
  startOtpListener,
  useOtpVerify,
} from "react-native-otp-verify";
import { useAuthenticateStore } from "../../stores/authenticateStore";
import { BackHandler } from "react-native";

type Props = {
  step: StepState;
  setStep: (input: Props["step"]) => void;
  phoneNumberInput: PhoneNumberInput;
};

const SnappVerifySMS = ({ setStep, step, phoneNumberInput }: Props) => {
  const [code, setCode] = useState<string>("");
  const inputRef = useRef(null);

  const { setSnappAuthKey } = useAuthenticateStore();

  

  async function saveTokens(data: any) {
    const token = `Bearer ${data["access_token"]}`;
    await SecureStore.setItemAsync("snapp-accessToken", token);
    setSnappAuthKey(token);
  }

  const {
    mutateVerifySnappSmsToken,
    verifySnappSmsTokenData,
    isVerifySnappSmsTokenSuccess,
    isVerifySnappSmsTokenLoading,
  } = useVerifySnappSmsToken();

  useEffect(() => {
    if (code.length === 6) {
      mutateVerifySnappSmsToken({ token: code, phoneNumber: phoneNumberInput });
    }
  }, [code]);

  useEffect(() => {
    if (isVerifySnappSmsTokenSuccess) {
      saveTokens(verifySnappSmsTokenData);
      setStep(0);
    }
  }, [isVerifySnappSmsTokenSuccess]);

  useEffect(() => {
    const backAction = () => {
      setStep(1)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Motion.View
      initial={{ translateX: 300, opacity: 0.5 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -300, opacity: 0.5 }}
      onTouchStart={(e) => e.stopPropagation()}
      style={{ elevation: 1 }}
      className="bg-white w-[80%] h-[340px]  shodow rounded-[10px] justify-between items-center flex flex-col p-4"
    >
      <View className="w-full justify-between flex-row-reverse mt-4 relative">
        <SnappTextIcon classStyle="w-24 h-10 " />
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
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl font-[IRANSansMedium] text-gray-500">
              {code.length > 0 && code.charAt(4)}
            </Text>
          </View>
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl font-[IRANSansMedium] text-gray-500">
              {code.length > 0 && code.charAt(5)}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => {
          mutateVerifySnappSmsToken({
            token: code,
            phoneNumber: phoneNumberInput,
          });
        }}
        disabled={code.length < 5}
        className={classNames(
          " h-[50]  w-full rounded-md  justify-center items-center",
          code.length !== 6 ? "bg-gray-400" : "bg-blue-500"
        )}
      >
        {isVerifySnappSmsTokenLoading ? (
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

export default SnappVerifySMS;
