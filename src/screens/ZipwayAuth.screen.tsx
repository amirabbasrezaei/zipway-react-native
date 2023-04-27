import { View, Text, Image, StatusBar } from "react-native";
import React from "react";
import { MotiView, MotiImage, MotiText } from "moti";
import Svg, { G, Path, SvgXml } from "react-native-svg";
import * as NavigationBar from 'expo-navigation-bar';
type Props = {};

(async () => {
  await NavigationBar.setBackgroundColorAsync("white");
  await NavigationBar.setButtonStyleAsync("dark")
})()
const ZipwayAuthScreen = (props: Props) => {
  return (
    <>
    <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
    <View
      onTouchStart={() => console.log("pressed")}
      className="flex-1 h-full w-full bg-[#fff] justify-center items-center"
    >
      <MotiView className="flex flex-row justify-center  items-center w-3/4 h-fit ">
        <MotiView
          from={{ scale: 1, translateX: 0 }}
          animate={{ scale: 0.3, translateX: 0 }}
          transition={{ duration: 700, type: "timing" }}
          className="h-[131px] w-[131px] "
        >
          <Svg className="h-full w-full" viewBox="0 0 285 286" fill="none">
            <Path
              d="M258.815 42.3866C258.331 51.0637 255 59.3394 249.338 65.9326C234.804 83.4323 220.269 100.947 205.734 118.475C189.746 137.864 173.991 157.428 157.93 176.745C128.715 211.909 99.3264 246.952 69.763 281.874C67.9317 284.039 63.3097 285.158 60.2428 284.78C30.5777 280.943 16.1303 245.13 34.6619 221.177C44.7199 208.096 55.6063 195.8 66.0712 183.096C80.9692 165.015 95.6783 146.76 110.693 128.838C145.343 87.4148 180.139 46.1656 214.702 4.74187C218.016 0.832061 221.301 -0.127224 226.097 0.802992C245.123 4.46572 258.844 21.0061 258.815 42.3866Z"
              fill="#00171f"
            />
            <Path
              d="M184.107 1.0355C180.153 5.9482 177.232 9.75628 174.165 13.4045C161.084 29.2036 147.712 44.901 134.704 60.8309C133.368 62.6573 131.6 64.1235 129.558 65.0976C127.515 66.0718 125.263 66.5235 123.003 66.4122C84.7773 66.2233 46.5512 66.3105 8.31063 66.2814C-0.293871 66.2814 -0.72991 65.6855 0.520068 57.0665C5.14208 25.1775 31.5079 0.832017 63.5131 0.323305C101.492 -0.287149 139.529 0.148889 177.465 0.177959C179.692 0.349904 181.909 0.636129 184.107 1.0355Z"
              fill="#00171f"
            />
            <Path
              d="M101.739 284.679C103.905 281.772 105.227 279.911 106.71 278.138C121.753 260.072 136.622 241.918 151.985 224.127C154.485 221.411 157.926 219.749 161.607 219.476C200.356 219.157 239.106 219.404 277.884 219.157C284.541 219.157 285.442 221.831 284.846 227.47C281.474 259.65 253.161 285.013 218.946 285.376C182.377 285.769 145.808 285.478 109.239 285.376C107.16 285.449 105.126 285.042 101.739 284.679Z"
              fill="#00171f"
            />
          </Svg>
        </MotiView>
        <MotiText
          transition={{ duration: 700, type: "timing"}}
          className="text-[50px] text-[#0582ca] font-[mplusroundBold]  bottom-[0px]"
          from={{ opacity: 0, translateX:-100 }}
          animate={{ opacity: 1, translateX: -43 }}
        >
          IPWAY
        </MotiText>
      </MotiView>
    </View>
    </>
  );
};

export default ZipwayAuthScreen;
