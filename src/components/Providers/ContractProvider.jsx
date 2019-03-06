import React from 'react';
import axios from "axios";
import web3 from "../../utils/web3.js";

export var ContractContext = React.createContext();

class ContractProvider extends React.Component {
  constructor(props) {
    super(props);
    this.accessContractFunction = async (contractInstance, functionName, toAddress, value) => {
      console.log("access contract in provider, function in question: ", functionName );
      let accounts =  await web3.eth.getAccounts();
      console.log("accounts", accounts);
      let results = await contractInstance.methods[functionName](toAddress)
        .send({
          from: accounts[0]
        });
      console.log('access function in provider finished, result: ', results);
      return results;
    }
    this.state = {
      accessContractFunction : this.accessContractFunction
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
