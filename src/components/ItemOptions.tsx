import { View, Text, Vibration, Pressable, Alert } from "react-native";
import React, { ElementType, useContext, useRef, useState } from "react";
import { Motion } from "@legendapp/motion";
import { useThemeStore } from "../stores/appStore";
import { FocusContext, UseFocusContextArgs } from "./FocusComponent";
type Props = {
  children: JSX.Element | JSX.Element[];
  icon: any;
  exitFocusScreenAfterPress?: boolean;
};

const ItemsOptionBox = ({ children }) => {
  const { focusState, setFocusState } =
    useContext<UseFocusContextArgs>(FocusContext);
  return (
    <Motion.View
      style={{
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.5,
        elevation: 2,
        // shadowRadius: 4.65,
      }}
      transformOrigin={{ x: 0, y: 0 }}
      animate={{
        scale: focusState?.focusComonent ? 1 : 0.8,
        opacity: focusState?.focusComonent ? 1 : 0,
      }}
      className="drop-shadow-sm   absolute top-0 left-0  bg-white  flex-1 w-28 items-center rounded-[7px]"
    >
      {children}
    </Motion.View>
  );
};

const ItemOptions = ({
  children,
  icon,
  exitFocusScreenAfterPress = true,
}: Props) => {
  const ref = useRef(null);

  const { focusState, setFocusState } =
    useContext<UseFocusContextArgs>(FocusContext);
  return (
    <>
      {/* <Motion.View
        key="container"
        className="absolute top-0 right-0 left-0 bottom-0 bg-[#0000002e]"
        style={{ zIndex: 1, elevation: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      > */}

      <Pressable
        hitSlop={20}
        onPress={(e) => {
          Vibration.vibrate([40, 30]);
          e.currentTarget?.measure((x, y, width, height, pageX, pageY) => {
            setFocusState({
              focusComonent: <ItemsOptionBox>{children}</ItemsOptionBox>,
              componentCoordinates: {
                x: pageX,
                y: pageY,
              },
              exitAfterPress: exitFocusScreenAfterPress,
            });
          });
        }}
        className="relative"
      >
        <>
          <View ref={ref} className="px-2">
            {icon}
          </View>
        </>
      </Pressable>
    </>
  );
};

export default ItemOptions;
