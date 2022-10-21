import { chains } from "@web3modal/ethereum";
import { ConfigOptions, ConnectButton, useSigner, Web3Modal } from "@web3modal/react";
import React from "react";
import ReactDom from "react-dom";
import AppFrame from "./src/AppFrame";

import { Checkout } from "./src/Checkout";
import { Redeem } from "./src/Redeem";

const App = (props: any) => {
  return (<>
    <AppFrame >
      {
        (contract, signer, address): React.ReactNode => <>
          <Checkout contract={contract} signer={signer} address={address} />
          <Redeem contract={contract} signer={signer} address={address} />
        </>
      }
    </AppFrame>
  </>);
};

// const config: ConfigOptions = {
//   projectId: '4453e71d0a916ce17f7a6105696bdc0a',
//   theme: 'dark',
//   accentColor: 'default',
//   ethereum: {
//     appName: 'Liquid Collections',
//     chains: [chains.goerli]
//   }
// }

// const SignerTest = (props: any) => {
//   const signer = useSigner()
//   console.log(signer)

//   return (<>
//     <Web3Modal config={config} />
//     <ConnectButton />
//     <pre>{JSON.stringify(signer.isLoading)}</pre>
//   </>);
// };


document.addEventListener("DOMContentLoaded", (event) =>
  ReactDom.render(<App />, document.getElementById('root')));