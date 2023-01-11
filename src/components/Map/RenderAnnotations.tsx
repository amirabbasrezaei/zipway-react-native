import MapboxGL from "@rnmapbox/maps";
import { Text, View } from "react-native";
import { RouteCoordinate } from "../../stores/mapStore";
import { OriginLocationIcon } from "../Svgs";

type RenderCoordinate = {
  routeCoordinate: RouteCoordinate;
};

function RenderAnnotations({ routeCoordinate }: RenderCoordinate) {
  return (
    <>
      {routeCoordinate?.origin ? (
        <MapboxGL.PointAnnotation
          id="origin"
          key="origin"
          coordinate={routeCoordinate.origin}
          anchor={{ x: 0.74, y: 0.8 }}
        >
          <View
            className="relative shadow-md h-[60] w-20 bg-transparent"
          >
            <View
              style={{ elevation: 3 }}
              className=" bg-white border-2 border-gray-100  w-20 h-[40] rounded-full flex flex-row justify-center items-center z-20"
            >
              <Text className="font-[IRANSansMedium] text-base text-gray-700 mr-1">
                مبدا
              </Text>
              <View className="rounded-full w-4 h-4 bg-teal-800" />
            </View>
            <View className="absolute top-5 right-[5] z-10 flex flex-col items-center">
              <OriginLocationIcon classStyle="fill-white w-[30]  h-[30] z-20" />
              <View className="w-2 h-2 rounded-full bg-gray-600 bottom-1" />
            </View>
          </View>
        </MapboxGL.PointAnnotation>
      ) : null}
      {routeCoordinate?.destination ? (
        <MapboxGL.PointAnnotation
          id="destination"
          key="destination"
          coordinate={routeCoordinate.destination}
          anchor={{ x: 0.74, y: 0.8 }}
        >
          <View
            className="relative shadow-md h-[60] w-20 bg-transparent"
          >
            <View
              style={{ elevation: 3 }}
              className=" bg-white border-2 border-gray-100  w-20 h-[40] rounded-lg flex flex-row justify-center items-center z-20"
            >
              <Text className="font-[IRANSansMedium] text-base text-gray-700 mr-1">
                مقصد
              </Text>
              <View className="rounded-md w-4 h-4 bg-blue-800" />
            </View>
            <View className="absolute top-5 right-[5] z-10 flex flex-col items-center">
              <OriginLocationIcon classStyle="fill-white w-[30]  h-[30] z-20" />
              <View className="w-2 h-2 rounded-full bg-gray-600 bottom-1" />
            </View>
          </View>
        </MapboxGL.PointAnnotation>
      ) : null}
    </>
  );
}

export default RenderAnnotations;
