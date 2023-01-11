import { useQuery } from "@tanstack/react-query";
import { getNewPrice } from "../requests/snappAPIs";


export function useSnappNewPrice(NewPricePostData) {
  const { isLoading: newSnappPriceLoading, data: newSnappPriceData, isFetched: isFetchedSnappNewPrice, isSuccess: isSnappNewPriceSucceed } = useQuery({
    queryKey: ["newPrice"],
    queryFn: () => getNewPrice(NewPricePostData),
  });

  return {newSnappPriceData, newSnappPriceLoading, isFetchedSnappNewPrice, isSnappNewPriceSucceed}
}
