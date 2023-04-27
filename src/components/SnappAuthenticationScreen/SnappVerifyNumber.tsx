import {
  View,
  Text,
  Keyboard,
  TextInput,
  PermissionsAndroid,
  
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useAuthenticateStore } from "../../stores/authenticateStore";
import { useVerifySnappSmsToken } from "../../ReactQuery/SnappRequestHooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  getHash,
  startOtpListener,
  useOtpVerify,
} from "react-native-otp-verify";


type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

async function saveTokens(data: any) {
  await SecureStore.setItemAsync(
    "snapp-accessToken",
    `Bearer ${data["access_token"]}`
  );
}

const VerifyNumber = ({ navigation }: Props) => {
  const {
    mutateVerifySnappSmsToken,
    verifySnappSmsTokenData,
    isVerifySnappSmsTokenSuccess,
  } = useVerifySnappSmsToken();

  const {setIsLoggedIn} = useAuthenticateStore()
  const inputRef = useRef(null);
  const [code, setCode] = useState<string>("");
  const { hash, otp, message, timeoutError, stopListener, startListener } =
    useOtpVerify({ numberOfDigits: 6 });

  useEffect(() => {
    if (code.length === 6) {
      mutateVerifySnappSmsToken(code);
    }
  }, [code]);

  useEffect(() => {
    if (isVerifySnappSmsTokenSuccess) {
      saveTokens(verifySnappSmsTokenData);
      navigation.navigate("MapScreen");
      setIsLoggedIn(true)
    }
  }, [verifySnappSmsTokenData]);

  useEffect(() => {
    startListener();
    if (message) {
      stopListener();
    }
  }, []);

  return (
    <View className="flex-1 justify-center items-center px-10 ">
      <View
        onTouchStart={inputRef?.current?.focus}
        className="relative  w-full h-20"
      >
        <TextInput
        selectionColor={'transparent'}
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
        <View  className="flex-1 z-10 justify-around flex flex-row gap-2">
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl text-gray-500">{code.length > 0 && code.charAt(0)}</Text>
          </View>
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl text-gray-500">{code.length > 0 && code.charAt(1)}</Text>
          </View>
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl text-gray-500">{code.length > 0 && code.charAt(2)}</Text>
          </View>
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl text-gray-500">{code.length > 0 && code.charAt(3)}</Text>
          </View>
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl text-gray-500">{code.length > 0 && code.charAt(4)}</Text>
          </View>
          <View className="bg-gray-100 flex-1 rounded-lg justify-center items-center">
            <Text className="text-xl text-gray-500">{code.length > 0 && code.charAt(5)}</Text>
          </View>
        </View>
      </View>
      <View className="h-12 bg-blue-500 w-full justify-center items-center rounded-md mt-10">
        <Text className="font-[IRANSansMedium] text-white text-center text-[17px]">
          ورود
        </Text>
      </View>
      <View
        className="  w-full mt-4"
        onTouchStart={() => {
          navigation.goBack();
        }}
      >
        <Text className="text-gray-600 font-[IRANSansMedium]  text-sm">
          تغییر شماره
        </Text>
      </View>
    </View>
  );
};

export default VerifyNumber;
