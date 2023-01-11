import {
  View,
  Text,
  TextInput,
  Keyboard,
  Pressable,
  Vibration,
} from "react-native";
import React, { useEffect } from "react";
import classNames from "classnames";
import { RouteCoordinate, useMapStore } from "../../stores/mapStore";
import { ArrowLeftIcon, XMarkIcon } from ".././Svgs";
import { useQuery } from "@tanstack/react-query";
import { Motion } from "@legendapp/motion";
import { trpc } from "../../../utils/trpc";
import { MotiView } from 'moti'


type Props = {
  isInputActive: boolean;
  setIsInputActive: (input: any) => void;
  showNewTrip: boolean;
  setShowNewTrip: (input: Props["showNewTrip"]) => void;
};

const SearchLocationInput = ({
  isInputActive,
  setIsInputActive,
  showNewTrip,
  setShowNewTrip,
}: Props) => {
  const {
    routeCoordinate,
    setSearchLocationInput,
    cameraLocation,
    searchLocationInput,
    setRouteCoordinate,
  } = useMapStore();

  const {
    data: coordinateToAddressData,
    isSuccess: isCoordinateToAddressSuccedd,
    mutate: mutateCoordinateToAddress,
  } = trpc.app.coordinateToAddress.useMutation();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      mutateCoordinateToAddress({
        latitude: cameraLocation[1],
        longitude: cameraLocation[0],
      });
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [cameraLocation]);

  useEffect(() => {
    if (isCoordinateToAddressSuccedd && !isInputActive) {
      setSearchLocationInput(coordinateToAddressData.formatted_address);
    }
  }, [isCoordinateToAddressSuccedd]);
  return (
    <View
      style={{ elevation: 4 }}
      className={classNames(
        "flex-1 absolute w-full px-3 shadow-none flex flex-col justify-center items-center",
        isInputActive ? "top-6" : "top-1"
      )}
    >
      <View
        className={classNames(
          "flex justify-center items-center w-full",
          isInputActive ? "flex-row" : "flex-col"
        )}
      >
        {isInputActive ? (
          <View
            onTouchEnd={() => {
              Keyboard.dismiss();
              setIsInputActive(false);
            }}
            className="w-8 h-8 mr-3 ml-2"
          >
            <XMarkIcon classStyle="w-8 h-8 fill-black" />
          </View>
        ) : null}
        {!routeCoordinate?.origin ? (
          <>
            <TextInput
              placeholder="مبدا ..."
              className={classNames(
                "appearance-none  w-full mt-2 flex-1 placeholder:font-[IRANSansMedium]  font-[IRANSansLight]  shadow-none h-12 px-4  rounded-[16px] text-lg   ",
                routeCoordinate?.originTitle
                  ? "text-gray-500 bg-gray-100"
                  : "text-gray-800 bg-gray-100"
              )}
              value={
                routeCoordinate?.originTitle
                  ? routeCoordinate.originTitle
                  : searchLocationInput
              }
              onChangeText={(e) => setSearchLocationInput(e)}
              onSubmitEditing={() => setIsInputActive(false)}
              onFocus={() => {
                setIsInputActive(true);
                setSearchLocationInput("");
              }}
              cursorColor={"#000"}
              editable={!routeCoordinate?.origin}
            />
          </>
        ) : null}
        {!isInputActive && !routeCoordinate?.origin ? (
          <View
            onTouchEnd={() => {
              const route: RouteCoordinate = {
                origin: cameraLocation,
                originTitle: searchLocationInput,
                destination: null,
                destinationTitle: null,
              };
              setRouteCoordinate(route);
              setSearchLocationInput("");
            }}
            className="h-12 mt-[10] w-full bg-blue-500 rounded-[16px] flex items-center justify-center"
          >
            <Text className="text-center font-[IRANSansMedium] text-[18] text-white">
              تائید مبدا
            </Text>
          </View>
        ) : null}
        {routeCoordinate?.origin && !routeCoordinate?.destination ? (
          <>
            <TextInput
              placeholder="مقصد ..."
              className={classNames(
                "appearance-none bg-slate-50 mt-2 w-full flex-1 placeholder:font-[IRANSansMedium]  font-[IRANSansLight]  shadow-none h-12 px-4  rounded-[16px] text-lg   ",
                routeCoordinate?.destinationTitle
                  ? "text-gray-600"
                  : "text-gray-800"
              )}
              value={
                routeCoordinate?.destinationTitle
                  ? routeCoordinate.destinationTitle
                  : searchLocationInput
              }
              onChangeText={(e) => setSearchLocationInput(e)}
              onSubmitEditing={() => setIsInputActive(false)}
              onFocus={() => {
                setIsInputActive(true);
                setSearchLocationInput("");
              }}
              cursorColor={"#000"}
              editable={!routeCoordinate?.destination}
            />
          </>
        ) : null}
        {!isInputActive &&
        routeCoordinate?.origin &&
        !routeCoordinate?.destination ? (
          <View
            onTouchEnd={() => {
              const route: RouteCoordinate = {
                ...routeCoordinate,
                destination: cameraLocation,
                destinationTitle: searchLocationInput,
              };
              setRouteCoordinate(route);
            }}
            className="h-12 w-full bg-black mt-[10]  rounded-[16px] flex items-center justify-center"
          >
            <Text className="text-center font-[IRANSansMedium] text-[18] text-white">
              تائید مقصد
            </Text>
          </View>
        ) : null}
        {routeCoordinate?.origin && routeCoordinate?.destination ? (
          <Pressable
            onPress={() => {
              setShowNewTrip(true);
              Vibration.vibrate([50, 50]);
            }}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              elevation: 6,
            }}
            className="h-14 w-full bg-white   mt-[3] rounded-[25px] flex flex-row items-center justify-between"
          >
            <View className="h-full w-[20%]  items-center justify-center">
              <ArrowLeftIcon classStyle="fill-black w-8 h-8" />
            </View>
            <MotiView
              transition={{ duration: 100, type: "timing" }}
              from={{width: "100%"}}
              animate={{ width: "80%" }}
              className=" absolute right-0 bg-black h-full rounded-[25px] items-center justify-center"
            >
              <Text className="text-center font-[IRANSansMedium] text-[18] text-white">
                مقایسه سرویس ها
              </Text>
            </MotiView>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default SearchLocationInput;
