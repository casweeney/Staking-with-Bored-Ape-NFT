import { ethers } from "hardhat";

const main = async () => {
  const PulseToken = await ethers.getContractFactory("PulseToken");
  const token = await PulseToken.deploy();

  await token.deployed();

  console.log("Token Contract deployed to:", token.address);

  const tokenOwner = await token.admin();
  console.log("Token Owner", tokenOwner);

  const ownerBalance = await token.balanceOf(tokenOwner);
  console.log("Owner Balance", ownerBalance);

  // Token contract at: 0x10e38eE9dd4C549b61400Fc19347D00eD3edAfC4
  // Token Admin: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
