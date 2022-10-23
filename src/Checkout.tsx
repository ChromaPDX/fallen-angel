import { chain } from "wagmi";
import { usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi'
import React, { useEffect, useState } from "react";
import { BigNumber } from "ethers"

import AppFrame from "./AppFrame";

const ContractAbi = require("../artifacts/contracts/LiquidCollection.sol/LiquidCollection.json");

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
    const totalSupply = (await contract.totalSupply()).toNumber();
    const baseURICount = parseInt(await contract.getBaseURICount());
    setLoadingState({ totalSupply, baseURICount });
  }

  const { config, error } = usePrepareContractWrite({
    ...contractBase,
    functionName: 'claim',
    chainId: chain.goerli.id,
    args: [
      address,
      1,
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      0,
      { "proof": ["0x0000000000000000000000000000000000000000000000000000000000000000"], "maxQuantityInAllowlist": 0 },
      "0x6162636400000000000000000000000000000000000000000000000000000000"
    ],
  })

  const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite(config)

  useContractEvent({
    ...contractBase,
    eventName: 'TokensClaimed',
    /* @ts-ignore:next-line */
    listener: (claimer, receiver, idClaimed, numberClaimed) => {
      // console.log('TokensClaimed', claimer, receiver, idClaimed, numberClaimed)
      /* @ts-ignore:next-line */
      const deltaMinusTokensClaimed = BigNumber.from(numberClaimed._hex).toNumber();
      const totalSupply = loadingState.totalSupply - deltaMinusTokensClaimed;
      setLoadingState({ ...loadingState, totalSupply });
    },
  });

  useContractEvent({
    ...contractBase,
    eventName: 'TokensLazyMinted',
    /* @ts-ignore:next-line */
    listener: (startTokenId, endTokenId, baseURI, encryptedBaseURI, tsx) => {
      // console.log('TokensLazyMinted', startTokenId, endTokenId, baseURI, encryptedBaseURI)
      /* @ts-ignore:next-line */
      const end = BigNumber.from(endTokenId._hex).toNumber();
      /* @ts-ignore:next-line */
      const start = BigNumber.from(startTokenId._hex).toNumber();

      setLoadingState({ ...loadingState, totalSupply: loadingState.totalSupply + (end - start) });
    },
  });


  return (<>
    <div className="container">
      {/* <pre>{JSON.stringify(loadingState, null, 2)}</pre> */}
      {
        loadingState.claiming ? <>
          <p>please wait while your claim is processing...</p>
        </> : <>
          <h2>Mint #{loadingState.totalSupply} of {loadingState.baseURICount + 1} </h2>
          <button disabled={loadingState.totalSupply >= loadingState.baseURICount + 1} onClick={async (e) => {
            write?.()
          }} >mint</button>
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