import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { snappWaitingGifRequest } from "../requests/snappAPIs";

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const RideWaiting = ({ navigation }: Props) => {
  const [gif, setGif] = useState();
  useEffect(() => {
    snappWaitingGifRequest()
      .then((res) => {
        setGif(res["data"]["waiting_gif"]);
      })
      .catch(console.error);
  }, []);


  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="h-[300] w-[350]">
        {gif ? <Image className="h-[300] w-[350]" source={{ uri: gif }} /> : null}
      </View>
      <Pressable
        className="border border-blue-500 px-4 py-2 rounded-md"
        onPress={() => navigation.navigate("MapScreen")}
      >
        <Text className="font-[IRANSansBold] text-blue-500">لغو درخواست</Text>
      </Pressable>
    </View>
  );
};

export default RideWaiting;