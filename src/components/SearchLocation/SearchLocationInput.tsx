import {
  View,
  Text,
  TextInput,
  Pressable,
  Vibration,
  Keyboard,
} from "react-native";
import React, { useEffect } from "react";
import classNames from "classnames";
import { RouteCoordinate, useMapStore } from "../../stores/mapStore";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifierIcon,
  XMarkIcon,
} from ".././Svgs";
import { trpc } from "../../../utils/trpc";
import { MotiView } from "moti";
import CompareServiceButton from "../CompareServiceButton";
import { MotiPressable } from "moti/interactions";

type Props = {
  isInputActive: boolean;
  setIsInputActive: (input: any) => void;
  showNewTrip: boolean;
  setShowNewTrip: (input: Props["showNewTrip"]) => void;
};

const SearchLocationInput = ({
  isInputActive,
  setIsInputActive,
  setShowNewTrip,
}: Props) => {
  const {
    routeCoordinate,
    setSearchLocationInput,
    cameraLocation,
    searchLocationInput,
    setRouteCoordinate,
    isCameraChanging: isCameraChanging,
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
        isInputActive ? "top-4" : "top-1"
      )}
    >
      {isInputActive ? (
        <View
          onTouchEnd={() => {
            Keyboard.dismiss();
            setIsInputActive(false);
          }}
          className="w-full h-8  items-center flex-row-reverse px-2"
        >
          <ArrowRightIcon classStyle="w-[25px] h-[25px] fill-gray-600" />
        </View>
      ) : null}
      <View
        className={classNames(
          "flex justify-center items-center w-full ",
          isInputActive ? "flex-row" : "flex-col"
        )}
      >
        {!routeCoordinate?.origin ? (
          <View className={classNames("h-12 w-full flex-1 mt-2 relative")}>
            <TextInput
              placeholder="مبدا ..."
              className={classNames(
                "appearance-none  w-full bg-slate-50 flex-1 placeholder:font-[IRANSansMedium]  font-[IRANSansLight]  shadow-none h-12 pr-4 pl-12 rounded-[16px] text-[20]",
                routeCoordinate?.originTitle
                  ? "text-gray-500 "
                  : "text-gray-800 "
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
            {!isInputActive ? (
              <MagnifierIcon classStyle="w-5 h-5 absolute fill-gray-500 top-[15] left-[14]" />
            ) : null}
          </View>
        ) : null}
        {!isInputActive && !routeCoordinate?.origin ? (
          <MotiView
            className={classNames(
              "h-12 w-full  mt-[10]  rounded-[16px] flex items-center justify-center"
            )}
            animate={{
              backgroundColor: isCameraChanging ? "#a1a1a1" : "#027de8",
            }}
            transition={{ type: "timing", duration: 100 }}
          >
            <Pressable
              onPress={() => {
                const route: RouteCoordinate = {
                  origin: cameraLocation,
                  originTitle: searchLocationInput,
                  destination: null,
                  destinationTitle: null,
                };
                setRouteCoordinate(route);
                setSearchLocationInput("");
              }}
              disabled={isCameraChanging}
              className="flex-1 justify-center h-full w-full"
            ><Text className="text-center font-[IRANSansMedium] text-[18] text-white">
            تائید مبدا
          </Text></Pressable>
            
          </MotiView>
        ) : null}
        {routeCoordinate?.origin && !routeCoordinate?.destination ? (
          <View className="h-12 w-full flex-1 mt-2 relative">
            <TextInput
              placeholder="مقصد ..."
              className={classNames(
                "appearance-none  w-full bg-slate-50 flex-1 placeholder:font-[IRANSansMedium]  font-[IRANSansLight]  shadow-none h-12 pr-4 pl-12 rounded-[16px] text-[20]",
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
            <MagnifierIcon classStyle="w-5 h-5 absolute fill-gray-500 top-[15] left-[14]" />
          </View>
        ) : null}
        {!isInputActive &&
        routeCoordinate?.origin &&
        !routeCoordinate?.destination ? (
          <MotiView
            className={classNames(
              "h-12 w-full  mt-[10]  rounded-[16px] flex items-center justify-center"
            )}
            animate={{
              backgroundColor: isCameraChanging ? "#a1a1a1" : "#027de8",
            }}
            transition={{ type: "timing", duration: 100 }}
          >
            <Pressable
              onPress={() => {
                const route: RouteCoordinate = {
                  ...routeCoordinate,
                  destination: cameraLocation,
                  destinationTitle: searchLocationInput,
                };
                setRouteCoordinate(route);
              }}
              disabled={isCameraChanging}
              style={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              className="flex-1 justify-center h-full w-full"
            >
              <Text className="text-center  font-[IRANSansMedium] text-[18] text-white">
                تائید مقصد
              </Text>
            </Pressable>
          </MotiView>
        ) : null}
        {/* {routeCoordinate?.origin && routeCoordinate?.destination ? (
          <CompareServiceButton />
        ) : null} */}
      </View>
    </View>
  );
};

export default SearchLocationInput;
