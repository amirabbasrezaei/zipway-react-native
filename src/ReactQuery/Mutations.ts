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

  const {
    data: zipwayConfigData,
    isSuccess: isZipwayConfigSuccess,
    error: zipwayConfigError,
    isError: isZipwayConfigError,
    failureReason: zipwayConfigFailureReason,
    mutate,
  } = trpc.app.zipwayConfig.useMutation();

  const mutateZipwayConfig = () => mutate({
    deviceModel: Device.modelName,
    deviceId: Application.androidId,
    phoneNumber,
    appVersion: Application.nativeApplicationVersion,
    deviceManufacturer: Device.manufacturer,
  });

  return {
    mutateZipwayConfig,
    zipwayConfigData,
    isZipwayConfigSuccess,
    zipwayConfigError,
    zipwayConfigFailureReason,
    isZipwayConfigError,
  };
}
