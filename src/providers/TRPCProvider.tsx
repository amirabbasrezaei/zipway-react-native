import { trpc } from "../../utils/trpc";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import Constants from "expo-constants"
import { QueryClientConfig } from "@tanstack/react-query";


type Props = {
  children: JSX.Element | JSX.Element[];
  queryClient: any
};

const getBaseUrl = () => {
    /**
     * Gets the IP address of your host-machine. If it cannot automatically find it,
     * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
     * you don't have anything else running on it, or you'd have to change it.
     */
    // const localhost = Constants.manifest?.debuggerHost?.split(":")[0];
    return `https://zipways.ir`
    // console.log(localhost)
    // if (!localhost)
    //   throw new Error("failed to get localhost, configure it manually");
    // return `http://${localhost}:5000`;
  };

const TRPCProvider = ({ children, queryClient }: Props) => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
            url: `${getBaseUrl()}/trpc`,
          // // optional
          // headers() {
          //   return {
          //     // authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
};

export default TRPCProvider;
