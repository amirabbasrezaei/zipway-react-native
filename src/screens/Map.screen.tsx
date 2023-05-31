import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Map from "../components/Map/Map";
import AnimatableBox from "../components/AnimatableBox";

import { useZipwayConfigStore } from "../stores/zipwayConfigStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";
import { WalletIcon } from "../components/Svgs";
import splitNumber from "../../utils/splitNumber";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

(async () => {
  await NavigationBar.setBackgroundColorAsync("white");
  await NavigationBar.setButtonStyleAsync("dark");
})();

const MapScreen = ({ navigation }: Props) => {
  const { height, width } = Dimensions.get("screen");
  const { appConfig } = useZipwayConfigStore();
  return (
    <>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <SafeAreaView className="relative flex flex-1">
        {appConfig?.mapStyles ? (
          <>
            <Map />
            <AnimatableBox navigation={navigation} />
            <Pressable
              onPress={() => navigation.navigate("Account")}
              style={{ elevation: 2, zIndex: 2 }}
              className="w-fit px-4 h-10 flex gap-x-2 flex-row bg-white absolute top-5 left-5 rounded-2xl items-center justify-center "
            >
              <View>
                <Text className="font-[IRANSansLight]">
                  ‌{splitNumber(String(appConfig.userInfo.credit))} تومان‌
                </Text>
              </View>
              <View>
                <WalletIcon classStyle="w-5 h-5 " />
              </View>
            </Pressable>
          </>
        ) : (
          <View className="flex-1 justify-center items-center bg-transparent">
            <View className="flex-row flex gap-4">
              <ActivityIndicator size={"small"} color="#000" />
              <Text className="font-[BlinkerBold] text-[40px]">ZipWay</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default MapScreen;
