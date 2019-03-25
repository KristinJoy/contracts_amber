pragma solidity >=0.4.0<0.6.0;

contract AddText {
  string public message;
  address payable owner;
  
  event next_action(address action_to, uint256 value, string action, bool active);
  
  constructor(string memory _initialMessage, address payable _owner) public {
    owner = _owner;
    message = _initialMessage;
  }
  
  modifier isOwner(){
        require(msg.sender == owner);
        _;
    }

  function set_message(string memory newMessage) public isOwner{
    message = newMessage;
    emit next_action(owner, address(this).balance, "set_message", true);
  }
  
  function get_view_your_message() public view returns(string memory){
      return message;
  }
  
  function cancel() public isOwner {
      selfdestruct(owner);
  }

}
