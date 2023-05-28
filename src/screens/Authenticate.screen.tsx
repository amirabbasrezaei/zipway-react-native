import { StatusBar, Text, View, Image } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import ZipwaySignIn from "../components/auth/ZipwaySignIn";
import ZipwayVerifyNumber from "../components/auth/ZipwayVerifyNumber";
import { useZipwayConfigStore } from "../stores/zipwayConfigStore";
import ZipwayNewUser from "../components/auth/ZipwayNewUser";
import { useIsFocused } from "@react-navigation/native";
import { useZipwayConfig } from "../ReactQuery/Mutations";
import { trpc } from "../../utils/trpc";
import ZipwayAuthScreen from "./ZipwayAuth.screen";
import * as SplashScreen from "expo-splash-screen";
import { useSnappConfigMutation } from "../ReactQuery/SnappRequestHooks";
import {useQueryClient} from "@tanstack/react-query"

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const AuthStack = createNativeStackNavigator();
const AuthenticateScreen = ({ navigation }: Props) => {
  const client = useQueryClient
  const [appState, setAppState] = useState("LAUNCH");
  const params =
    navigation?.getState()?.routes[navigation.getState().index]?.params;
  const isFocused = useIsFocused();
  const { setAppConfig, appConfig } = useZipwayConfigStore();
  const { mutate: mutateAppLog } = trpc.app.log.useMutation();
  const { snappConfigMutate, snappConfigData, isSnappConfigSuccess } =
    useSnappConfigMutation();

  const {
    zipwayConfigError,
    zipwayConfigRefetch,
    zipwayConfigData,
    zipwayConfigFailureReason,
    isZipwayConfigStale,
  } = useZipwayConfig();

  isFocused && isZipwayConfigStale && zipwayConfigRefetch();

  useEffect(() => {
    if (isZipwayConfigStale) {

    }
  }, [isZipwayConfigStale]);

  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
    if (zipwayConfigData?.userInfo) {
      snappConfigMutate();
      setAppConfig(zipwayConfigData);
      setAppState("AUTHENTICATED");
      navigation.reset({
        index: 0,
        routes: [{ name: "MapScreen" }],
      });
    }
  }, [zipwayConfigData]);

  // useEffect(() => {
  //   if (snappConfigData) {
  //     console.log(snappConfigData);
  //   }
  // }, [isSnappConfigSuccess]);

  // console.log("zipwayConfigData", zipwayConfigData);
  console.log("isZipwayConfigStale", isZipwayConfigStale);
  // console.log("isZipwayConfigPreviousData", isZipwayConfigPreviousData);

  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
    if (zipwayConfigFailureReason?.data["httpStatus"] === 401) {
      setAppState("UNAUTHENTICATED");
      mutateAppLog({
        error: zipwayConfigFailureReason?.data,
        section: "AuthenticationScreen/zipwayErrorUseEffect",
      });
    }
  }, [zipwayConfigError]);

  useEffect(() => {
    mutateAppLog({
      section: "AuthenticationScreen/appStateUseEffect",
      message: `app state: ${appState}`,
    });
  }, [appState]);

  return (
    <>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      {appState === "LAUNCH" ? (
        <ZipwayAuthScreen />
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
      ) : (
        <View>
          <Text>fdsfg</Text>
        </View>
      )}
    </>
  );
};

export default AuthenticateScreen;
