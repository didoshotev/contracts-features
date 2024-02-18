// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeffToken is ERC20, Ownable {
    constructor() ERC20("DeffToken", "DEFF") {}
}
