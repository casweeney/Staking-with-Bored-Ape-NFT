// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PulseToken is ERC20, Ownable {
    uint public constant maxTotalSupply = 2000000 * 10 ** 18;
    address public admin;
    constructor() ERC20("Pulse Token", "PST") {
        admin = msg.sender;
        _mint(address(this), maxTotalSupply);
        _mint(admin, 2000000 * 10 ** 18);
    }

    function mint(uint _amount) public {
        _mint(msg.sender, _amount);
    }
}