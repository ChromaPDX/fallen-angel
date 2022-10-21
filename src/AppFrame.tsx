import React from "react";
import type { ConfigOptions } from '@web3modal/react'
import { ConnectButton, Web3Modal, useAccount, useContract, useProvider } from '@web3modal/react'
import { chains } from "@web3modal/ethereum"

const ContractAbi = require("../artifacts/contracts/LiquidCollection.sol/LiquidCollection.json");
const configs = require("../config");

const config: ConfigOptions = {
  projectId: '4453e71d0a916ce17f7a6105696bdc0a',
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'web3Modal',
    chains: [chains.goerli]
  }
}

type AppProps = {
  children: (contract, provider, address) => React.ReactNode;
};

export default (props: AppProps) => {
  const { address, isConnected } = useAccount();
  const provider = useProvider()
  const contract = useContract({
    addressOrName: configs.contractAddress,
    contractInterface: ContractAbi.abi,
    signerOrProvider: provider
  });

  return (
    <>
      <Web3Modal config={config} />
      <ConnectButton />
      {
        contract && address && provider ?
          props.children(contract, provider, address)
          :
          <pre>loading...</pre>
      }
    </>
  )
}
