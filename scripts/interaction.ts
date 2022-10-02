import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");

const main = async () => {
    // Staking contract deployed at: 0xd753c12650c280383Ce873Cc3a898F6f53973d16
    // Staking contract owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

    const coinAddress = "0xC32609C91d6B6b51D48f2611308FEf121B02041f";

    const stakeContractAddress = "0x10e38eE9dd4C549b61400Fc19347D00eD3edAfC4";

    const stakeCoin = await ethers.getContractAt("PulseToken", coinAddress);
    const stakeContract = await ethers.getContractAt("Staking", stakeContractAddress);

    const boredApeHolder = "0x758c32B770d656248BA3cC222951cF1aC1DdDAaA";

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [boredApeHolder],
    });

    const signer = await ethers.getSigner(boredApeHolder);
    const amt = ethers.utils.parseUnits("1000");

    // Transaction 1: Approve contract to spend and stake some platform token
    
    // await stakeCoin.connect(signer).approve(stakeContractAddress, amt);

    // const stakeAmt = ethers.utils.parseUnits("500");

    // const stakeTnx = await stakeContract.connect(signer).stake(stakeAmt);
    // const stakeReceipt = await stakeTnx.wait();

    // console.log("Staking transaction", stakeReceipt);

    // const contractBal = await stakeCoin.balanceOf(stakeContractAddress);
    // console.log("Contract balance", contractBal);


    // Transaction 2: Withdraw Transaction

    const transferToken = await stakeCoin.transfer(stakeContractAddress, amt);
    const tfWaited = await transferToken.wait();
    console.log("Transfer Receipt: ", tfWaited);

    const impersonatedBalance = await stakeCoin.balanceOf(signer.address);
    console.log("Impersonator token balance", impersonatedBalance);

    const withdrawTnx = await stakeContract.connect(signer).calculatedWithdraw();
    const withdrawReceipt = await withdrawTnx.wait();

    console.log("Withdraw Transaction", withdrawReceipt);

    const impersonatedBalanceAfter = await stakeCoin.balanceOf(signer.address);
    console.log("Impersonator token balance after", impersonatedBalanceAfter);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
