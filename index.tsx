require("@rainbow-me/rainbowkit/styles.css");

import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

import configs from "./config";

// import {

// } from "@thirdweb-dev/react";

import { Checkout } from "./src/Checkout";
import { Redeem } from "./src/Redeem";
import AppFrame from "./src/AppFrame";

import {

  useContract,
  useContractRead,
  useContractWrite,
  ChainId, ThirdwebProvider, ConnectWallet,
  useAddress,
  ThirdwebNftMedia, useNFTs, useAccount
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";

function Home() {
  const { contract, isLoading: contractIsLoading } = useContract(configs.contractAddress);
  const { data: nfts, isLoading: isReadingNfts } = useNFTs(contract);
  const account = useAccount();

  const myAddress = account[0].data?.address;

  const [state, setState] = useState<{ quantity: number, stage: number, myNfts: NFT[] }>({
    quantity: 1,
    stage: 0,
    myNfts: []
  });

  useEffect(() => {
    if (myAddress && state.stage === 0) {
      contract?.erc721.getOwned(myAddress).then((nfts) => {
        setState({
          ...state,
          stage: 1,
          myNfts: nfts,
        });
      })
    }
  })

  return (
    <div>
      <h2>My NFTs</h2>

      {(state.myNfts || []).map((nft) => (
        <ThirdwebNftMedia
          key={nft.metadata.id}
          metadata={nft.metadata}
          height={"200"}
        />
      ))}



      <hr />

      <h2>Claim an NFT, if you are allowed</h2>
      <input
        type="number"
        min="1"
        max="9"
        value={state.quantity}
        onChange={(e) => setState({
          ...state,
          quantity: Number.parseInt(e.target.value)
        })} />
      <button onClick={(e) => {
        contract?.erc721.claim(state.quantity)
      }}>claim {state.quantity} NFTs</button>

      <hr />

      <h2>All NFTs</h2>
      {isReadingNfts ? (
        <p>Loading...</p>
      ) : (
        <div>
          {nfts?.map((nft) => (
            <ThirdwebNftMedia
              key={nft.metadata.id}
              metadata={nft.metadata}
              height={"200"}
            />
          ))}
        </div>
      )}


      <hr />
    </div>
  );
}

const YourApp = () => {
  const address = useAddress();
  return (
    <div>
      <ConnectWallet />
      <Home />
    </div>
  );
};

const LiquidCollectionReactApp = (props: any) => {
  return (<ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <YourApp />

    {/* <AppFrame >
      {
        (contract, signer, address): React.ReactNode => <>
          <Checkout contract={contract} signer={signer} address={address} />
          <hr />
          <Redeem contract={contract} signer={signer} address={address} />
        </>
      }
    </AppFrame> */}

  </ThirdwebProvider>);
  // return <AppFrame >
  //   {
  //     (contract, signer, address): React.ReactNode => <>
  //       <Checkout contract={contract} signer={signer} address={address} />
  //       <hr />
  //       <Redeem contract={contract} signer={signer} address={address} />
  //     </>
  //   }
  // </AppFrame>
};
document.addEventListener("DOMContentLoaded", (event) =>
  ReactDom.render(<LiquidCollectionReactApp />, document.getElementById('root')));