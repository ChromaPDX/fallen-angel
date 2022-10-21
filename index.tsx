import React from "react";
import ReactDom from "react-dom";
import AppFrame from "./src/AppFrame";

import { Checkout } from "./src/Checkout";
import { Redeem } from "./src/Redeem";

const App = (props: any) => {
  return (<>
    <AppFrame >
      {
        (contract, provider, address): React.ReactNode => <>
          <Checkout contract={contract} provider={provider} address={address} />
          <Redeem contract={contract} provider={provider} address={address} />
        </>
      }
    </AppFrame>
  </>);
};

document.addEventListener("DOMContentLoaded", function (event) {
  const body = document.getElementsByTagName('body')
  ReactDom.render(
    <App />
    , body[0]);
});
