import React from 'react';
import axios from "axios";
import web3 from "../../utils/web3.js";

export var ContractContext = React.createContext();

class ContractProvider extends React.Component {
  constructor(props) {
    super(props);
    this.accessContractFunction = async (contractInstance, functionName, toAddress, value = 0) => {
      console.log("access contract in provider, function in question: ", functionName );
      console.log("value of the contract access function: ", value);
      let accounts =  await web3.eth.getAccounts();
      //contract address in instance: contractInstance.options.address
      let results = await contractInstance.methods[functionName]()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(value, 'ether')
        });
      console.log('access function in provider finished, result: ', results);
      //gonna add these results to our database
      const contractRoute = process.env.REACT_APP_BACK_END_SERVER + 'contract';
      /*await axios.put(contractRoute, {
        actionFrom: accounts[0], 
        actionTo: toAddress,
        contractAddress: contractInstance.options.address//,
        //action: results.events.NextAction.returnValues[0]
      }).then(
        (res) => {
          console.log("contractRoute access complete, ", res);
        });*/
      return results;
    }
    this.accessContractFunctionWithArgs = async (contractInstance, functionName, toAddress, value = 0, args) => {
      console.log("access contract function: ", functionName );
      console.log("with the arguments: ", args[0], args[1]);
      let accounts =  await web3.eth.getAccounts();
      //contract address in instance: contractInstance.options.address
      let results = await contractInstance.methods[functionName](args[0], web3.utils.toWei(args[1], 'ether'))
        .send({
          from: accounts[0]
        });
      console.log('access function in provider finished, result: ', results);
      //gonna add these results to our database
      const contractRoute = process.env.REACT_APP_BACK_END_SERVER + 'contract';
      /*await axios.put(contractRoute, {
        actionFrom: accounts[0], 
        actionTo: toAddress,
        contractAddress: contractInstance.options.address//,
        //action: results.events.NextAction.returnValues[0]
      }).then(
        (res) => {
          console.log("contractRoute access complete, ", res);
        });*/
      return results;
    }
    this.getFirstAccount = async () => {
      let accounts =  await web3.eth.getAccounts();
      return accounts[0];
    }
    this.state = {
      accessContractFunctionWithArgs : this.accessContractFunctionWithArgs,
      accessContractFunction : this.accessContractFunction,
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
