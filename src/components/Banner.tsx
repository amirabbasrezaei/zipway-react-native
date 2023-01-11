import { View, Text, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import { FocusContext } from "./FocusComponent";
import { XMarkIcon } from "./Svgs";

type BannerType = {
  message: string;
  canClose: boolean;
  image: any;
  bottomImage: any;
};

type Props = {
  banner: BannerType;
};

const Banner = ({ banner }: Props) => {
  const { setFocusState } = useContext(FocusContext);
  return (
    <View
      style={{ elevation: 3 }}
      className="flex-1 bg-blue-600 w-full justify-center items-center "
    >
      {banner?.canClose ? (
        <Pressable
          onPress={() => setFocusState(null)}
          className="absolute top-4 left-4"
        >
          <XMarkIcon classStyle="fill-gray-100 w-10 h-10" />
        </Pressable>
      ) : null}
      {banner?.image ? (
        <Image
          style={{ height: banner.image.height, width: banner.image.width }}
          className=""
          source={{ uri: banner.image.url }}
        />
      ) : null}
      {banner?.message ? (
        <Text className="text-white text-lg mt-6 font-[IRANSansMedium]">
          {banner.message}
        </Text>
      ) : null}
      {banner?.bottomImage ? (
        <Image
          style={{
            height: banner.bottomImage.height,
            width: banner.bottomImage.width,
          }}
          className="mt-6"
          source={{ uri: banner.bottomImage.url }}
        />
      ) : null}
    </View>
  );
};

export default Banner;
