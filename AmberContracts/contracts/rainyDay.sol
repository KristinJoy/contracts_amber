pragma solidity >=0.4.21 <0.6.0;

contract RainyDayContract {

    mapping (address => uint256) private balances;
    address payable owner;
    address payable oracleAddress = 0x3723e3c6C400fb14bcEBCC33C40048701ba565Db;

    event LogDepositMade(address accountAddress, uint256 amount);

    constructor(address payable _owner) public payable {
        require(msg.value >= 1 ether, "1 or more ether initial funding required");
        owner = _owner;
    }

    function deposit() public payable returns (uint256) {
        balances[msg.sender] += msg.value;
        emit LogDepositMade(msg.sender, msg.value);
        return balances[msg.sender];
    }

    function balance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function depositsBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function issueRefund() public payable {

        require(msg.sender == oracleAddress);

        uint256 refundToOracle = (0.000037700 ether);

        uint256 refundToOwner = (address(this).balance) - refundToOracle;

        oracleAddress.transfer(refundToOracle);

        owner.transfer(refundToOwner);

    }

}