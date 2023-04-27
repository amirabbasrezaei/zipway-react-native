import { Dimensions, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useMapStore } from "../stores/mapStore";
import { Motion } from "@legendapp/motion";
import { MotiView } from "moti";
import SearchLocationInput from "./SearchLocation/SearchLocationInput";
import SearchResults from "./SearchLocation/SearchResults";
import NewPrices from "./NewPrice/NewPrices";
import { trpc } from "../../utils/trpc";
import { useAppStore } from "../stores/appStore";
import NewRide from "./NewRide/NewRide";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};
const { height: windowHeight, width } = Dimensions.get("window");

const AnimatableBox = ({ navigation }: Props) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [showNewTrip, setShowNewTrip] = useState<boolean>(false);
  const { activeTrip } = useAppStore();
  const {
    mutate: mutatePlaceBaseSearch,
    data: placeBaseSearchData,
    isSuccess: isPlaceBaseSearchSuccess,
  } = trpc.app.placeBaseSearch.useMutation();
  const {
    searchLocationInput,
    setSearchLocationsResult,
    routeCoordinate,
    cameraLocation,
  } = useMapStore();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (searchLocationInput) {
        mutatePlaceBaseSearch({
          searchTerm: searchLocationInput,
          latitude: String(cameraLocation[1]),
          longitude: String(cameraLocation[0]),
        });
      }
    }, 100);
    return () => {
      clearTimeout(timeOut);
    };
  }, [searchLocationInput]);

  useEffect(() => {
    if (isPlaceBaseSearchSuccess && searchLocationInput) {
      setSearchLocationsResult(placeBaseSearchData.items);
    }
  }, [placeBaseSearchData]);

  return (
    <MotiView
      transition={{ type: "timing", duration: 300 }}
      animate={{
        height: activeTrip?.accepted
          ? 300
          : isInputActive ||
            (routeCoordinate?.destination &&
              routeCoordinate?.origin &&
              showNewTrip)
          ? windowHeight
          : routeCoordinate?.destination &&
            routeCoordinate?.origin &&
            !showNewTrip
          ? 70
          : 130,
        bottom: activeTrip?.accepted
          ? 0
          : isInputActive ||
            (routeCoordinate?.destination &&
              routeCoordinate?.origin &&
              showNewTrip)
          ? 0
          : 20,
      }}
      className="absolute  flex left-0 right-0 z-10 justify-center items-center drop-shadow-lg "
      style={{ elevation: 3, zIndex: 3 }}
      children={
        <MotiView
          transition={{ type: "timing", duration: 300 }}
          animate={{
            width: activeTrip?.accepted
              ? width
              : isInputActive ||
                (routeCoordinate?.destination &&
                  routeCoordinate?.origin &&
                  showNewTrip)
              ? width
              : routeCoordinate?.destination &&
                routeCoordinate?.origin &&
                !showNewTrip
              ? width - 80
              : width - 50,
            borderRadius:
              isInputActive ||
              (routeCoordinate?.destination &&
                routeCoordinate?.origin &&
                showNewTrip)
                ? 0
                : routeCoordinate?.destination &&
                  routeCoordinate?.origin &&
                  !showNewTrip
                ? 30
                : 24,
            borderTopLeftRadius: activeTrip?.accepted ? 30 : null,
            borderTopRightRadius: activeTrip?.accepted ? 30 : null,
          }}
          className="bg-white  flex-1 h-full "
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            elevation:
              routeCoordinate?.destination &&
              routeCoordinate?.origin &&
              !showNewTrip
                ? 0
                : 3,
            backgroundColor:
              routeCoordinate?.destination &&
              routeCoordinate?.origin &&
              !showNewTrip
                ? "transparent"
                : "white",
          }}
          children={
            <>
              {showNewTrip && !activeTrip?.accepted ? (
                <NewPrices
                  navigation={navigation}
                  setShowNewTrip={setShowNewTrip}
                />
              ) : activeTrip?.accepted ? (
                <NewRide />
              ) : (
                <>
                  <SearchLocationInput
                    showNewTrip={showNewTrip}
                    setShowNewTrip={setShowNewTrip}
                    isInputActive={isInputActive}
                    setIsInputActive={setIsInputActive}
                  />
                  {isInputActive ? (
                    <SearchResults
                      isInputActive={isInputActive}
                      setIsInputActive={setIsInputActive}
                    />
                  ) : null}
                </>
              )}
            </>
          }
        />
      }
    />
  );
};

export default AnimatableBox;
