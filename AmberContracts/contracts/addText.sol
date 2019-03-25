pragma solidity >=0.4.0<0.6.0;

contract AddText {
  string public see_your_message;
  address payable owner;
  
  event next_action(address action_to, uint256 value, string action, bool active);
  
  constructor(string memory _initialMessage, address payable _owner) public {
    owner = _owner;
    see_your_message = _initialMessage;
  }
  
  modifier isOwner(){
        require(msg.sender == owner);
        _;
    }

  function set_message(string memory newMessage) public isOwner{
    see_your_message = newMessage;
    emit next_action(owner, address(this).balance, "set_message", true);
  }
  
  function cancel() public isOwner {
      selfdestruct(owner);
  }

}
