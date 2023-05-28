import { ScrollView, BackHandler, Keyboard } from "react-native";
import { useMapStore } from "../../stores/mapStore";

import SearchLocationItem from "./SearchLocationItem";
import { useEffect } from "react";


type Props = {
  isInputActive: boolean;
  setIsInputActive: (input: any) => void;
};

const SearchResults = ({ isInputActive, setIsInputActive }: Props) => {
  const { searchLocationResults } = useMapStore();

  useEffect(() => {
    const backAction = () => {
      Keyboard.dismiss();
      setIsInputActive(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView
      className="mt-[120] overflow-scroll px-3 "
      style={{ elevation: 4 }}
    >
      {searchLocationResults.length
        ? searchLocationResults.map((loc: any, index) => (
            <SearchLocationItem
              setIsInputActive={setIsInputActive}
              location={loc}
              key={index}
            />
          ))
        : null}
    </ScrollView>
  );
};

export default SearchResults;
