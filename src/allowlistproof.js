const ThirdwebSDK = require("@thirdweb-dev/sdk").ThirdwebSDK;
const secrets = require('../.secrets.json');
const configs = require('../config.js');

const main = async () => {
  console.log("hello")
  const sdk = ThirdwebSDK.fromPrivateKey(secrets.privateKey, configs.chain.network);
  console.log("mnark0", configs.contractAddress)
  const contract = await sdk.getContract(configs.contractAddress);
  console.log("mnark1")
  // console.log((await contract.erc721.getClaimTransaction()).args)
  console.log((await contract.erc721.getClaimTransaction()).args[4])
}

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