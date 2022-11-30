/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-chai-matchers")
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  // networks: {
  //   localhost: {
  //     gas: 12000000,
  //     blockGasLimit: 0x1fffffffffffff,
  //     allowUnlimitedContractSize: true,
  //     timeout: 1800000
  //   }
  // },


  networks: {
    mainnet: {
      url: "https://eth-mainnet.g.alchemy.com/v2/577rlGmGIdps3j2owCjazI3jPeYrgvNt"
    }
    // testnet: { ... }
  },
  etherscan: {
    apiKey: {
      mainnet: "C8QAI3E7PS6FZR16U3F7MHQFM5JH9CNJM4",
    }
  },

  solidity: {
    version: '0.8.13',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

};
