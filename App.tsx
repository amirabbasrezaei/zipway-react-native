import React, { useEffect } from "react";
import MapScreen from "./src/screens/Map.screen";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthenticateScreen from "./src/screens/Authenticate.screen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "expo-dev-client";
import { FocusComponentProvider } from "./src/components/FocusComponent";
import TRPCProvider from "./src/providers/TRPCProvider";
import { useZipwayConfigStore } from "./src/stores/zipwayConfigStore";
import { useAuthenticateStore } from "./src/stores/authenticateStore";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import PrivacyPolicy from "./src/screens/PrivacyPolicy.screen";
import RideWaiting from "./src/screens/RideWaiting.screen";
import * as Linking from "expo-linking";
import AccountScreen from "./src/screens/Account/Account.screen";
import PaymentFailed from "./src/screens/Account/Payment/PaymentFailed";
import PaymentSuccess from "./src/screens/Account/Payment/PaymentSuccess";
import Logout from "./src/screens/Account/Logout";

const queryClient = new QueryClient();

export const RootStack = createNativeStackNavigator();
(async () => {
  await SplashScreen.preventAutoHideAsync();
})();

export default function App() {
  const [fontsLoaded] = useFonts({
    IRANSansMedium: require("./assets/MobileFonts/IRANSansMobile(FaNum)_Medium.ttf"),
    IRANSansLight: require("./assets/MobileFonts/IRANSansMobile(FaNum)_Light.ttf"),
    IRANSansUltraLight: require("./assets/MobileFonts/IRANSansMobile(FaNum)_UltraLight.ttf"),
    IRANSansBold: require("./assets/MobileFonts/IRANSansMobile(FaNum)_Bold.ttf"),
    IRANSans: require("./assets/MobileFonts/IRANSansMobile(FaNum).ttf"),
    BlinkerBold: require("./assets/MobileFonts/Blinker-Bold.ttf"),
    mplusround: require("./assets/MobileFonts/mplusround.ttf"),
    mplusroundBold: require("./assets/MobileFonts/mplusround-bold.ttf"),
  });

  const { appConfig } = useZipwayConfigStore();
  const { setMaximAuthKey, setPhoneNumber, setSnappAuthKey, setTapsiAuthKey } =
    useAuthenticateStore();

    console.log(appConfig)

  /// setting user information in global state(zustand)
  useEffect(() => {
    (async () => {
      const maximAuthKey = await SecureStore.getItemAsync("maximAuthKey");
      if (maximAuthKey) {
        setMaximAuthKey(maximAuthKey);
      }

      const phoneNumber = await SecureStore.getItemAsync("phoneNumber");
      if (phoneNumber) {
        setPhoneNumber(phoneNumber);
      }

      const snappToken = await SecureStore.getItemAsync("snapp-accessToken");
      if (snappToken) {
        setSnappAuthKey(snappToken);
      }

      const tapsiToken = await SecureStore.getItemAsync("tapsi-accessToken");
      if (tapsiToken) {
        setTapsiAuthKey(tapsiToken);
      }
    })();
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(255, 45, 85)",
    },
  };

  const config = {
    screens: {
      Account: "account",
    },
  };
  const linking = {
    prefixes: [Linking.createURL("/"), "https://zipway.ir"],
    config,
  };

  return (
    <TRPCProvider queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <FocusComponentProvider>
          {fontsLoaded ? (
            <NavigationContainer
              linking={linking}
              theme={{
                ...DefaultTheme,
                colors: {
                  ...DefaultTheme.colors,
                  background: "white",
                },
              }}
            >
              <RootStack.Navigator
                screenOptions={{ animation: "slide_from_right" }}
                initialRouteName="AuthScreen"
              >
           
      
                  <RootStack.Screen
                      name="MapScreen"
                      component={MapScreen}
                      options={{
                        title: "map",
                        headerShown: false,
                        animation: "fade_from_bottom",
                      }}
                    />
                  <RootStack.Screen
                      name="Account"
                      component={AccountScreen}
                      options={{
                        title: "حساب کاربری",
                        headerShown: false,
                        animation: "slide_from_left",
                      }}
                    />
                    
                    <RootStack.Screen
                      name="RideWaiting"
                      component={RideWaiting}
                      options={{
                        title: "map",
                        headerShown: false,
                        animation: "flip",
                      }}
                    />
                    
                    <RootStack.Screen
                      name="Logout"
                      component={Logout}
                      options={{
                        title: "خروج از حساب",
                        headerShown: false,
                        animation: "fade_from_bottom",
                      }}
                    />
                    <RootStack.Screen
                      name="PaymentFailed"
                      component={PaymentFailed}
                      options={{
                        title: "تراکنش ناموفق",
                        headerShown: false,
                        animation: "fade",
                      }}
                    />
                    <RootStack.Screen
                      name="PaymentSuccess"
                      component={PaymentSuccess}
                      options={{
                        title: "تراکنش موفق",
                        headerShown: false,
                        animation: "fade",
                      }}
                    />
                    <RootStack.Screen
                      name="PrivacyPolicy"
                      component={PrivacyPolicy}
                      options={{
                        title: "PrivacyPolicy",
                        headerShown: false,
                        animation: "slide_from_right",
                      }}
                    />
                 
          
                  <RootStack.Screen
                    name="AuthScreen"
                    component={AuthenticateScreen}
                    options={{ title: "hi", headerShown: false }}
                  />
            

                {/* <RootStack.Screen name="testLogin" component={TestAPIs} /> */}
              </RootStack.Navigator>
            </NavigationContainer>
          ) : null}
        </FocusComponentProvider>
      </QueryClientProvider>
    </TRPCProvider>
  );
}
