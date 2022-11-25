const ThirdwebSDK = require("@thirdweb-dev/sdk").ThirdwebSDK;
const secrets = require('../.secrets.json');
const configs = require('../config.js');

const main = async () => {
  const sdk = ThirdwebSDK.fromPrivateKey(secrets.privateKey, configs.chain.network);
  const contract = await sdk.getContract(configs.contractAddress);
  console.log(contract)
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