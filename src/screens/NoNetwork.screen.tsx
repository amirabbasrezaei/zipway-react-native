import { View, Text, ScrollView } from 'react-native'
import React from 'react'

type Props = {}

const NoNetwork = (props: Props) => {
  return (
    <ScrollView   className=" w-full h-full flex-1 ">
          {/* <View className="px-4 h-full  ">
            <SnappPrice
              requestButton={requestButton}
              navigation={navigation}
              setRequestButton={setRequestButton}
            />
            <TapsiPrice
              requestButton={requestButton}
              setRequestButton={setRequestButton}
              navigation={navigation}
            />
            <MaximTrip />
          </View> */}
          {Array.from({length: 20}, (e, index) => index).map((e) => <View key={e} className="h-14 w-full bg-black mt-10"></View>)}
          
        </ScrollView>
  )
}

export default NoNetwork