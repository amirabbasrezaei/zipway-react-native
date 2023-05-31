import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getTapsiNewPrice,
  initPassengerRequest,
  requestTapsiSMSToken,
  tapsiCancelRideRequest,
  tapsiCancelRideWaitingRequest,
  tapsiRideRequest,
  tapsiRideStatusRequest,
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
    isError: isTapsiNewPriceError,
  } = useMutation({
    mutationFn: (body: any) => getTapsiNewPrice(body),
    retry: true,
    retryDelay: 2000,
  });
  return {
    tapsiNewPriceData,
    isTapsiNewPriceLoading,
    mutateTapsiNewPrice,
    isTapsiNewPriceSucceed,
    isTapsiNewPriceError,
  };
}

export function useTapsiRide() {
  const { routeCoordinate } = useMapStore();

  const body = {
    origin: {
      latitude: routeCoordinate.origin[1],
      longitude: routeCoordinate.origin[0],
    },
    destinations: [
      {
        latitude: routeCoordinate.destination[1],
        longitude: routeCoordinate.destination[0],
      },
    ],
    serviceKey: "NORMAL",
    token:
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJwcmV2aWV3RGF0YSI6eyJvcmlnaW4iOnsibGF0aXR1ZGUiOjM1LjcwNDYyNjQ2ODM2Mjk3NCwibG9uZ2l0dWRlIjo1MS4zNTY0NTY2MTM4Nzg0MzZ9LCJkZXN0aW5hdGlvbnMiOlt7ImxhdGl0dWRlIjozNS43MTU3MjgzNDAxMDE1MiwibG9uZ2l0dWRlIjo1MS4zNzE0NzIwMjc4OTkyNDR9XSwiaGFzUmV0dXJuIjpmYWxzZSwid2FpdGluZ1RpbWUiOjB9LCJwcmljZURhdGEiOlt7InNlcnZpY2VLZXkiOiJOT1JNQUwiLCJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclNoYXJlIjozOTAwMH0seyJzZXJ2aWNlS2V5IjoiUExVUyIsIm51bWJlck9mUGFzc2VuZ2VycyI6MSwicGFzc2VuZ2VyU2hhcmUiOjUxMDAwfSx7InNlcnZpY2VLZXkiOiJBU1NJU1RBTlQiLCJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclNoYXJlIjo0MzAwMH0seyJzZXJ2aWNlS2V5IjoiREVMSVZFUlkiLCJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclNoYXJlIjo0ODAwMH0seyJzZXJ2aWNlS2V5IjoiQklLRV9ERUxJVkVSWSIsIm51bWJlck9mUGFzc2VuZ2VycyI6MSwicGFzc2VuZ2VyU2hhcmUiOjQyMDAwfV0sInV1aWQiOiI4N2M3YTE3MC1mZGY3LTExZWQtOTY4ZC0wMWM0NjVhZjc5YTMiLCJpYXQiOjE2ODUzNDc1MDksImV4cCI6MTY4NTM0NzU3OSwiYXVkIjoiZG9yb3Noa2U6YXBwIiwiaXNzIjoiZG9yb3Noa2U6c2VydmVyIiwic3ViIjoiZG9yb3Noa2U6dG9rZW4ifQ.hsLJWqR4GAKHDDLRsVSYd2crREqhDJqya3RSgvsJCLdfXb8ZkGsaG--pvAH0yVcsfH1C0SSZUuJjfaCc-UysXQ",
    numberOfPassengers: 1,
    hasReturn: false,
    waitingTime: 0,
    gateway: "CAB",
    deliveryRequestDetails: {
      sender: null,
      receivers: null,
      payer: null,
      description: null,
      showDeliveryBottomSheet: false,
    },
    initiatedVia: "WEB",
  };

  const {
    data: tapsiRideData,
    isLoading: isTapsiRideLoading,
    mutate: mutateTapsiRide,
    isSuccess: isTapsiRideSucceed,
    isError: isTapsiRideError,
    error: tapsiRideError
  } = useMutation({
    mutationFn: (body: any) => tapsiRideRequest(body),
  });
  return {
    tapsiRideData,
    isTapsiRideLoading,
    mutateTapsiRide,
    isTapsiRideSucceed,
    isTapsiRideError,
    tapsiRideError
  };
}

export function useTapsiPassengerInit() {
  const {
    data: tapsiPassengerInitData,
    refetch: refetchTapsiPassengerInit,
    isLoading: isTapsiPassengerInitLoading,
  } = useQuery(["tapsiInitPassenger"], {
    queryFn: initPassengerRequest,
    staleTime: 10000,
    refetchInterval: 10000,
  });
  return {
    tapsiPassengerInitData,
    refetchTapsiPassengerInit,
    isTapsiPassengerInitLoading,
  };
}

export function useTapsiCancelRideWaiting() {
  const {
    data: tapsiCancelRideDataWaiting,
    isLoading: isTapsiCancelRideWaitingLoading,
    mutate: mutateTapsiCancelRideWaiting,
  } = useMutation({
    mutationFn: (rideId: string) => tapsiCancelRideWaitingRequest(rideId),
  });
  return {
    tapsiCancelRideDataWaiting,
    isTapsiCancelRideWaitingLoading,
    mutateTapsiCancelRideWaiting,
  };
}
export function useTapsiCancelRide() {
  const {
    data: tapsiCancelRideData,
    isLoading: isTapsiCancelRideLoading,
    mutate: mutateTapsiCancelRide,
  } = useMutation({
    mutationFn: ({ rideId, body }: { rideId: string; body: any }) =>
      tapsiCancelRideRequest({ rideId, body }),
  });
  return {
    tapsiCancelRideData,
    isTapsiCancelRideLoading,
    mutateTapsiCancelRide,
  };
}

export function useTapsiRideWaitingStatus(rideId: string) {
  const {
    data: tapsiRideWaitingStatusData,
    isLoading: isTapsiRideWaitingStatusLoading,
  } = useQuery(["tapsiRideWaitingStatus"], {
    queryFn: () => tapsiRideStatusRequest(rideId),
    refetchInterval: 5000,
  });
  return { tapsiRideWaitingStatusData, isTapsiRideWaitingStatusLoading };
}
