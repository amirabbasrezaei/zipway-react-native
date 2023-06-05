import { View, Text, Pressable, Vibration } from 'react-native'
import React from 'react'
import { ArrowLeftIcon } from './Svgs'
import { MotiView } from 'moti'

type Props = {
    onPress: () => void
}

const CompareServiceButton = ({onPress}: Props) => {
  return (
    <Pressable
            onPress={() => {
                onPress()
              
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
              from={{ width: "100%" }}
              animate={{ width: "80%" }}
              className=" absolute right-0 bg-blue-500 h-full rounded-[25px] items-center justify-center"
            >
              <Text className="text-center font-[IRANSansMedium] text-[18] text-white">
                مقایسه سرویس ها
              </Text>
            </MotiView>
          </Pressable>
  )
}

export default CompareServiceButton