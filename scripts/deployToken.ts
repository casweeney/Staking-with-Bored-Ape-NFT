import { ethers } from "hardhat";
const hre = require("hardhat");

const main = async () => {
  const PulseToken = await ethers.getContractFactory("PulseToken");
  const token = await PulseToken.deploy();

  await token.deployed();

  console.log("Token Contract deployed to:", token.address);

  const tokenOwner = await token.admin();
  console.log("Token Owner", tokenOwner);

  const ownerBalance = await token.balanceOf(tokenOwner);
  console.log("Owner Balance", ownerBalance);

  const boredApeHolder = "0x758c32B770d656248BA3cC222951cF1aC1DdDAaA";

  await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [boredApeHolder],
  });

  const signer = await ethers.getSigner(boredApeHolder);
  const amt = ethers.utils.parseUnits("1000");

  console.log("Signer address",signer.address);
  // console.log("Signer",signer);

  const transferToken = await token.transfer(signer.address, amt);
  const tfWaited = await transferToken.wait();

  console.log("Mint Transaction", tfWaited);

  const signerBal = await token.balanceOf(signer.address);
  console.log("Signer Bal", signerBal);

  // Token Contract deployed to: 0xC32609C91d6B6b51D48f2611308FEf121B02041f
  // Token Owner 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
