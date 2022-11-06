//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
  mapping(string => uint256) public nameToFavoriteNumber;

  function addUserFavoriteNumber(string memory name, uint256 number)
    public
    virtual
  {
    nameToFavoriteNumber[name] = number;
  }

  function getUserFavoriteNumber(string memory name)
    public
    view
    returns (uint256)
  {
    return nameToFavoriteNumber[name];
  }
}
