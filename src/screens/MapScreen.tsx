import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Map from "../../src/components/Map/Map";
import SearchLocation from "../components/SearchLocation/SearchLocation";
import { trpc } from "../../utils/trpc";
import { useZipwayConfigStore } from "../stores/zipwayConfigStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const MapScreen = ({ navigation }: Props) => {
  const { height, width } = Dimensions.get("window");
  const { appConfig } = useZipwayConfigStore();
  return (
    <>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <SafeAreaView style={{ width, height }} className="realtive">
        {appConfig?.mapStyles ? (
          <>
            <Map />
            <SearchLocation />
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
