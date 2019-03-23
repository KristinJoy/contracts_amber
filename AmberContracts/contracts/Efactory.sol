pragma solidity >=0.4.0<0.6.0;

import "./serviceAgreement.sol";
import "./rainyDay.sol";

contract AmberContractFactory {

		event new_contract(address new_contract, address action_to, uint256 value, string action);

    function service_agreement(address payable _depositor, uint256 _request_amount) public {
        address _new_contract = address(new ServiceAgreement(_depositor, msg.sender, _request_amount));
        emit new_contract(_new_contract, _depositor, _request_amount, "deposit_funds");
    }
    
    function rainy_day(address payable _owner) public payable {
        address _newRainyDay = address((new RainyDayContract).value(msg.value)(_owner));
        emit new_contract(_newRainyDay, _owner, msg.value, "deposit");
    }
}