import { View, Text } from 'react-native'
import React from 'react'
import { useNewSnappRide } from '../../ReactQuery/SnappRequestHooks'

type Props = {}

const TapsiNewRide = (props: Props) => {
    const {mutateSnappNewRide} = useNewSnappRide()
    const body = {
        destination_details: "بزرگراه یادگار امام، چهارم، دوم جنوبی",
        destination_lat: 35.786715889961236,
        destination_lng: 51.37838058767562,
        destination_place_id: 0,
        intercity_tcv: 0,
        is_for_friend: false,
        services: false,
        is_paid_by_recipient: false,
        round_trip: false,
        origin_lat: 35.773369886853914,
        origin_lng: 51.362965549362684,
        service_type: 1,
      };
  return (
    <View>
      <Text>Tapsi NewRide</Text>
    </View>
  )
}

export default TapsiNewRide