# Liquid Collection X Chroma NFT

## TL;DR
### Build contracts
```
yarn nft:build
```
### Deploy or release your contracts on thirdweb. 
You'll be redirected to the thirdweb website to complete the deployment. Take note of the address to which the contract was deployed.
```
yarn nft:deploy
```
### Build or develop the javascipt bundle passing that address as a command line argument
```
yarn dev:redeem SOME_ADDRESS
```
### Redeem.bundle.js can be used as an exportable artifact

## Todo
- customize paper checkout
- upload real NFTs on mainnet, attach heymint VIP list to claim conditions
- bump alchemy limits
- on redeem, update image
- finalize stripe for redeem
- testing!

## Deployment

### Phase 1
- Open Heymint whitelist to public ✅

### Phase 1.5 
- Get NFT assets from Kit

### Phase 2
- Build the contract if it has been changed
  - `yarn web3:deploy`, choosing `hardhat`
  - When prompted by the thirdweb dashboard
    - name your collection, give it a symbol
    - `_royaltyRecipient` should be your own wallet, as is `_primarySaleRecipient`
- Download the heymint white list into the source as `whitelist.csv`
- Set the claim conditions using `whitelist.csv`
- LazyMint NFTs from thirdweb dashboard (aka "Batch Upload") using the files in `./nfts/`
  - Choose "Reveal upon mint", rather than "Delayed Reveal"

### Phase 3
- Ensure that `config.js` and `.secrets.json` are correct.
  `config.js`: 
    - the field `chain` should be `mainnet`, not `goerli`
    - the field `contractAddress` should be the address of your contract deployed via thirdweb
    - ensure the alchemy key is correct
  - Put your wallet's secret key in the _untracked_ file `.secrets.json`. 

### Phase 4
- Generate your allow list proof. `yarn allowlistproof`. 
  Use the output of this script
    1) as the value for the key `allowListProof` in `config.js`
    2) Create/update the checkout link on paper.xyz
    3) update  `config.js` with the paper.xyz checkout link (Oct 31)

- Test locally with `yarn web2:dev`

### Phase 5
- Build locally with `yarn web2:build`

