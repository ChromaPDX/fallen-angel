/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-chai-matchers")


module.exports = {
  // networks: {
  //   localhost: {
  //     gas: 12000000,
  //     blockGasLimit: 0x1fffffffffffff,
  //     allowUnlimitedContractSize: true,
  //     timeout: 1800000
  //   }
  // },

  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
