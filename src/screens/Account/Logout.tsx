import { View, Text, Image, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { trpc } from "../../../utils/trpc";
import { useZipwayConfigStore } from "../../stores/zipwayConfigStore";
import classNames from "classnames";
import { Restart } from "fiction-expo-restart";
import * as SecureStore from "expo-secure-store";
type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const Logout = ({ navigation }: Props) => {
  const { mutate, data, isLoading } = trpc.user.logout.useMutation();
  const {appConfig} = useZipwayConfigStore()
  useEffect(() => {
    if (data?.isUserLoggedout) {
      (async () => {
        await SecureStore.setItemAsync("maximAuthKey", null);

  
        await SecureStore.setItemAsync("phoneNumber", null);
  
  
        await SecureStore.setItemAsync("snapp-accessToken", null);
  
        await SecureStore.setItemAsync("tapsi-accessToken", null);

      })();
      Restart();
    }
  }, [data]);
  return (
    <View className="items-center justify-center flex-1 relative px-6">
      <Image
        className="w-[200px] "
        source={require("../../../assets/exit_account.png")}
      />
      <Text className="font-[IRANSansMedium] text-gray-600">
        {appConfig.appInfo.logoutAppText}
      </Text>
      <View className="w-full flex flex-row mt-20 ">
        <Pressable
          onPress={() => mutate()}
          disabled={isLoading}
          className={classNames(
            "bg-[rgb(205,205,205)] h-12 items-center w-1/2 justify-center rounded-[17px]",
            isLoading ? "bg-[#cdcdcd]" : "bg-[#f04646]"
          )}
        >
          {isLoading ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <Text className="text-white font-[IRANSansBold]">خروج</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          disabled={isLoading}
          className="w-1/2 justify-center items-center "
        >
          <Text className="font-[IRANSans]">انصراف</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Logout;
