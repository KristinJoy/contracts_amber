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
    event NextAction(address actionTo, uint256 value, string action, bool active);


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
        emit NextAction(msg.sender, amount, "agree_upon_services_delivered", true);
    }
    
     function agree_upon_services_delivered() public payable isDepositor{
        emit NextAction(creator, address(this).balance, "withdraw_and_terminate_contract", true);
    }

    function withdraw_and_terminate_contract() public payable isOwner {
        require(finished == true);
        address(creator).transfer(address(this).balance);
        emit NextAction(depositor, address(this).balance, "services_rendered_and_contract_closed", false);
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