import { useMutation, useQueries } from "@tanstack/react-query";
import * as Application from "expo-application";
import {
  getNewPrice,
  ouathSnappRequest,
  snappConfigRequest,
  snappNewRideRequest,
  snappServiceTypesRequest,
  verifySnappSmsTokenRequest,
} from "../requests/snappAPIs";
import * as Device from "expo-device";
import * as Cellular from "expo-cellular";
import { Platform } from "react-native";

let cellularName: string = "";
async function getSnappConfigBodyPromise() {
  await Cellular.getCarrierNameAsync().then((e) => {
    cellularName = e;
  });
}

const headers = {
  locale: "fa-IR",
  "package-name": "cab.zipway.passenger",
  "user-agent": `${Platform.OS} ; ${Device.manufacturer} ${Device.modelName} ; Passenger/8.0.3`,
  "x-app-name": `passenger-${Platform.OS}`,
  "x-app-version": "8.0.3",
  "x-app-version-code": "251",
};

export function useSnappNewPrice() {
  const {
    isLoading: newSnappPriceLoading,
    data: newSnappPriceData,
    isSuccess: isSnappNewPriceSucceed,
    isError: isSnappNewPriceError,
    failureReason: snappNewPriceFailureReason,
    mutate: mutateSnappNewPrice,

  } = useMutation({
    mutationFn: (NewPricePostData: any) => getNewPrice(NewPricePostData),
  });

  return {
    newSnappPriceData,
    newSnappPriceLoading,
    isSnappNewPriceSucceed,
    isSnappNewPriceError,
    snappNewPriceFailureReason,
    mutateSnappNewPrice,
  };
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

export function useNewSnappRide() {
  const {
    data: snappNewRideData,
    isSuccess: isSnappNewRideSuccess,
    isError: isSnappNewRideError,
    error: snappNewRideError,
    mutate: mutateSnappNewRide,
  } = useMutation({
    mutationFn: (body) => snappNewRideRequest(body, headers),
  });

  return {
    snappNewRideData,
    isSnappNewRideSuccess,
    isSnappNewRideError,
    snappNewRideError,
    mutateSnappNewRide,
  };
}

const sampleResponse = {
  data: {
    is_first_ride: false,
    ride_id: "SNP-230219-89749-5297",
  },
  status: 200,
};

export function useSnappServiceTypes() {
  const {
    data: snappServiceData,
    isSuccess: isSnappServiceSuccess,
    isError: isSnappServiceError,
    error: snappServiceError,
    mutate: mutateSnappService,
    isLoading: isSnappServiceLoading,
  } = useMutation({
    mutationFn: (body: any) => snappServiceTypesRequest(body, headers),
  });
  return {
    snappServiceData,
    isSnappServiceSuccess,
    isSnappServiceError,
    snappServiceError,
    mutateSnappService,
    isSnappServiceLoading,
  };
}
