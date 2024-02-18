import { ethers } from "hardhat"

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deployer: ", deployer.address)

  const ERC20Token = await ethers.deployContract("DeffToken")
  await ERC20Token.waitForDeployment()
  const tokenAddress = ERC20Token.target

  console.log("erc20Token address: ", tokenAddress) // 0xb6057e08a11da09a998985874FE2119e98dB3D5D

  console.log("Deploying Crowdsale...")
  console.log("---------------------")
  const Crowdsale = await ethers.getContractFactory("Crowdsale")
  const crowdsale = await Crowdsale.deploy(1, deployer.address, tokenAddress) // Replace parameters with your desired values

  console.log("Crowdsale deployed to:", crowdsale.target)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
