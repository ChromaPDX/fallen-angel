import React from "react";
import ReactDom from "react-dom";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// http://localhost:8080/?nftid=0

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

document.addEventListener("DOMContentLoaded", async (event) => {
  var nftid = getUrlParameter('nftid');
  const sdk = new ThirdwebSDK("goerli");
  const contract = await sdk.getContract("0x71eD799fB9680449E07076D47af403d6A0079530");
  const isRedeemable = await contract.call("isRedeemable", nftid);

  if (isRedeemable) {
    ReactDom.render(<>{nftid} is redeemable</>, document.getElementById('root'));
  } else {
    ReactDom.render(<>{nftid} is NOT redeemable</>, document.getElementById('root'));
  }
})