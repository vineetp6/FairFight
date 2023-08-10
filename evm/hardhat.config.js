require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require("@openzeppelin/hardhat-upgrades");
require('hardhat-contract-sizer');
require('@oasisprotocol/sapphire-paratime');
require('@oasisprotocol/sapphire-hardhat');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    testnet: {
      url: "http://127.0.0.1:8545",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", "689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd"]
    },
    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 5,
      accounts: [process.env.PRIVATE_KEY]
    },
    emerald_testnet: {
      url: "https://testnet.emerald.oasis.dev",
      accounts:
        process.env.PRIVATE_KEY_EMERALD !== undefined ? [process.env.PRIVATE_KEY_EMERALD] : [],
    },
    emerald_mainnet: {
      url: "https://emerald.oasis.dev",
      accounts:
        process.env.PRIVATE_KEY_EMERALD !== undefined ? [process.env.PRIVATE_KEY_EMERALD] : [],
    },
    sapphire_testnet: {
      url: "https://testnet.sapphire.oasis.dev",
      accounts: process.env.PRIVATE_KEY_EMERALD !== undefined ? [process.env.PRIVATE_KEY_EMERALD] : [],
      chainId: 0x5aff
    },
    sapphire_mainnet: {
      url: "https://sapphire.oasis.io",
      accounts: process.env.PRIVATE_KEY_EMERALD !== undefined ? [process.env.PRIVATE_KEY_EMERALD] : [],
      chainId: 0x5afe
    },
    scale: {
      url: "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
      accounts: [process.env.PRIVATE_KEY]
    },
    scale1: {
      url: 'https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird',
      accounts: [process.env.PRIVATE_KEY, 'f5567360ea204ac2d158f02b4385539dc68a9beb5a8a93bc44ee375b2d04caf9']
    },
    bnb: {
      url: "https://bsc-dataseed.binance.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 56
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      {
        version: "0.8.17"
      },
    ],
  },
  mocha: {
    timeout: 100000000
  }
};