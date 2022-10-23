import { chain } from "wagmi";
import { usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi'
import React, { useEffect, useState } from "react";

import AppFrame from "./AppFrame";

const ContractAbi = require("../artifacts/contracts/LiquidCollection.sol/LiquidCollection.json");

export function Checkout(props: { contract, signer, address }) {
  const { contract, signer, address } = props;
  const [loadingState, setLoadingState] = useState<any>({})
  useEffect(() => { refreshWeb3() }, []);

  async function refreshWeb3() {
    const totalSupply = (await contract.totalSupply()).toNumber();
    const getBaseURICount = parseInt(await contract.getBaseURICount());
    setLoadingState({ address, contract, totalSupply, getBaseURICount });
  }

  const { config, error } = usePrepareContractWrite({
    address: contract.address,
    abi: ContractAbi.abi,
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
    // enabled: false,
    onSuccess: (data) => {
      console.log("onSuccess", data)
      // setLoadingState({ ...loadingState, claiming: false });
      // refreshWeb3();
    },
    onSettled: (data) => {
      console.log("onSettled", data)
      // setLoadingState({ ...loadingState, claiming: false });
      // refreshWeb3();
    }
  })

  const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite(config)

  return (<>
    <div className="container">
      {
        loadingState.claiming ? <>
          <p>please wait while your claim is processing...</p>
        </> : <>
          <h2>Mint #{loadingState.totalSupply} of {loadingState.getBaseURICount + 1} </h2>
          <button disabled={loadingState.totalSupply >= loadingState.getBaseURICount + 1} onClick={async (e) => {
            setLoadingState({ ...loadingState, claiming: true });

            // write?.()
            // await writeAsync?.()
            // console.log("mark 0")
            // debugger
            // await loadingState.contract.claim(
            // )
            // .send({ from: loadingState.account });

            // setLoadingState({ ...loadingState, claiming: false });
            // debugger

            // refreshWeb3();
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