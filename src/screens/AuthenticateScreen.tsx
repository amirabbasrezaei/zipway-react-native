import { StatusBar, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useAuthenticateStore } from "../stores/authenticateStore";
import ZipwaySignIn from "../components/auth/ZipwaySignIn";
import ZipwayVerifyNumber from "../components/auth/ZipwayVerifyNumber";
import { useZipwayConfigStore } from "../stores/zipwayConfigStore";
import { trpc } from "../../utils/trpc";
import ZipwayNewUser from "../components/auth/ZipwayNewUser";

import * as SplashScreen from "expo-splash-screen";
import { useZipwayConfig } from "../ReactQuery/Mutations";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const AuthStack = createNativeStackNavigator();
const AuthenticateScreen = ({ navigation }: Props) => {
  const [appState, setAppState] = useState("LAUNCH");
  const { setAppConfig, appConfig } = useZipwayConfigStore();
  const {isZipwayConfigSuccess, zipwayConfigData,zipwayConfigFailureReason, isZipwayConfigError, mutateZipwayConfig} = useZipwayConfig()


  useEffect(() => {
    if (isZipwayConfigSuccess) {
      setAppConfig(zipwayConfigData);
      navigation.navigate("MapScreen");
      setAppState("AUTHENTICATED");
      (async () => {
        await SplashScreen.hideAsync();
      })();
    }
  }, [zipwayConfigData]);

  useEffect(() => {
    if (zipwayConfigFailureReason?.data["httpStatus"] === 401) {
      // (async () => {
      //   await SplashScreen.hideAsync();
      // })();
      setAppState("UNAUTHENTICATED");
    }
  }, [isZipwayConfigError]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      mutateZipwayConfig()
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

useEffect(() => {
  if (appConfig) {
    // (async () => {
    //   await SplashScreen.hideAsync();
    // })();
    navigation.navigate("MapScreen");
  }
},[appConfig])

  return (
    <>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      {appState === "LAUNCH" ? (
        <View className="flex-1 h-full w-full bg-white">
          <Image
            resizeMode="contain"
            className="flex-1 w-full h-full"
            source={require("../../assets/splash.png")}
          />
        </View>
      ) : appState === "UNAUTHENTICATED" ? (
        <AuthStack.Navigator
          screenOptions={{ headerShown: false, animation: "slide_from_left" }}
          initialRouteName="signIn"
        >
          <AuthStack.Screen name="signIn" component={ZipwaySignIn} />
          <AuthStack.Screen
            name="verifyNumber"
            component={ZipwayVerifyNumber}
          />
          <AuthStack.Screen name="newUser" component={ZipwayNewUser} />
        </AuthStack.Navigator>
      ) : null}
    </>
  );
};

export default AuthenticateScreen;
