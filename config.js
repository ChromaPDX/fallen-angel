const chain = require("wagmi").chain;

module.exports = {
  // contractAddress: "0xbF9E0d1eBAc85a0FAF0D100fe687bB61f3b5DbB8",

  contractAddress: "0x02Ee92b7fDdF7F3e35CEad0b3099560b707cd182",


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