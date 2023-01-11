import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useMapStore } from "../../stores/mapStore";
import { Motion } from "@legendapp/motion";
import { MotiView } from 'moti'
import SearchLocationInput from "./SearchLocationInput";
import SearchResults from "./SearchResults";
import NewTrip from "../Trips/NewTrip";
import { trpc } from "../../../utils/trpc";

type Props = {};
const { height, width } = Dimensions.get("window");

const SearchLocation = ({}: Props) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [showNewTrip, setShowNewTrip] = useState<boolean>(false);
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
    transition={{ type: 'timing', duration: 200 }}
      animate={{
        height:
          isInputActive ||
          (routeCoordinate?.destination &&
            routeCoordinate?.origin &&
            showNewTrip)
            ? height
            : routeCoordinate?.destination &&
              routeCoordinate?.origin &&
              !showNewTrip
            ? 70
            : 130,
        bottom:
          isInputActive ||
          (routeCoordinate?.destination &&
            routeCoordinate?.origin &&
            showNewTrip)
            ? 0
            : 20,
      }}
      className="absolute flex left-0 right-0 z-10 justify-center items-center drop-shadow-lg "
      style={{ elevation: 3, zIndex: 3 }}
      children={
        <MotiView
        transition={{ type: 'timing', duration: 200 }}
          animate={{
            width:
              isInputActive ||
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
          }}
          className="bg-white  flex-1 h-full "
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.7,
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
              {showNewTrip ? <NewTrip setShowNewTrip={setShowNewTrip} /> : null}
            </>
          }
        />
      }
    />
  );
};

export default SearchLocation;
