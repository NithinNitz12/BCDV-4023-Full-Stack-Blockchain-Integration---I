require('@nomiclabs/hardhat-ethers');
require("dotenv").config();

const { VITE_API_KEY, VITE_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: VITE_API_KEY,
      accounts: [VITE_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};
