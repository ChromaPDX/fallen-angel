import { usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi'
import React, { useEffect, useState } from "react";
import { BigNumber } from "ethers"
import { Erc721ClaimableWithConditions } from "@thirdweb-dev/sdk";

import configs from "../config";

import AppFrame from "./AppFrame";

const ContractAbi = require("../artifacts/contracts/LiquidCollections.sol/LiquidCollections.json");

export function Checkout(props: { contract, signer, address }) {
  const { contract, signer, address } = props;
  const [loadingState, setLoadingState] = useState<any>({})

  const contractBase = {
    address: contract.address,
    abi: ContractAbi.abi,
  };

  useEffect(() => {
    initWeb3();
  }, []);

  async function initWeb3() {
    const nextTokenIdToMint = parseInt(await contract.nextTokenIdToMint());
    const nextTokenIdToClaim = parseInt(await contract.nextTokenIdToClaim());
    setLoadingState({ nextTokenIdToMint, nextTokenIdToClaim });
  }

  const proof = { "proof": configs.allowListProof, "maxQuantityInAllowlist": 0 };
  console.log(JSON.stringify(proof))
  const { config, error } = usePrepareContractWrite({
    ...contractBase,
    functionName: 'claim',
    chainId: configs.chain.id,
    args: [
      address,
      1,
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      0,
      proof,
      "0x6162636400000000000000000000000000000000000000000000000000000000"
    ],
  })

  const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite(config)

  useContractEvent({
    ...contractBase,
    eventName: 'TokensClaimed',
    /* @ts-ignore:next-line */
    listener: (claimer, receiver, idClaimed, numberClaimed) => {
      console.log('TokensClaimed', claimer, receiver, idClaimed, numberClaimed)
      /* @ts-ignore:next-line */
      const deltaMinusTokensClaimed = BigNumber.from(numberClaimed._hex).toNumber();
      const nextTokenIdToMint = loadingState.nextTokenIdToMint - deltaMinusTokensClaimed;
      setLoadingState({ ...loadingState, nextTokenIdToMint });
    },
  });

  useContractEvent({
    ...contractBase,
    eventName: 'TokensLazyMinted',
    /* @ts-ignore:next-line */
    listener: (startTokenId, endTokenId, baseURI, encryptedBaseURI, tsx) => {
      console.log('TokensLazyMinted', startTokenId, endTokenId, baseURI, encryptedBaseURI)
      /* @ts-ignore:next-line */
      const end = BigNumber.from(endTokenId._hex).toNumber();
      /* @ts-ignore:next-line */
      const start = BigNumber.from(startTokenId._hex).toNumber();

      setLoadingState({ ...loadingState, nextTokenIdToMint: loadingState.nextTokenIdToMint + (end - start) });
    },
  });


  const cantMint = loadingState.nextTokenIdToClaim > loadingState.nextTokenIdToMint
  console.log(loadingState.nextTokenIdToMint, loadingState.nextTokenIdToClaim)

  return (<>
    <div className="container">

      <h2>Mint #{loadingState.nextTokenIdToClaim} of {loadingState.nextTokenIdToMint} </h2>

      <h3>Fancy claim</h3>
      {
        cantMint ?
          <p>Not enough tokens!</p> :
          <a href={configs.paperCheckoutLink}>Buy with Paper.xyz </a>
      }



      <hr />


      <h3>Vanilla claim</h3>
      {/* <pre>{JSON.stringify(loadingState, null, 2)}</pre> */}
      {
        loadingState.claiming ? <>
          <p>please wait while your claim is processing...</p>
        </> : <>
          {
            cantMint ?
              <p>Not enough tokens!</p> :
              <button disabled={cantMint} onClick={async (e) => {
                write?.()
              }} >mint</button>
          }



        </>
      }
    </div>
  </>);
}

export default (props: any) =>
  <AppFrame >
    {
      (contract, signer, address): React.ReactNode => <Checkout contract={contract} signer={signer} address={address} />
    }
  </AppFrame>