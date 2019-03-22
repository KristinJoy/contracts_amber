pragma solidity >=0.4.21 <0.6.0;

contract RainyDayContract {

    mapping (address => uint) private balances;
    address payable owner;
    address payable oracleAddress = 0x3723e3c6C400fb14bcEBCC33C40048701ba565Db;

    event next_action(address action_to, uint256 value, string action, bool active);

    constructor(address payable _owner) public payable {
        require(msg.value >= .5 ether);
        owner = _owner;
    }

    function deposit() public payable returns (uint) {
        balances[msg.sender] += msg.value;
        emit next_action(owner, address(this).balance, "deposit", true);
        return balances[msg.sender];
    }
    
    function get_contract_balance() public view returns (uint) {
        return address(this).balance;
    }

    function issue_refund() public payable {
        require(msg.sender == oracleAddress);
        uint refundToOracle = (0.000037700 ether);
        uint refundToOwner = (address(this).balance) - refundToOracle;
        oracleAddress.transfer(refundToOracle);
        owner.transfer(refundToOwner);	
        emit next_action(owner, address(this).balance, "this_contract_is_complete", false);
				selfdestruct(owner);
    }

}