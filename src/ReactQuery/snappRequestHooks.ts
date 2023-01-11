import { useMutation } from "@tanstack/react-query";
import * as Application from "expo-application";
import {
  ouathSnappRequest,
  snappConfigRequest,
  verifySnappSmsTokenRequest,
} from "../requests/snappAPIs";
import * as Device from "expo-device";
import * as Cellular from "expo-cellular";
import { useAuthenticateStore } from "../stores/authenticateStore";
import { Platform } from "react-native";
import * as AuthSession from "expo-auth-session";

let cellularName: string = "";
async function getSnappConfigBodyPromise() {
  await Cellular.getCarrierNameAsync().then((e) => {
    cellularName = e;
  });
}

export function useSnappConfigMutation() {
  const {
    mutate: snappConfigMutate,
    data: snappConfigData,
    isLoading: isSnappConfigLoading,

    isSuccess: isSnappConfigSuccess,
  } = useMutation({
    mutationFn: () => {
      (async () => await getSnappConfigBodyPromise())();

      const header = {
        locale: "fa-IR",
        "package-name": "cab.snapp.passenger",
        "x-app-name": "passenger-android",
        "x-app-version": "8.0.3",
        "x-app-version-code": 251,
      };

      const body = {
        android_secure_id: Application.androidId,
        os_version: Device.osVersion,
        carrier_name: cellularName,
        device_name: `${Device.brand} ${Device.modelName}`,
        device_type: 1,
        mac_address: "02:00:00:00:00:00",
        version_code: 251,
      };

      return snappConfigRequest({ body, header });
    },
  });
  return {
    snappConfigData,
    snappConfigMutate,
    isSnappConfigLoading,
    isSnappConfigSuccess,
  };
}

export function useSnappRequestVerifySms() {
  const {
    data: snappRequestVerifySmsData,
    isLoading: isSnappRequestVerifySmsLoading,
    mutate: mutuateSnappRequestVerifySms,
    isSuccess: isSnappRequestVerifySmsSucceed,
  } = useMutation({
    mutationFn: (data: { cellphone: string }) => {
      const { cellphone } = data;
      const body = {
        device_id: Application.androidId,
        cellphone,
      };
      const headers = {
        locale: "fa-IR",
        "package-name": "cab.zipway.passenger",
        "user-agent": `${Platform.OS} ; ${Device.manufacturer} ${Device.modelName} ; Passenger/8.0.3`,
        "x-app-name": `passenger-${Platform.OS}`,
        "x-app-version": "8.0.3",
        "x-app-version-code": "251",
      };
      return ouathSnappRequest(body, headers);
    },
  });
  return {
    isSnappRequestVerifySmsLoading,
    snappRequestVerifySmsData,
    mutuateSnappRequestVerifySms,
    isSnappRequestVerifySmsSucceed,
  };
}

export function useVerifySnappSmsToken() {
  const {
    data: verifySnappSmsTokenData,
    isLoading: isVerifySnappSmsTokenLoading,
    isSuccess: isVerifySnappSmsTokenSuccess,
    mutate: mutateVerifySnappSmsToken,
  } = useMutation({
    mutationFn: ({
      token,
      phoneNumber,
    }: {
      token: string;
      phoneNumber: string;
    }) => {
      const body = {
        cellphone: phoneNumber,
        device_id: Application.androidId,
        client_id: "android_293ladfa12938176yfgsndf",
        client_secret: "as;dfh98129-9111.*(U)jsflsdf",
        grant_type: "sms_v2",
        referrer: Platform.OS,
        token: token,
      };

      return verifySnappSmsTokenRequest(body);
    },
  });

  return {
    verifySnappSmsTokenData,
    isVerifySnappSmsTokenLoading,
    mutateVerifySnappSmsToken,
    isVerifySnappSmsTokenSuccess,
  };
}

const oathSampleBody = {
  grant_type: "sms_v2",
  client_id: "ios_sadjfhasd9871231hfso234",
  client_secret: "23497shjlf982734-=1031nln",
  cellphone: "+989038338886",
  token: "626811",
  referrer: "pwa",
  device_id: "49311921-052c-4e27-86f2-94e12510d839",
  secure_id: "49311921-052c-4e27-86f2-94e12510d839",
};

const sampleResponse = `
"client_id": "snapp-15242641026894969453",
      "client_secret": "aBXSlnNuYXBwlhd0JV09T4ySKvUelB-NwHVYz1rJtB7-qTcCGscfB3g=",
      "key": "0b72659ec2cfefd0f4635b6286929299aa8020ae",`;

const firebaseSnapp = `{
  "fid": "dfY_Uv96QAiENpsjnFJGTq",
  "authVersion": "FIS_v2",
  "appId": "1:35960493321:android:93b359725ebf8989",
  "sdkVersion": "a:16.3.3"
}`;
