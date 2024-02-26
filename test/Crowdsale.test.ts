import { ethers } from "hardhat"
import { expect } from "chai"
import { BNBUSD_AGGREGATOR } from "../constants"
// import { Crowdsale } from "../artifacts/contracts/Crowdsale.sol/Crowdsale";
// import { } from '../artifacts/contracts/crowdsale/Crowdsale.sol/Crowdsale.json'

describe("Crowdsale", function () {
  async function deployCrowdsaleFixture() {
    const [deployer] = await ethers.getSigners()

    // Deploy ERC20 token
    const ERC20Token = await ethers.getContractFactory("DeffToken")
    const FLCTokenContract = await ERC20Token.deploy()
    const tokenAddress = await FLCTokenContract.getAddress()

    // Deploy Crowdsale
    // const rate = 100 // Set your rate -> 6.45 per wei
    const rate = 5000 // 1 / (0.02 / 400) = 5000 // TODO: DYNAMIC ?
    const wallet = deployer.address // Set your wallet address
    const CrowdsaleInstsance = await ethers.getContractFactory("Crowdsale")
    const CrowdsaleContract = await CrowdsaleInstsance.deploy(
      rate,
      wallet,
      tokenAddress,
      BNBUSD_AGGREGATOR
    )
    const crowdsaleAddress = await CrowdsaleContract.getAddress()

    // DEPLOY mock
    const AggregatorMockInstance = await ethers.getContractFactory(
      "MockV3Aggregator"
    )
    const AggregatorMockContract = await AggregatorMockInstance.deploy(2, 40000)
    const aggregatorMockAddress = await AggregatorMockContract.getAddress()
    console.log("aggregatorMockAddress: ", aggregatorMockAddress)

    return {
      CrowdsaleContract,
      crowdsaleAddress,
      FLCTokenContract,
      tokenAddress,

      AggregatorMockContract,
      aggregatorMockAddress,
    }
  }

  describe.skip("Deployment", function () {
    it("Should have valid addresses", async function () {
      const { crowdsaleAddress, tokenAddress } = await deployCrowdsaleFixture()

      expect(ethers.isAddress(tokenAddress)).to.be.true
      expect(ethers.isAddress(crowdsaleAddress)).to.be.true
    })

    it("Should set the correct rate", async function () {
      const { CrowdsaleContract } = await deployCrowdsaleFixture()
      const rate = await CrowdsaleContract.rate()
      expect(rate).to.equal(101) // Adjust to your expected rate
    })
  })

  describe("getTokenAmount", async function () {
    // Test case to check getTokenAmount function
    it("Should calculate correct token amount based on BNB price", async function () {
      const { crowdsaleAddress, tokenAddress, CrowdsaleContract } =
        await deployCrowdsaleFixture()
      // Define a fixed BNB price for testing (e.g., $400)
      const bnbPrice = BigInt("400000000000000000000") // 400 BNB per USD

      // Call the getTokenAmount function
      const weiAmount = ethers.parseEther("1") // 1 BNB
      const rate = BigInt("5000") // 1 ERC-20 token costs 0.02 USD (5000 BNB/USD * 0.02 USD)
      const expectedTokenAmount = weiAmount * rate - bnbPrice // Calculate expected token amount

      console.log("expectedTokenAmount: ", expectedTokenAmount)

      // Get the actual token amount from the contract
      // const actualTokenAmount = await CrowdsaleContract._getTokenAmount(
      //   weiAmount
      // )
      // console.log("actualTokenAmount: ", actualTokenAmount)

      // Check if the actual token amount matches the expected value
      // expect(actualTokenAmount).to.equal(expectedTokenAmount)
    })
  })
})

const calculateRate = () => {
  const TOKEN_DECIMALS = 18
  const USDT_TO_WEI = 1e6
  const TOKEN_COST_IN_USDT = 0.02
  const RATE = (TOKEN_COST_IN_USDT * USDT_TO_WEI) / 10 ** TOKEN_DECIMALS
  // console.log("RATE: ", RATE)

  return RATE
}
