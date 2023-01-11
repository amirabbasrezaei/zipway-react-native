import { useMutation } from "@tanstack/react-query";
import * as Application from "expo-application";
import * as Device from "expo-device";
import * as SecureStore from "expo-secure-store";
import {
  sendMaximVerifyCodeRequest,
  tapsiNewPriceRequest,
} from "../requests/maximAPIs";
import { useOtpVerify } from "react-native-otp-verify";
import { verifyMaximCode } from "../requests/maximAPIs";
import { useMapStore } from "../stores/mapStore";
const getPhoneNumber = async () => {
  let phoneNumber = String(await SecureStore.getItemAsync("phoneNumber"));
  return phoneNumber;
};

const reformatPhoneNumber = (phoneNumber) => {
  phoneNumber = phoneNumber.split("");
  phoneNumber[0] = "98";
  console.log(phoneNumber.join(""));
  return phoneNumber.join("");
};

const getMaximAuthKey = async () => {
  return await SecureStore.getItemAsync("maximAuthKey");
};

export function useSendMaximVerifyCode() {
  const sampleResponse = {
    AuthKey: "9DEB64F0-1BAC-4A9D-B4F1-BC4CEC43230D",
    Length: 4,
    Message: "Code sent to the speauthKeycified phone number.",
    NextTryInSeconds: 60,
    ResultCode: 0,
    ShortNumber: null,
    Success: true,
    SuggestToCallForOrdering: false,
    Type: "sms",
    UniversalDialog: null,
  };
  const { hash } = useOtpVerify({ numberOfDigits: 4 });

  return useMutation({
    mutationFn: ({ phoneNumber }: { phoneNumber: string }) => {
      console.log(phoneNumber);
      const body = {
        locale: "en",
        phone: reformatPhoneNumber(phoneNumber),
        type: "sms",
        smstoken: hash[0],
        isDefault: "1",
        mcc: "432",
      };
      return sendMaximVerifyCodeRequest(
        body,
        Device.modelName,
        Application.androidId + "f"
      );
    },
  });
}

export function useVerifyMaximCode() {
  return useMutation({
    mutationFn: ({
      code,
      phoneNumber,
      authKey,
    }: {
      code: string;
      phoneNumber: string;
      authKey: string;
    }) => {
      const body = {
        phone: reformatPhoneNumber(phoneNumber),
        authKey,
        type: "Sms",
        code: code,
        udid: "dbdd557d8431b68e",
      };

      console.log("send body", body);
      return verifyMaximCode(body, Device.modelName, Application.androidId);

      //   return (async () => {})();
    },
  });
}

export function useMaximPrice() {
  const { routeCoordinate } = useMapStore();

  return useMutation({
    mutationFn: () => {
      const body = {
        route: [
          {
            location: {
              latitude: routeCoordinate.origin[1],
              longitude: routeCoordinate.origin[0],
            },
          },
          {
            location: {
              latitude: routeCoordinate.destination[1],
              longitude: routeCoordinate.destination[0],
            },
          },
        ],
      };
      return tapsiNewPriceRequest(body, Application.androidId);
    },
  });
}
