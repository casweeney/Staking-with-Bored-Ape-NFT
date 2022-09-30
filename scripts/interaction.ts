import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

const main = async () => {
    const Staking = await ethers.getContractFactory("Staking");
    const staking = Staking.attach("0xd753c12650c280383Ce873Cc3a898F6f53973d16");

    const Token = await ethers.getContractFactory("PulseToken");
    const token = await Token.attach("0x10e38eE9dd4C549b61400Fc19347D00eD3edAfC4");

    await token.transfer("0x758c32B770d656248BA3cC222951cF1aC1DdDAaA", 1000000000000000000000000)

    // Staking contract deployed at: 0xd753c12650c280383Ce873Cc3a898F6f53973d16
    // Staking contract owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

    const boredApeHolder = "0x758c32B770d656248BA3cC222951cF1aC1DdDAaA";
    await helpers.impersonateAccount(boredApeHolder);
    const impersonatedSigner = await ethers.getSigner(boredApeHolder);

    const impersonatedBalance = await token.balanceOf("0x758c32B770d656248BA3cC222951cF1aC1DdDAaA");
    console.log("Impersonator token balance", impersonatedBalance);

    // await staking.stake()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
