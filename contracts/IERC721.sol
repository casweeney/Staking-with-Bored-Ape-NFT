// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

interface IERC721{
    function balanceOf(address account) external view returns (uint256);
    function symbol() external returns(string memory);
}