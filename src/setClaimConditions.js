const ThirdwebSDK = require("@thirdweb-dev/sdk").ThirdwebSDK;
const secrets = require('../.secrets.json');
const configs = require('../config.js');

const main = async () => {
  const sdk = ThirdwebSDK.fromPrivateKey(secrets.privateKey, configs.chain.network);
  const contract = await sdk.getContract(configs.contractAddress, "signature-drop");

  // uint256 startTimestamp;
  // uint256 maxClaimableSupply;
  // uint256 supplyClaimed;
  // uint256 quantityLimitPerTransaction;
  // uint256 waitTimeInSecondsBetweenClaims;
  // bytes32 merkleRoot;
  // uint256 pricePerToken;
  // address currency;

  const claimConditions = [{
    "startTimestamp": 1,
    "maxClaimableSupply": 10,
    "supplyClaimed": 10,
    "quantityLimitPerTransaction": 0,
    "waitTimeInSecondsBetweenClaims": 0,
    "merkleRoot": "0",
    "pricePerToken": 0,
    "currency": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "name": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  }]

  // const presaleStartTime = new Date();
  // const claimCondition = {
  //   startTime: presaleStartTime, // start the presale now
  //   maxQuantity: 2, // limit how many mints for this presale
  //   price: 0.01, // presale price
  //   snapshot: ['0x...', '0x...'], // limit minting to only certain addresses
  // };
  // const x = await contract.claimConditions.contractWrapper.writeContract.setClaimConditions({ name: "asd", phases: claimConditions }, false);
  contract.interceptor.overrideNextTransaction(() => ({
    gasLimit: 30000000,
  }));

  const x = await contract.claimConditions.set(claimConditions, false)
  console.log("done", x);

  // const x = await contract.contractWrapper.writeContract.functions.setClaimConditions([[
  //   "1666987408",
  //   "115792089237316195423570985008687907853269984665640564039457584007913129639935",
  //   "0",
  //   "1",
  //   "1",
  //   "0x1ecebc4c087a6416b65a3db3e7e85397aa35253eb40d8164026b900f8c00a952",
  //   "5000000000000000000000000000000000",
  //   "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
  // ], [
  //   "2666987408",
  //   "115792089237316195423570985008687907853269984665640564039457584007913129639935",
  //   "0",
  //   "3",
  //   "3",
  //   "0x1ecebc4c087a6416b65a3db3e7e85397aa35253eb40d8164026b900f8c00a952",
  //   "5000000000000000000000000000000000",
  //   "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
  // ]], false)

  // await contract.claimConditions.set(claimConditions);

  // console.log((await contract.erc721.getClaimTransaction()).args[4])
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