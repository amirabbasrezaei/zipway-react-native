import classNames from "classnames";
import {ScrollView} from "react-native";
import { useMapStore } from "../../stores/mapStore";

import { SearchLocationResultType } from "./SearchLocation";
import SearchLocationItem from "./SearchLocationItem";

type Props = {
  isInputActive: boolean;
  setIsInputActive: (input: any) => void;
};

const SearchResults = ({ isInputActive, setIsInputActive }: Props) => {
  const { searchLocationResults } = useMapStore();

  return (
        <ScrollView
          className="mt-[70] overflow-scroll px-3"
          style={{ elevation: 4 }}
        >
          {searchLocationResults.length
            ? searchLocationResults.map(
                (loc: SearchLocationResultType, index) => (
                  <SearchLocationItem
                    setIsInputActive={setIsInputActive}
                    location={loc}
                    key={index}
                  />
                )
              )
            : null}
        </ScrollView>

  );
};

export default SearchResults;
