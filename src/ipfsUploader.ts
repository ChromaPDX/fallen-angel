import { filesFromPath } from "files-from-path";
import { NFTStorage } from 'nft.storage'
import fs from "fs";


const NFT_STORAGE_TOKEN = JSON.parse(fs.readFileSync("./.secrets.json").toString()).nftStorageApiKey;

console.log("hello ipfs uploader")

const files = filesFromPath('./src/nfts/batch1/pre', {
  pathPrefix: 'pre', //path.resolve(directoryPath), // see the note about pathPrefix below
  // hidden: true, // use the default of false if you want to ignore files that start with '.'
})

console.log(files)
const storage = new NFTStorage({ token: NFT_STORAGE_TOKEN })

// console.log(`storing file(s) from ${path}`)
const cid = await storage.storeDirectory(files)
console.log({ cid })

const status = await storage.status(cid)
console.log(status)