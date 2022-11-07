import Nfts from "./nfts/index";

console.log("emiting Nfts as CSV metadata...")
const nfts = await (Nfts().fileWriter)();
