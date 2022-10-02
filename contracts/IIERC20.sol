// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

interface IIERC20 {
    function transferFrom(address _from,address _to,uint256 _amount) external returns(bool);
    function transfer(address _to,uint256 _amount) external returns(bool);
    function symbol() external returns(string memory);
    function balanceOf(address account) external view returns (uint256);
    function decimals() external view returns (uint256);
}