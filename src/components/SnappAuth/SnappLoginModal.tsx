import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FocusContext, UseFocusContextArgs } from "../FocusComponent";
import SnappSignIn from "./SnappSignIn";
import SnappVerifySMS from "./SnappVerifySMS";

type Props = {};

export type StepState = number;
export type PhoneNumberInput = string

const SnappLoginModal = (props: Props) => {
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
      
        {step === 1 ? (
          <SnappSignIn phoneNumberInput={phoneNumberInput} setPhoneNumberInput={setPhoneNumberInput} step={step} setStep={setStep} />
        ) : step === 2 ? (
          <SnappVerifySMS phoneNumberInput={phoneNumberInput} step={step} setStep={setStep}/>
        ) : null}

    </View>
  );
};

export default SnappLoginModal;
