import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";
import { useAuthenticateStore } from "../../stores/authenticateStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import classNames from "classnames";
import { useOtpVerify } from "react-native-otp-verify";
type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const ZipwayNewUser = ({ navigation }: Props) => {
  const {
    data: createUserData,
    isLoading: isCreateUserLoading,
    mutate: mutateCreateUser,
  } = trpc.user.createUser.useMutation();
  const { hash } = useOtpVerify({ numberOfDigits: 6 });


  const [name, setName] = useState("");
  const { phoneNumber } = useAuthenticateStore();

  useEffect(() => {
    if (createUserData?.isUserCreated) {
      navigation.navigate("verifyNumber");
    }
  }, [createUserData]);

  return (
    <View className="flex-1 bg-white justify-center items-center p-3">
      <Text className="font-[mplusroundBold] text-[45px] text-gray-800">ZIPWAY</Text>

      <View className="w-[90%]">
        <TextInput
          keyboardType="default"
          value={name}
          onChangeText={(e) => setName(e)}
          placeholder="نام و نام خانوادگی"
          className="bg-white border border-gray-100  font-[IRANSansMedium] text-gray-700 focus:bg-white  w-full h-[55] mt-10 rounded-md px-5"
          placeholderTextColor={"rgb(156,163,175)"}
        />
        <Pressable
          onPress={() => {
            console.log({phoneNumber, nameAndFamily: name })
            mutateCreateUser({ phoneNumber, nameAndFamily: name, hash: hash[0] });
          }}
          className={classNames(
            " h-[55]  w-full rounded-md mt-4 justify-center items-center",
            isCreateUserLoading ? "bg-gray-100" : "bg-[#07a2fc]"
          )}
        >
          {isCreateUserLoading ? (
            <ActivityIndicator size="small" color="rgb(7,162,252)" />
          ) : (
            <Text className="font-[IRANSansMedium] text-white">ثبت نام</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default ZipwayNewUser;
