import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { trpc } from "./../../utils/trpc";
type Props = {};

const TestAPIs = (props: Props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const {
    mutate,
    data: loginData,
    isSuccess: isLoginSuccess,
  } = trpc.user.loginUser.useMutation();
  const {
    data: usersData,
    isSuccess: isUsersDataSuccess,
    refetch,
    remove
  } = trpc.user.users.useQuery();


  return (
    <View className="p-4">
      <TextInput
        className="w-full bg-gray-100 h-20"
        value={phoneNumber}
        onChangeText={(e) => setPhoneNumber(e)}
      />
      <Pressable
        className="bg-black w-full h-20 justify-center items-center rounded-lg "
        onPress={() => {
          mutate({ phoneNumber, code: "111111" });
        }}
      >
        <Text className="text-white text-lg">login</Text>
      </Pressable>
      {isLoginSuccess ? <Text>{loginData.accessToken}</Text> : null}

      <Pressable
        className="bg-blue-500 h-20 w-full mt-10 rounded-lg justify-center items-center"
        onPress={() => {
            remove()
          refetch();
        }}
      >
        <Text className="text-lg text-white">Get Users phonenumber</Text>
      </Pressable>

      {isUsersDataSuccess ? (
        <View className="w-full h-fit">
          <Text>{usersData.map((e) => e.phoneNumber).join(" ")}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default TestAPIs;
