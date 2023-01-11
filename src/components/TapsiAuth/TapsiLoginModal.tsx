import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FocusContext, UseFocusContextArgs } from "../FocusComponent";
import TapsiSignIn from "./TapsiSignIn";
import TapsiVerifySMS from "./TapsiVerifySMS";
import { AnimatePresence } from "@legendapp/motion";
type Props = {};

export type StepState = number;
export type PhoneNumberInput = string

const TapsiLoginModal = (props: Props) => {
  const { focusState, setFocusState } =
    useContext<UseFocusContextArgs>(FocusContext);
  const [step, setStep] = useState<StepState>(1);
  const [phoneNumberInput, setPhoneNumberInput] = useState<PhoneNumberInput | null>(null);
  useEffect(() => {
    if(step === 0) {
        setFocusState(null)
    }
  }, [step])
  return (
    <View
      onTouchStart={() => setFocusState(null)}
      className="flex-1 w-full h-full bg-transparent justify-center items-center "
    >
      <AnimatePresence>
        {step === 1 ? (
          <TapsiSignIn phoneNumberInput={phoneNumberInput} setPhoneNumberInput={setPhoneNumberInput} step={step} setStep={setStep} />
        ) : step === 2 ? (
          <TapsiVerifySMS phoneNumberInput={phoneNumberInput} step={step} setStep={setStep}/>
        ) : null}
      </AnimatePresence>
    </View>
  );
};

export default TapsiLoginModal;
