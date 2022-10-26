import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useContract, useSigner, useAccount } from 'wagmi';
import { chain, createClient, WagmiConfig, configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton
} from "@rainbow-me/rainbowkit";

import configs from "../config";

const ContractAbi = require("../artifacts/contracts/LiquidCollections.sol/LiquidCollections.json");

const { chains, provider } = configureChains(
  [configs.chain],
  [alchemyProvider({ apiKey: configs.alchemyKey }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Liquid Collections",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

type AppProps = {
  children: (contract, signer, address) => React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

const Web3ContractFrame = (props: { signer, address, children: (contract, signer, address) => React.ReactNode }) => {
  const { signer, address } = props;
  const contract = useContract({
    address: configs.contractAddress,
    abi: ContractAbi.abi,
    signerOrProvider: signer
  })
  return (
    <>
      {
        contract
          ?
          props.children(contract, provider, address)
          :
          <pre>loading...</pre>
      }
    </>
  )

}

const Web3AcccountFrame = (props: AppProps) => {
  const { data: signer } = useSigner();
  const { address, isConnecting, isDisconnected } = useAccount()
  return (
    <>
      {
        address && signer && !isConnecting
          ?
          <>
            <Web3ContractFrame
              signer={signer} address={address}
              {...props}
            />
          </>
          :
          <pre>loading...</pre>
      }
    </>
  )
}

export default (props: AppProps) =>
  <QueryClientProvider contextSharing={true} client={queryClient}>
    <WagmiConfig client={wagmiClient} >
      <RainbowKitProvider chains={chains}>
        <ConnectButton />
        <Web3AcccountFrame {...props} />
      </RainbowKitProvider>
    </WagmiConfig>
  </QueryClientProvider>