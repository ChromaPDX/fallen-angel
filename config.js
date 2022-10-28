const chain = require("wagmi").chain;

module.exports = {
  contractAddress: "0x1125d83f0Cf54e23ad5c708BB04b86A349ED25e0",

  owner: "0xB1e03503AB2C0159a4CeF0f9b4703292C221eF45",

  paperCheckoutLink: "https://paper.xyz/checkout/5fa7c655-9009-45b1-aa36-83070d98b245",

  allowListProof: [
    '0x97533c02110e6573027c4c00710b22618e3b039a5a99f419e86c29e537c4b59c',
    '0xeafac40d278a20912dad05fa5ea3b0c8489d4b9e382f8925e343ea6d7986b376'
  ],

  // development
  alchemyKey: "yxZEOqdqzCNCExJZEwY4iPEeu6jZpyMi",
  chain: chain.goerli,

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