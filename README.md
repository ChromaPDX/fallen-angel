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
- attach heymint VIP list to claim conditions
- customize paper checkout
- upload real NFTs on mainnet
- bump alchemy limits
- on redeem, update image
- finalize stripe for redeem
- testing!