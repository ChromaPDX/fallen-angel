import React from "react";
import type { ConfigOptions } from '@web3modal/react'
import { ConnectButton, Web3Modal, useAccount, useContract, useSigner, useProvider } from '@web3modal/react'
import { chains } from "@web3modal/ethereum"

const ContractAbi = require("../artifacts/contracts/LiquidCollection.sol/LiquidCollection.json");
const configs = require("../config");

const config: ConfigOptions = {
  projectId: '4453e71d0a916ce17f7a6105696bdc0a',
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'Liquid Collections',
    chains: [chains.goerli]
  }
}

type AppProps = {
  children: (contract, signer, address) => React.ReactNode;
};

export default (props: AppProps) => {
  const { address, isConnected } = useAccount();
  const signer = useSigner()
  // const provider = useProvider()

  console.log("signer", signer);
  // console.log("provider", provider);

  let contract;
  contract = useContract({
    addressOrName: configs.contractAddress,
    contractInterface: ContractAbi.abi,
    signerOrProvider: signer.data
  });

  return (
    <>
      <Web3Modal config={config} />
      <ConnectButton />
      {
        contract && address && signer
          ?
          props.children(contract, signer, address)
          :
          <pre>loading...</pre>
      }
    </>
  )
}
