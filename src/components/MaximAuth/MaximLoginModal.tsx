import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FocusContext, UseFocusContextArgs } from "../FocusComponent";
import MaximSignIn from "./MaximSignIn";
import MaximVerifySMS from "./MaximVerifySMS";

type Props = {};

export type StepState = number;
export type PhoneNumberInput = string;

const MaximLoginModal = (props: Props) => {
  const { focusState, setFocusState } =
    useContext<UseFocusContextArgs>(FocusContext);
  const [step, setStep] = useState<StepState>(1);
  const [phoneNumberInput, setPhoneNumberInput] =
    useState<PhoneNumberInput | null>(null);



  useEffect(() => {
    if (step === 0) {
      setFocusState(null);
    }
  }, [step]);
  return (
    <View
      onTouchStart={() => setFocusState(null)}
      className="flex-1 w-full h-full bg-transparent justify-center items-center "
    >
      {step === 1 ? (
        <MaximSignIn
          phoneNumberInput={phoneNumberInput}
          setPhoneNumberInput={setPhoneNumberInput}
          step={step}
          setStep={setStep}
        />
      ) : step === 2 ? (
        <MaximVerifySMS
          phoneNumberInput={phoneNumberInput}
          step={step}
          setStep={setStep}
        />
      ) : null}
    </View>
  );
};

export default MaximLoginModal;
