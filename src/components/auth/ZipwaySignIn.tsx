import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { trpc } from "../../../utils/trpc";
import { useAuthenticateStore } from "../../stores/authenticateStore";
import { useOtpVerify } from "react-native-otp-verify";
import classNames from "classnames";
import * as NavigationBar from "expo-navigation-bar";
type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

(async () => {
  await NavigationBar.setBackgroundColorAsync("white");
})();
const ZipwaySignIn = ({ navigation }: Props) => {
  const {
    data: loginData,
    mutate: mutateLogin,
    isSuccess: isLoginSuccess,
    error: loginError,
    isError: isLoginError,
    isLoading: isLoginLoading,
  } = trpc.user.sendVerifyCode.useMutation();
  const { setPhoneNumber } = useAuthenticateStore();
  const [input, setInput] = useState<string>();
  useEffect(() => {
    if (isLoginSuccess && loginData.isNewUser) {
      navigation.navigate("newUser");
      return;
    }
    isLoginSuccess && navigation.navigate("verifyNumber");
  }, [isLoginSuccess]);

  useEffect(() => {
    if (isLoginError) {
      console.log(loginError);
    }
  }, [isLoginError]);

  const { hash } = useOtpVerify({ numberOfDigits: 6 });

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="font-[mplusroundBold] text-[45px] text-gray-800">
        ZIPWAY
      </Text>
      <View className="w-3/4">
        <TextInput
          keyboardType="numeric"
          value={input}
          onChangeText={(e) => !isNaN(Number(e)) && setInput(e)}
          placeholder="شماره همراه"
          className="bg-gray-100  font-[IRANSansMedium]  w-full h-[55] mt-10 rounded-md px-5"
        />
        <Pressable
          onPress={() => {
            setPhoneNumber(input);
            mutateLogin({ phoneNumber: input, hash: hash[0] });
          }}
          className={classNames(
            " h-[55] w-full rounded-md mt-4 justify-center items-center",
            isLoginLoading ? "bg-gray-100" : "bg-[#07a2fc]"
          )}
        >
          {isLoginLoading ? (
            <ActivityIndicator size="small" color="rgb(7,162,252)" />
          ) : (
            <Text className="font-[IRANSansMedium] text-white">ورود</Text>
          )}
        </Pressable>
        <Pressable className="mt-4" onPress={() => navigation.navigate("PrivacyPolicy")}>
          <Text className="font-[IRANSansMedium] text-gray-600 text-xs">
            ورود شما به معنای پذیرش
            <Text className="font-[IRANSansMedium] text-blue-600 text-xs"> قوانین حریم خصوصی </Text>
            است.
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ZipwaySignIn;
