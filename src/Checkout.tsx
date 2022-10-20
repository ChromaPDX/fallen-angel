import React, { ReactNode, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { DateTime } from "luxon";
import type { ConfigOptions } from '@web3modal/react'
import { ConnectButton, useConnectModal, Web3Modal, useAccount, useContract, useProvider } from '@web3modal/react'
import { chains } from "@web3modal/ethereum"
// var gapi = require('gapi');

const ContractAbi = require("../artifacts/contracts/LiquidCollection.sol/LiquidCollection.json");
const configs = require("../config");

const isInState = state => true

const isOldEnough = date =>
  DateTime.fromISO(date)
    .diffNow('years')
    .years < -21;

const config: ConfigOptions = {
  projectId: '4453e71d0a916ce17f7a6105696bdc0a',
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'web3Modal',
    chains: [chains.goerli]
  }
}

function Checkout(props: { contract, provider, address }) {
  const { contract, provider, address } = props;
  console.log(contract, provider, address);
  const [loadingState, setLoadingState] = useState<any>({})
  useEffect(() => { loadNFTs() }, []);

  async function loadNFTs() {
    const totalSupply = (await contract.totalSupply()).toNumber();

    const getBaseURICount = parseInt(await contract.getBaseURICount());

    const mine = await Promise.all(

      (await contract.getMineWithMetadata(address))
        .map(async (nft) => {
          console.log(nft);

          const u = nft[1].replace("ipfs://", "https://ipfs.io/ipfs/");

          const ipfsBlob = await fetch(u)
            .then(res => {
              try {
                return res.json()
              } catch (e) {
                return {};
              }

            })
            .then(
              (result) => {
                return result
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                console.error(error)
              }
            )

          return {
            ...ipfsBlob,
            /* @ts-ignore:next-line */
            httpImage: ipfsBlob.image?.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"),
            id: nft[0],
            tokenURI: nft[1],
            redeemed: nft[2],
          }
        })
    );

    const theirs = await Promise.all(
      (await contract.getMineWithMetadata(configs.owner))
        .map(async (nft) => {
          return {
            id: nft[0],
            tokenURI: nft[1],
            redeemed: nft[2],
          }
        })

    );


    // const claim = async () => {
    //   const claimed = await contract.claim(
    //     account,
    //     1,
    //     "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    //     0,
    //     { "proof": ["0x0000000000000000000000000000000000000000000000000000000000000000"], "maxQuantityInAllowlist": 0 },
    //     "0x6162636400000000000000000000000000000000000000000000000000000000").send({ from: account });

    //   // setLoadingState({ ...loadingState, claim });
    //   loadNFTs();
    // }

    const redeemer = async (toRedeem) => {
      const redeemed = await contract.claim(loadingState.contract.redeem(toRedeem).send({ from: loadingState.address }));

      // setLoadingState({ mine, account, contract, claim, totalSupply, getBaseURICount, redeemed, redeemer });
      setLoadingState({
        ...loadingState, redeeming: {
          ...(loadingState.redeeming || {}),
          toRedeem: true
        }
      });
    }

    setLoadingState({ mine, address, contract, totalSupply, getBaseURICount, redeemer, theirs });
  }

  return (<>

    <div className="container">

      {
        loadingState.claiming ? <>
          <p>please wait while your claim is processing...</p>
        </> : <>
          <h2>Mint #{loadingState.totalSupply} of {loadingState.getBaseURICount + 1} </h2>
          <button disabled={loadingState.totalSupply >= loadingState.getBaseURICount + 1} onClick={async (e) => {
            setLoadingState({ ...loadingState, claiming: true });

            await loadingState.contract.methods.claim(
              loadingState.account,
              1,
              "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
              0,
              { "proof": ["0x0000000000000000000000000000000000000000000000000000000000000000"], "maxQuantityInAllowlist": 0 },
              "0x6162636400000000000000000000000000000000000000000000000000000000").send({ from: loadingState.account });
            setLoadingState({ ...loadingState, claiming: false });
            loadNFTs();
          }} >mint</button>
        </>
      }
    </div>

  </>);
}

type AppProps = {
  children: (contract, provider, address) => React.ReactNode;
};

function AppFrame(props: AppProps) {
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

export default (props: any) => {
  return (<>
    <AppFrame >
      {
        (contract, provider, address): React.ReactNode => <Checkout contract={contract} provider={provider} address={address} />
      }
    </AppFrame>
  </>);
};
