pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'RecordLabelRole' to manage this role - add, remove, check
contract RecordLabelRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event RecordLabelAdded(address indexed account);
  event RecordLabelRemoved(address indexed account);

  // Define a struct 'recordLabels' by inheriting from 'Roles' library, struct Role
  Roles.Role private recordLabels;

  // In the constructor make the address that deploys this contract the 1st RecordLabel
  constructor() public {
    _addRecordLabel(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyRecordLabel() {
    require(isRecordLabel(msg.sender));
    _;
  }

  // Define a function 'isRecordLabel' to check this role
  function isRecordLabel(address account) public view returns (bool) {
    return recordLabels.has(account);
  }

  // Define a function 'addRecordLabel' that adds this role
  function addRecordLabel(address account) public onlyRecordLabel {
    _addRecordLabel(account);
  }

  // Define a function 'renounceRecordLabel' to renounce this role
  function renounceRecordLabel() public {
    _removeRecordLabel(msg.sender);
  }

  // Define an internal function '_addRecordLabel' to add this role, called by 'addRecordLabel'
  function _addRecordLabel(address account) internal {
    recordLabels.add(account);
    emit RecordLabelAdded(account);
  }

  // Define an internal function '_removeRecordLabel' to remove this role, called by 'removeRecordLabel'
  function _removeRecordLabel(address account) internal {
    recordLabels.remove(account);
    emit RecordLabelRemoved(account);
  }
}