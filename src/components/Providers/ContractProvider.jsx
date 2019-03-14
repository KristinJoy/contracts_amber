import React from 'react';
import axios from "axios";
import web3 from "../../utils/web3.js";

export var ContractContext = React.createContext();

class ContractProvider extends React.Component {
  constructor(props) {
    super(props);

    this.accessContractFunction = async (contractInstance, functionName, value = 0) => {
      console.log("access contract in provider, function in question: ", functionName );
      console.log("value of the contract access function: ", value);
      let accounts =  await web3.eth.getAccounts();
      //contract address in instance: contractInstance.options.address
      let results;
      if(functionName !== 'deposit_funds'){
        console.log("no value to add for access contract function");
        results = await contractInstance.methods[functionName]()
        .send({
          from: accounts[0]//,
          //min transaction cost is 2100, then 4 gas for a zero byte, 68 gas for non-zeros
          //gas: '500000',
          //gasLimit: '500000'
        });
      }
      else{
        results = await contractInstance.methods[functionName]()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(value, 'ether')
        });
      }
      console.log('access function in provider finished, result: ', results);
      return results;
    }

    this.accessContractFunctionWithArgs = async (contractInstance, functionName, args) => {
      let accounts =  await web3.eth.getAccounts();
      //testing arg params for number input, if so, converting to wei:
      for (var i = 0; i < args.length; i++){
         //if it starts with a period, needs to start with 0 to be converted to wei:
        if (args[i][0] === '.'){
            args[i] = '0' + args[i];
          }
        //-------------------------SUPER JANKY OPERATION TO COMPARE A NUMBER STRING TO ITSELF AND EXCLUDE ADDRESSES-----------------------------
        if(Number(args[i]).toString() === args[i].toString()){
          args[i] = web3.utils.toWei(args[i], 'ether');
        }
      }
      //need to destructure the ...args here so they are passed as literal args rather than an [Array]
      let results = await contractInstance.methods[functionName](...args)
        .send({
          from: accounts[0]
        });
      console.log('access function in provider finished, result: ', results);
      return results;
    }

    this.getFirstAccount = async () => {
      let accounts =  await web3.eth.getAccounts();
      return accounts[0];
    }
    this.accessContractViewFunction = async (contractInstance, functionName) => {
      console.log("view contract in provider, function in question: ", functionName );
      let accounts =  await web3.eth.getAccounts();
      //contract address in instance: contractInstance.options.address
      let results;
      results = await contractInstance.methods[functionName]()
      .call({
        from: accounts[0],
        gas: '500000'
      });
      console.log('access function in provider finished, result: ', results);
      return results;
    }
    this.state = {
      accessContractFunctionWithArgs : this.accessContractFunctionWithArgs,
      accessContractFunction : this.accessContractFunction,
      accessContractViewFunction : this.accessContractViewFunction,
      getFirstAccount: this.getFirstAccount
    };
  }


  render() {
    return (
      <ContractContext.Provider value={this.state}>
        {this.props.children}
      </ContractContext.Provider>
    );
  }
}

export default ContractProvider;
