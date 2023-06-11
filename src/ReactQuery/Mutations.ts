import { useMutation } from "@tanstack/react-query";
import { getSnappedPointRequest } from "../requests/snappAPIs";
import { trpc } from "../../utils/trpc";
import * as Device from "expo-device";
import * as Application from "expo-application";
import { useAuthenticateStore } from "../stores/authenticateStore";

export function useSnappedPoint() {
  const { mutate: mutateSnappedPoint, data: snappedPointData } = useMutation({
    mutationFn: (input: number[]) => {
      const dataToSend = {
        formatted_address: 1,
        lat: input[1],
        lng: input[0],
        service_type: 1,
        vehicles: 1,
      };
      return getSnappedPointRequest(dataToSend); //input 0 is latitude and 1 is longitude
    },
  });

  return {
    mutateSnappedPoint,
    snappedPointData,
  };
}

export function useZipwayConfig() {
  const { phoneNumber } = useAuthenticateStore();
  const { mutate: mutateAppLog } = trpc.app.log.useMutation();

  const {
    data: zipwayConfigData,
    isSuccess: isZipwayConfigSuccess,
    error: zipwayConfigError,
    isError: isZipwayConfigError,
    failureReason: zipwayConfigFailureReason,
    refetch: zipwayConfigRefetch,
    isLoading: isZipwayConfigLoading,
    isStale: isZipwayConfigStale,
  } = trpc.app.zipwayConfig.useQuery({
    deviceModel: Device.modelName,
    deviceId: Application.androidId,
    appVersion: Application.nativeApplicationVersion,
    deviceManufacturer: Device.manufacturer,
  });

  if (isZipwayConfigError) {
    mutateAppLog({
      error: zipwayConfigError,
      section: "inside useZipwayConfig Hook",
      message: {
        deviceModel: Device.modelName,
        deviceId: Application.androidId,
        phoneNumber,
        appVersion: Application.nativeApplicationVersion,
        deviceManufacturer: Device.manufacturer,
      },
    });
  }

  return {
    zipwayConfigData,
    isZipwayConfigSuccess,
    zipwayConfigError,
    zipwayConfigFailureReason,
    isZipwayConfigError,
    zipwayConfigRefetch,
    isZipwayConfigLoading,
    isZipwayConfigStale
  };
}


