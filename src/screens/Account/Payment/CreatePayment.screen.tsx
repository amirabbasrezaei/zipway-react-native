import { View, Text } from "react-native";
import React from "react";
import { trpc } from "../../../../utils/trpc";

type Props = {};

const CreatePayment = (props: Props) => {
  const {
    data: createPaymentData,
    mutate: mutateCreatePayment,
    isLoading: isCreatePaymentLoading,
  } = trpc.payment.createPayment.useMutation();
  return (
    <View>
      <Text>CreatePayment</Text>
    </View>
  );
};

export default CreatePayment;
