import { ethers } from "hardhat";

const main = async () => {
  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy("0xC32609C91d6B6b51D48f2611308FEf121B02041f","0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D");

  await staking.deployed();

  console.log("Staking Contract deployed to:", staking.address);

  const stakingAdmin = await staking.admin();

  console.log("Staking Admin", stakingAdmin);

  // Staking contract deployed at: 0x10e38eE9dd4C549b61400Fc19347D00eD3edAfC4
  // Staking contract owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
