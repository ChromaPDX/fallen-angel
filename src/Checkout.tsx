import React, { useEffect, useState } from "react";
import AppFrame from "./AppFrame";

export function Checkout(props: { contract, provider, address }) {
  const { contract, provider, address } = props;
  const [loadingState, setLoadingState] = useState<any>({})
  useEffect(() => { refreshWeb3() }, []);

  async function refreshWeb3() {
    const totalSupply = (await contract.totalSupply()).toNumber();
    const getBaseURICount = parseInt(await contract.getBaseURICount());
    setLoadingState({ address, contract, totalSupply, getBaseURICount });
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
            await loadingState.contract.claim(
              loadingState.account,
              1,
              "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
              0,
              { "proof": ["0x0000000000000000000000000000000000000000000000000000000000000000"], "maxQuantityInAllowlist": 0 },
              "0x6162636400000000000000000000000000000000000000000000000000000000").send({ from: loadingState.account });
            setLoadingState({ ...loadingState, claiming: false });
            refreshWeb3();
          }} >mint</button>
        </>
      }
    </div>
  </>);
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
