
const ThirdwebSDK = require("@thirdweb-dev/sdk").ThirdwebSDK;

const allowlistedAddresses = [
  '0xB1e03503AB2C0159a4CeF0f9b4703292C221eF45',
  '0xbD7471b1a4A80b35ee085F6798c7Ac0746777e68'
];

const privateKey = 'AH AH AH THAT IS NOT THE MAGIC WORD';

const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "goerli");

const main = async () => {
  const contract = await sdk.getContract("0x71eD799fB9680449E07076D47af403d6A0079530");
  console.log((await contract.erc721.getClaimTransaction()).args[4].proof)
}

// // deploy existing contracts, or your own using the thirdweb CLI
// const deployedAddress = sdk.deployer.deployNFTCollection({
//   name: "My NFT Collection",
//   primary_sale_recipient: "0x...",
// });

// // access your deployed contracts
// const contract = await sdk.getContract(deployedAddress);

// // Execute any of your functions on your contracts from the connected wallet
// await contract.call("myFunction", arg1, arg2);

// // Or execute transactions using the extensions API
// await contract.erc721.mint({
//   name: "Cool NFT",
//   description: "Minted NFT from code!",
//   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
// });

// // // https://dev.to/rounakbanik/tutorial-digital-signatures-nft-allowlists-eeb

// // const ethers = require('ethers');
// // const main = async () => {

// //   const signer = new ethers.Wallet(privateKey);
// //   // let message = 'Hello World!'

// //   // let signature = await signer.signMessage(message)
// //   // console.log(signature);

// //   // Get first allowlisted address
// //   let message = allowlistedAddresses[0];

// //   // Compute hash of the address
// //   let messageHash = ethers.utils.id(message);
// //   console.log("Message Hash: ", messageHash);

// //   // Sign the hashed address
// //   let messageBytes = ethers.utils.arrayify(messageHash);
// //   let signature = await signer.signMessage(messageBytes);
// //   console.log("Signature: ", signature);


// // }

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  }
  catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();