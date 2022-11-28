import { filesFromPath } from "files-from-path";
import { NFTStorage } from "nft.storage";
import path from "path";

if (!process.env.nft_dot_storage_apikey) {
  console.error("set an env var for `nft_dot_storage_apikey`!");
  process.exit(-1);
}
const NFT_STORAGE_TOKEN = process.env.nft_dot_storage_apikey;

console.log("hello ipfs uploader");

const files = filesFromPath("./src/nfts/fallen-angel/images", {
  pathPrefix: path.resolve("./src/nfts/fallen-angel/images"), // see the note about pathPrefix below
  // hidden: true, // use the default of false if you want to ignore files that start with '.'
});

const storage = new NFTStorage({ token: NFT_STORAGE_TOKEN });
const cid = await storage.storeDirectory(files);

console.log("done", { cid });
