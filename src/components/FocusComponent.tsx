import { AnimatePresence, Motion } from "@legendapp/motion";
import { createContext,  useState } from "react";
import {  View } from "react-native";

interface FocusState {
  focusComonent: any;
  componentCoordinates?: { x: number; y: number } | null;
  exitAfterPress: boolean | null;
}
export interface UseFocusContextArgs {
  focusState: FocusState | null;
  setFocusState: (input: FocusState) => void;
}

const FocusContext = createContext<UseFocusContextArgs>({
  focusState: null,
  setFocusState: () => {},
});

interface Props {
  children: JSX.Element | JSX.Element[] | null;
}

const FocusComponentProvider = ({ children }: Props) => {
  const [focusState, setFocusState] = useState<FocusState | null>();
  return (
    <FocusContext.Provider value={{ focusState, setFocusState }}>
      <AnimatePresence>
        {children}
        {focusState?.focusComonent != null ? (
          <Motion.View
            key="container"
            className="absolute top-0 right-0 left-0 bottom-0 bg-[#0000000d]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onTouchStart={() => {
              setFocusState(null);
            }}
          >
            <View
              className="flex-1"
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              onTouchEnd={() => {
                focusState?.exitAfterPress && setFocusState(null);
              }}
              style={{
                position: focusState?.componentCoordinates ? "absolute" : null,
                top: focusState?.componentCoordinates
                  ? focusState.componentCoordinates?.y
                  : null,
                left: focusState?.componentCoordinates
                  ? focusState.componentCoordinates?.x
                  : null,
                display: focusState?.componentCoordinates ? null : "flex",
                justifyContent: focusState?.componentCoordinates
                  ? null
                  : "center",
                alignItems: focusState?.componentCoordinates ? null : "center",
              }}
            >
              {focusState?.focusComonent}
            </View>
          </Motion.View>
        ) : null}
      </AnimatePresence>
    </FocusContext.Provider>
  );
};

export { FocusComponentProvider, FocusContext };
