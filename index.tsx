require("@rainbow-me/rainbowkit/styles.css");

import React from "react";
import ReactDom from "react-dom";

import { Checkout } from "./src/Checkout";
import { Redeem } from "./src/Redeem";
import AppFrame from "./src/AppFrame";

const SignerTest = (props: any) => {
  return <AppFrame >
    {
      (contract, signer, address): React.ReactNode => <>
        <Checkout contract={contract} signer={signer} address={address} />
        <Redeem contract={contract} signer={signer} address={address} />
      </>
    }
  </AppFrame>
};
document.addEventListener("DOMContentLoaded", (event) =>
  ReactDom.render(<SignerTest />, document.getElementById('root')));