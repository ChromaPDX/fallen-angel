const chain = require("wagmi").chain;

module.exports = {
  // _pricePerToken: "0.005",
  // _pricePerTokenInWei: "5000000000000000",
  _pricePerToken: "0.065",
  _pricePerTokenInWei: "65000000000000000",

  currency: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",

  contractAddress: "0xA8a4764FD41b036D4B00795bE31E0eba92ef869d",

  // owner: "0xB1e03503AB2C0159a4CeF0f9b4703292C221eF45",
  owner: "0x0A58e58ECb0dD36E0e56975b86F9d76Dd9e4272e",

  paperCheckoutLink: "https://paper.xyz/checkout/f94fe293-ec05-4e29-ad27-df373f84c052",

  allowListProof: [
    '0xeafac40d278a20912dad05fa5ea3b0c8489d4b9e382f8925e343ea6d7986b376',
    '0x8f91e3c7e7c77e442ed2c098c63df34523c5cc25f1e7cc7c1b426485b79092e5'
  ],

  // development
  alchemyKey: "yxZEOqdqzCNCExJZEwY4iPEeu6jZpyMi",
  chain: chain.mainnet,

  // production
  // alchemyKey: "577rlGmGIdps3j2owCjazI3jPeYrgvNt",
  // chain: chain.mainnet

  stripeCheckoutLink: "https://buy.stripe.com/5kA8xs4Tp4SkehafYY",

  nullProof: {
    "proof": ["0x0000000000000000000000000000000000000000000000000000000000000000"],
    "maxQuantityInAllowlist": 0
  }
}


// { "proof": ["0x97533c02110e6573027c4c00710b22618e3b039a5a99f419e86c29e537c4b59c", "0xeafac40d278a20912dad05fa5ea3b0c8489d4b9e382f8925e343ea6d7986b376"], "maxQuantityInAllowlist": 0 }
// {
//   "proof": [
//     "0x97533c02110e6573027c4c00710b22618e3b039a5a99f419e86c29e537c4b59c",
//     "0xeafac40d278a20912dad05fa5ea3b0c8489d4b9e382f8925e343ea6d7986b376"
//   ],
//     "maxQuantityInAllowlist": 0
// }