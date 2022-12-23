const chain = require("wagmi").chain;

module.exports = {

  numberOfNftsMintableAtOnce: 50,

  metadataCID: "bafybeiaxucaszbmk6zmjtmxixzrifwdol4khjvq2m3oew64ukliy7ivug4",

  // _pricePerToken: "0.001",
  // _pricePerTokenInWei: "01000000000000000",
  // paper link smoketest (0.005) https://paper.xyz/checkout/54120ec3-a856-4f36-ab9d-bdda30ab8c17
  // _pricePerToken: "0.06",
  // _pricePerTokenInWei: "60000000000000000",

  _pricePerToken: "0.065",
  _pricePerTokenInWei: "65000000000000000",

  currency: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",

  // adam
  // owner: "0xB1e03503AB2C0159a4CeF0f9b4703292C221eF45",

  // kit
  owner: "0x0A58e58ECb0dD36E0e56975b86F9d76Dd9e4272e",

  // live fallenangel
  contractAddress: "0xA983d04C0FcA6AB46452fe6281a1fcD7f982E3F5",

  // soft launch allowlist exceptions tests
  // contractAddress: "0x3E7286ec13eFda945329901163b84915555d6157",

  // development
  // alchemyKey: "yxZEOqdqzCNCExJZEwY4iPEeu6jZpyMi",
  // chain: chain.goerli,

  // production
  alchemyKey: "577rlGmGIdps3j2owCjazI3jPeYrgvNt",
  chain: chain.mainnet,

}

// paperCheckoutLink: "https://paper.xyz/checkout/f1282701-776b-44f2-909e-0e20b758608c",
// { "proof": ["0x97533c02110e6573027c4c00710b22618e3b039a5a99f419e86c29e537c4b59c", "0xeafac40d278a20912dad05fa5ea3b0c8489d4b9e382f8925e343ea6d7986b376"], "maxQuantityInAllowlist": 0 }
// {
//   "proof": [
//     "0x97533c02110e6573027c4c00710b22618e3b039a5a99f419e86c29e537c4b59c",
//     "0xeafac40d278a20912dad05fa5ea3b0c8489d4b9e382f8925e343ea6d7986b376"
//   ],
//     "maxQuantityInAllowlist": 0
// }

// allowListProof: [
//   '0xeafac40d278a20912dad05fa5ea3b0c8489d4b9e382f8925e343ea6d7986b376',
//   '0x8f91e3c7e7c77e442ed2c098c63df34523c5cc25f1e7cc7c1b426485b79092e5'
// ],
// stripeCheckoutLink: "https://buy.stripe.com/5kA8xs4Tp4SkehafYY",

// nullProof: {
//   "proof": ["0x0000000000000000000000000000000000000000000000000000000000000000"],
//     "maxQuantityInAllowlist": 0
// }

// 0.062