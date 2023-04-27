import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Map from "../components/Map/Map";
import AnimatableBox from "../components/AnimatableBox";
import { trpc } from "../../utils/trpc";
import { useZipwayConfigStore } from "../stores/zipwayConfigStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as NavigationBar from 'expo-navigation-bar';
import RideWaiting from "./RideWaiting.screen";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

(async () => {

  await NavigationBar.setBackgroundColorAsync("white");
  await NavigationBar.setButtonStyleAsync("dark")
})()

const MapScreen = ({ navigation }: Props) => {
  const { height, width } = Dimensions.get("screen");
  const { appConfig } = useZipwayConfigStore();
  return (
    <>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <SafeAreaView  className="realtive flex flex-1">
        {appConfig?.mapStyles ? (
          <>
            <Map />
            <AnimatableBox navigation={navigation} />
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
