import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import configs from "../config";

if (!process.env.privatekey) {
  console.error("set an env var for `privatekey`!");
  process.exit(-1);
}
const PRIVATE_KEY = process.env.privatekey;

const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, configs.chain.network);

// const metadatas = [{
//   name: "Cool NFT",
//   description: "This is a cool NFT",
//   // image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
// }, {
//   name: "Cool NFT",
//   description: "This is a cool NFT",
//   // image: fs.readFileSync("path/to/image.png"),
// }];

const metadatas = new Array(5).fill({});

const contract = await sdk.getContract(configs.contractAddress);
const results = await contract.erc721.lazyMint(metadatas);

console.log("done", results);
// import { NFTStorage } from 'nft.storage'

// import path from "path";

// // Custom metadata of the NFTs to create
// const metadatas = [{
//   name: "Cool NFT",
//   description: "This is a cool NFT",
//   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
// }, {
//   name: "Cool NFT",
//   description: "This is a cool NFT",
//   image: fs.readFileSync("path/to/image.png"),
// }];

// const results = await contract.erc721.lazyMint(metadatas); // uploads and creates the NFTs on chain
// const firstTokenId = results[0].id; // token id of the first created NFT
// const firstNFT = await results[0].data(); // (optional) fetch details of the first created NFT
