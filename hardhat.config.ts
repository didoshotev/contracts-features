import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
require("dotenv").config()

const INFURA_API_KEY = process.env.HARDHAT_INFURA_APY_KEY

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
        blockNumber: 18651873, // specify the block number to fork from
      },
    },
  },
}

export default config
