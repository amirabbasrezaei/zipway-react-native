import { View, Text, Dimensions } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

type Props = {};

const PriceLoading = (props: Props) => {
  return (
    <>
      <View className="border bg-[#ffffff60] border-gray-100 w-full h-[70] mt-5 rounded-[25px] justify-center items-center">
        <SkeletonPlaceholder
          backgroundColor="#fff"
          key={"main"}
          direction="left"
          borderRadius={4}
          speed={1000}
          highlightColor="#f6f6f6"
          angle={45}
        >
          <SkeletonPlaceholder.Item
            backgroundColor={"#fff"}
            width={Dimensions.get("window").width - 60}
            height={60}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            alignContent="flex-end"
          >
            <SkeletonPlaceholder.Item
              key={"child2"}
              width={100}
              height={40}
              borderRadius={25}
            />
            <SkeletonPlaceholder.Item flexDirection="row">
              <SkeletonPlaceholder.Item
                key={"child2"}
                width={100}
                height={40}
                borderRadius={25}
              />
              <SkeletonPlaceholder.Item
                key={"child3"}
                borderRadius={40}
                height={40}
                width={40}
                marginLeft={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    </>
  );
};

export default PriceLoading;
