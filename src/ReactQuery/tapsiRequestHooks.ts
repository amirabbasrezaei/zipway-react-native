import { useMutation } from "@tanstack/react-query";
import {
  getTapsiNewPrice,
  requestTapsiSMSToken,
  verifyTapsiSMSToken,
} from "../requests/tapsiAPIs";
import { useMapStore } from "../stores/mapStore";

export function useSendTapsiVerifySMS() {
  const {
    data: tapsiVerifySMSData,
    isLoading: isTapsiVerifySMSLoading,
    mutate: mutateTapsiVerifySMS,
    isSuccess: isTapsiVerifySMSSucceed,
  } = useMutation({
    mutationFn: (phoneNumber: string) => {
      const body = {
        credential: {
          phoneNumber,
          role: "PASSENGER",
        },
        otpOption: "SMS",
      };
      return requestTapsiSMSToken(body);
    },
  });
  return {
    tapsiVerifySMSData,
    isTapsiVerifySMSLoading,
    mutateTapsiVerifySMS,
    isTapsiVerifySMSSucceed,
  };
}

export function useTapsiVerifyToken() {
  const {
    data: tapsiVerifyTokenData,
    isLoading: isTapsiVerifyTokenLoading,
    isSuccess: isTapsiVerifyTokenSucceed,
    mutate: mutateTapsiVerifyToken,
  } = useMutation({
    mutationFn: ({
      token,
      phoneNumber,
    }: {
      token: string;
      phoneNumber: string;
    }) => {
      const body = {
        credential: {
          phoneNumber: phoneNumber,
          role: "PASSENGER",
        },
        confirmation: {
          code: token,
        },
        deviceInfo: {
          platform: "WEBAPP",
        },
      };
      return verifyTapsiSMSToken(body);
    },
  });
  return {
    tapsiVerifyTokenData,
    isTapsiVerifyTokenLoading,
    isTapsiVerifyTokenSucceed,
    mutateTapsiVerifyToken,
  };
}

export function useTapsiNewPrice() {
  const {
    data: tapsiNewPriceData,
    isLoading: isTapsiNewPriceLoading,
    mutate: mutateTapsiNewPrice,
    isSuccess: isTapsiNewPriceSucceed,
    isError: isTapsiNewPriceError
  } = useMutation({
    mutationFn: (body: any) => getTapsiNewPrice(body),
  });
  return {
    tapsiNewPriceData,
    isTapsiNewPriceLoading,
    mutateTapsiNewPrice,
    isTapsiNewPriceSucceed,
    isTapsiNewPriceError
  };
}
