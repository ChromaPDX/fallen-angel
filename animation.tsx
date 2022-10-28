import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import configs from "./config";

function importAll(r) {
  return r.keys().map(r);
}

/* @ts-ignore:next-line */
const postImages = importAll(require.context('./src/nfts/batch0/post/', false, /\.(png|jpe?g|svg)$/));

/* @ts-ignore:next-line */
const preContext = require.context('./src/nfts/batch0/pre/', false, /\.(png|jpe?g|svg)$/);

const preImagesImport2 = importAll(preContext)
const unbundledFiles = preContext.keys();

const preImages3 = [];
for (let i = 0; i < preImagesImport2.length; i++) {
  const matches = unbundledFiles[i].match(/.\/(\d*).jpg+/);

  /* @ts-ignore:next-line */
  preImages3[i] = {
    input: unbundledFiles[i],
    output: preImagesImport2[i],
    num: parseInt(matches[1])
  }
}

/* @ts-ignore:next-line */
const sortedPreImages = preImages3.sort((a, b) => a.num - b.num)

console.log(sortedPreImages)

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
  /* @ts-ignore:next-line */
  var nftid: number = parseInt(getUrlParameter('nftid'));
  const sdk = new ThirdwebSDK(configs.chain.network);
  const contract = await sdk.getContract(configs.contractAddress);
  const isRedeemable = await contract.call("isRedeemable", nftid);

  var DOM_img = document.createElement("img");
  console.log(DOM_img)


  if (isRedeemable) {
    /* @ts-ignore:next-line */
    DOM_img.src = sortedPreImages[nftid].output;
    /* @ts-ignore:next-line */
    document.body.innerHTML = DOM_img.outerHTML;
  } else {
    DOM_img.src = postImages[nftid];
    /* @ts-ignore:next-line */
    document.body.innerHTML = DOM_img.outerHTML;
  }
})