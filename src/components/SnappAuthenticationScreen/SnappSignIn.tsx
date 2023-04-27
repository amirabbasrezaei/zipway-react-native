import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import {
  useSnappConfigMutation,
  useSnappRequestVerifySms,
} from "../../ReactQuery/SnappRequestHooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuthenticateStore } from "../../stores/authenticateStore";
import {
  startReadSMS,
  requestReadSMSPermission,
} from "@maniac-tech/react-native-expo-read-sms";
import { trpc } from "../../../utils/trpc";
type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const SignIn = ({ navigation }: Props) => {
  const { setSnappConfig, snappConfig } = useAuthenticateStore();
  const { data, mutate, isSuccess } = trpc.user.createUser.useMutation();

  useEffect(() => {
    isSuccess && console.log(data);
  }, [data]);

  const { mutuateSnappRequestVerifySms, snappRequestVerifySmsData } =
    useSnappRequestVerifySms();

  const { snappConfigMutate, snappConfigData, isSnappConfigSuccess } =
    useSnappConfigMutation();
  const [input, setInput] = useState<string>();

  useEffect(() => {
    if (!snappConfigData?.data.length && !isSnappConfigSuccess) {
      snappConfigMutate();
    }
  }, []);

  useEffect(() => {
    if (isSnappConfigSuccess) {
      const temp = {
        phoneNumber: input,
        clientId: snappConfigData.data["cedar_map_data"]["client_id"],
        clientSecret: snappConfigData.data["cedar_map_data"]["client_secret"],
        key: snappConfigData.data["cedar_map_data"]["key"],
      };

      setSnappConfig(temp);
    }
  }, [isSnappConfigSuccess]);

  useEffect(() => {
    if (snappRequestVerifySmsData?.status === "OK") {
      if (isSnappConfigSuccess) {
        navigation.navigate("verifyNumber");
      }
    }
  }, [snappRequestVerifySmsData]);

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-[BlinkerBold] text-[40px]">ZipWay</Text>
      <View className="w-3/4">
        <TextInput
          keyboardType="numeric"
          value={input}
          onChangeText={(e) => !isNaN(Number(e)) && setInput(e)}
          placeholder="شماره همراه"
          className="bg-gray-100  font-[IRANSansMedium]  w-full h-[50] mt-10 rounded-md px-5"
        />
        <View
          onTouchStart={() => {
            // setSnappConfig({ phoneNumber: input });
            // mutuateSnappRequestVerifySms({ cellphone: input });
            mutate({ phoneNumber: "09038338886" });
          }}
          className="bg-blue-500 h-[50]  w-full rounded-md mt-4 justify-center items-center"
        >
          <Text className="font-[IRANSansMedium] text-white">ورود</Text>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
