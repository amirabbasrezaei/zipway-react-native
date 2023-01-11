import { View, Text, Image, Pressable, TextInput, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Motion } from "@legendapp/motion";
import { FocusContext, UseFocusContextArgs } from "../FocusComponent";
import { ArrowLeftIcon, LoadingSpinner } from "../Svgs";
import { PhoneNumberInput, StepState } from "./TapsiLoginModal";
import { useTapsiVerifyToken } from "../../ReactQuery/tapsiRequestHooks";
import classNames from "classnames";

type Props = {
  step: StepState;
  setStep: (input: Props["step"]) => void;
  phoneNumberInput: PhoneNumberInput;
};

const TapsiVerifySMS = ({ setStep, step, phoneNumberInput }: Props) => {
  const [code, setCode] = useState<string>("");
  const inputRef = useRef(null);

  const { mutateTapsiVerifyToken, isTapsiVerifyTokenSucceed, isTapsiVerifyTokenLoading } =
    useTapsiVerifyToken();

  useEffect(() => {
    if (code.length === 5) {
      mutateTapsiVerifyToken({
        phoneNumber: phoneNumberInput,
        token: code,
      });
    }
  }, [code]);

  useEffect(() => {
    if(isTapsiVerifyTokenSucceed){
      setStep(0)
    }
  },[isTapsiVerifyTokenSucceed])

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
        <Image
          className="w-[114px] h-[26px] mb-5"
          source={require("../../../assets/tapsi-logo-fa.png")}
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
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl font-[IRANSansMedium] text-gray-500">
              {code.length > 0 && code.charAt(4)}
            </Text>
          </View>

        </View>
      </View>

      <Pressable
        onPress={() => {
          mutateTapsiVerifyToken({
            phoneNumber: phoneNumberInput,
            token: code,
          });
        }}
        disabled={code.length < 5}
        className={classNames(
          " h-[50]  w-full rounded-md  justify-center items-center",
          code.length < 5 ? "bg-gray-400" : "bg-blue-500"
        )}
      >
        {isTapsiVerifyTokenLoading ? <ActivityIndicator color={'rgb(59,130,246)'}  size={30} animating={true}  /> : <Text className="font-[IRANSansMedium] text-white">ورود</Text> }
      </Pressable>
    </Motion.View>
  );
};

export default TapsiVerifySMS;
