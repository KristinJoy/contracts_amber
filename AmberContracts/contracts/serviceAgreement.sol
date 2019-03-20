pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract ServiceAgreement{
    //Libs
    using SafeMath for uint256;
    //Global
    address payable depositor;
    address payable creator;
    uint256 requestAmount;
    bool finished;

    //Events
    event Deposited(address depositor, uint256 weiAmount);
    event Destroyed(address creator,address depositor, string action);
    event NextAction(address actionTo, string action);
    event FINISHED(bool);


    constructor(address payable _depositor, address payable _creator, uint256 _request_amount )public{
        depositor = _depositor;
        creator = _creator;
        requestAmount = _request_amount;
        finished = false;
    }

    modifier isOwner(){
        require(msg.sender == creator);
        _;
    }

    modifier isDepositor(){
        require(msg.sender == depositor);
        _;
    }

    function deposit_funds() public payable isDepositor{
        require(msg.value == requestAmount);
        uint256 amount = msg.value;
        emit Deposited(msg.sender, amount);
        emit NextAction(msg.sender, "agree_upon_services_delivered");
    }

     function agree_upon_services_delivered() public payable isDepositor{
        finished = true;
        emit FINISHED(finished);
        emit NextAction(creator, "withdraw_and_terminate_contract");
    }

    function withdraw_and_terminate_contract() public payable isOwner {
        require(finished == true);
        address(creator).transfer(address(this).balance);
        emit Destroyed(creator, depositor, "this_contract_is_Complete");
        selfdestruct(depositor);
    }

    function cancel() public payable isOwner{
        selfdestruct(depositor);
    }

    function get_balance() public view returns(uint256){
        return address(this).balance;
    }

    function see_owner() public view returns(address){
        return creator;
    }

    function see_depositor() public view returns(address){
        return depositor;
    }
}
