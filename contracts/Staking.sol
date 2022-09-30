// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Staking {
    address platformToken;
    address boredApe;

    struct StakeData {
        uint stakedAmount;
        uint stakedTime;
    }

    mapping(address => StakeData) stakes;

    address public admin;

    constructor(address _platformToken, address _boredApe) {
        admin = msg.sender;
        platformToken = _platformToken;
        boredApe = _boredApe;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "You can't stake zero amount");
        require(IERC20(platformToken).balanceOf(msg.sender) >= _amount, "Insufficient balance");
        require(IERC721(boredApe).balanceOf(msg.sender) > 0, "You don't own a bored ape token");

        IERC20(platformToken).transferFrom(msg.sender, address(this), _amount);

        StakeData storage sData = stakes[msg.sender];
        sData.stakedAmount += _amount;
        sData.stakedTime = block.timestamp;
    }

    function withdraw() external {
        uint userStake = stakes[msg.sender].stakedAmount;
        require(userStake > 0, "You don't have a stake");
        require(IERC20(platformToken).balanceOf(address(this)) >= userStake, "No funds in contract");

        stakes[msg.sender].stakedAmount = 0;

        IERC20(platformToken).transfer(msg.sender, userStake);
    }

    function calculatedWithdraw() public  {
        StakeData storage sData = stakes[msg.sender];
        uint balance = sData.stakedAmount;

        require(balance > 0, "You don't have a stake");
        require(IERC20(platformToken).balanceOf(address(this)) >= balance, "No funds in contract");

        uint totalTime = block.timestamp - sData.stakedTime;
        uint gain = ((balance / 25920000) * totalTime);
        uint withdrawal = gain + balance;

        sData.stakedAmount = 0;

        IERC20(platformToken).transfer(msg.sender, withdrawal);
    }
}