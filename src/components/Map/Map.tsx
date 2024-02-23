import {
  View,
  PermissionsAndroid,
  Dimensions,
  BackHandler,
} from "react-native";

import MapboxGL, { Camera } from "@rnmapbox/maps";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useMapStore } from "../../stores/mapStore";
import RenderAnnotations from "./RenderAnnotations";
import { useSnappedPoint } from "../../ReactQuery/Mutations";
import MapBackButton from "./MapBackButton";
import MapMarker from "./MapMarker";
import UserLocation from "./UserLocation";
import { useZipwayConfigStore } from "../../stores/zipwayConfigStore";
import { useFocusEffect } from "@react-navigation/native";
import { FocusContext } from "../FocusComponent";
import Banner from "../Banner";
import { useAppStore } from "../../stores/appStore";
import { MotiView } from "moti";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiYW1pcmFiYmFzOTkiLCJhIjoiY2w5dnlwNG81MGRrZTN0bzZ4ZXdrd2JneSJ9.fvtyAcTO96naV6T0l13i4Q"
);
PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION");

type Props = {};

const Map = ({}: Props) => {
  const { height, width } = Dimensions.get("window");
  /// Hooks
  const { setFocusState } = useContext(FocusContext);
  const [cameraChanges, setCameraChanges] = useState<boolean>();
  const { appConfig } = useZipwayConfigStore();
  const { mutateSnappedPoint, snappedPointData, isSnappedPointLoading } =
    useSnappedPoint();
  const { activeTrip } = useAppStore();

  const camera = useRef<Camera>(null);
  const {
    setCameraLocation,
    routeCoordinate,
    searchedLocationCoordinate,
    setRouteCoordinate,
    setSearchedLocationCoordinate,
    userLocation,
    setUserLocation,
    cameraLocation,
    setIsCameraChanging,
    isCameraChanging
  } = useMapStore();

  /// fns

  function backButtonFn() {
    if (routeCoordinate?.destination) {
      setRouteCoordinate({ destination: null, destinationTitle: null });
      return;
    }
    if (routeCoordinate?.origin) {
      setRouteCoordinate({ origin: null, originTitle: null });
      return;
    }
  }

  function setTrafficLayersVisible(mapStyleJsonData) {
    mapStyleJsonData?.layers.map((layer) => {
      if (layer?.layout?.visibility === "none") {
        layer.layout.visibility = "visible";
      }
    });
    return JSON.stringify(mapStyleJsonData);
  }

  function moveToUserLocation() {
    if (userLocation) {
      camera.current?.setCamera({
        animationMode: "moveTo",
        centerCoordinate: [
          userLocation.coords.longitude,
          userLocation.coords.latitude,
        ],

        animationDuration: 500,
        type: "CameraStop",
        padding: {
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
        },
      });
    }
  }

  ///

  //// useEffects ////

  // useEffect(() => {
  //   if()
  //   const timeOut = setTimeout(() => {},100)
  //   return () => {
  //     clearTimeout(timeOut)
  //   }
  // },[
  //   cameraChanges
  // ])

  useEffect(() => {
    if (!routeCoordinate?.destination) {
      const timeOut = setTimeout(() => {
        mutateSnappedPoint(cameraLocation);
      }, 100);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [cameraLocation]);

  useEffect(() => {
    if (routeCoordinate?.destination && routeCoordinate?.origin) {
      camera.current?.setCamera({
        animationMode: "moveTo",
        animationDuration: 500,
        type: "CameraStop",
        padding: {
          paddingBottom: 200,
          paddingLeft: 100,
          paddingRight: 100,
          paddingTop: activeTrip ? 200 : 100,
        },
        bounds: (() => {
          return {
            ne: routeCoordinate?.destination,
            sw: routeCoordinate?.origin,
          };
        })(),
      });

      return () => {
        camera.current?.setCamera({
          animationMode: "moveTo",
          animationDuration: 500,
          type: "CameraStop",
          padding: {
            paddingBottom: 100,
            paddingLeft: 100,
            paddingRight: 100,
            paddingTop: 100,
          },
          bounds: (() => {
            return {
              ne: routeCoordinate?.destination,
              sw: routeCoordinate?.origin,
            };
          })(),
        });
      };
    }
  }, [routeCoordinate, activeTrip]);

  useEffect(() => {
    setTimeout(() => {
      if (
        searchedLocationCoordinate?.length &&
        !routeCoordinate?.destination &&
        !isSnappedPointLoading
      ) {
        camera.current?.setCamera({
          animationMode: "moveTo",
          centerCoordinate: searchedLocationCoordinate,
          // zoomLevel:  14,
          animationDuration: 500,
          type: "CameraStop",
          padding: {
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
          },
        });
      }
    }, 310);
  }, [searchedLocationCoordinate]);

  useEffect(() => {
    if (snappedPointData?.data && !routeCoordinate?.destination) {
      const snapToRoud = snappedPointData?.data["data"]["snap_to_road"];
      if (snapToRoud.length) {
        const { lat, lon } = snapToRoud[0]["snapped_points"][0]["point"];
        setSearchedLocationCoordinate([lon, lat]);
      }
    }
  }, [snappedPointData]);

  useFocusEffect(
    useCallback(() => {
      if (appConfig?.banner) {
        setFocusState({
          focusComonent: <Banner banner={appConfig.banner} />,
          exitAfterPress: appConfig.banner.canClose,
        });
      }
    }, [appConfig])
  );

  useEffect(() => {
    const backAction = () => {
      if (!routeCoordinate?.origin && !routeCoordinate?.destination) {
        BackHandler.exitApp();
      }

      if (routeCoordinate?.origin && !routeCoordinate?.destination) {
        setRouteCoordinate({ origin: null, originTitle: null });
        return true;
      }
      if (routeCoordinate?.destination) {
        setRouteCoordinate({ destination: null, destinationTitle: null });
        return true;
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [BackHandler, routeCoordinate]);

  //// ////

  return (
    <MotiView
      transition={{ type: "timing", duration: 300, delay: 500 }}
      style={{
        elevation: 1,
        zIndex: 1,
        height: activeTrip?.accepted ? height - 280 : height,
        width,
      }}
      className="flex justify-center items-center "
    >
      <View  style={{ width }} className="block flex-1">
        <MapboxGL.MapView
          pitchEnabled={false}
          preferredFramesPerSecond={60}
          rotateEnabled={false}
          scaleBarEnabled={false}
          logoEnabled={false}

          onMapIdle={(e) => {

            setIsCameraChanging(false);
            setCameraLocation(e.properties.center);
          }}
          onCameraChanged={() => {
            !isCameraChanging && setIsCameraChanging(true)
          }}
          className={classNames("flex-1")}
          styleJSON={setTrafficLayersVisible(appConfig.mapStyles)}
        >
          <MapboxGL.Camera ref={camera} />
          <RenderAnnotations routeCoordinate={routeCoordinate} />
          <MapboxGL.UserLocation  onUpdate={(e) => setUserLocation(e)} />
        </MapboxGL.MapView>
      </View>
      {!activeTrip?.accepted ? 
      
      <>
      <UserLocation
        routeCoordinate={routeCoordinate}
        moveToUserLocation={moveToUserLocation}
      />
      <MapBackButton
        backButtonFn={backButtonFn}
        routeCoordinate={routeCoordinate}
        setRouteCoordinate={setRouteCoordinate}
      />
      </>
      
       : null

      }
      

      <MapMarker routeCoordinate={routeCoordinate} />
      
    </MotiView>
  );
};

export default Map;
