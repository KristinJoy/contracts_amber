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
      console.log("access contract function with args accessed");
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
      console.log('access function with args in provider finished, result: ', results);
      return results;
    }
    this.accessContractFunctionWithValue = async (contractInstance, functionName, value = 0) => {
      console.log("access contract function with value accessed");
      let accounts =  await web3.eth.getAccounts();
      console.log("about to call ", functionName);
      let results = await contractInstance.methods[functionName](accounts[0])
      .send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      });
      console.log('access function with value in provider finished, result: ', results);
      return results;
    }

    this.getFirstAccount = async () => {
      let accounts =  await web3.eth.getAccounts();
      return accounts[0];
    }
    this.getBalance = async () => {
      let accounts =  await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      return web3.utils.fromWei(balance, 'ether');
    }
    this.accessContractViewFunction = async (contractInstance, functionName) => {
      let accounts =  await web3.eth.getAccounts();
      //contract address in instance: contractInstance.options.address
      let results;
      results = await contractInstance.methods[functionName]()
      .call({
        from: accounts[0]//,
        //gas: '500000'
      });
      return results;
    }
    this.getContractsByAddress = async (publicAddress) => {
      if(!publicAddress){
        publicAddress = await this.getFirstAccount();
      }
      console.log("getting accounts by address: ", publicAddress);
      const getUser = process.env.REACT_APP_BACK_END_SERVER + 'getUser';
      let results = await axios.put(getUser, {publicAddress: publicAddress}).then(
        (res) => {
          if(!res.data.contracts){
            console.log("no contracts found");
            return 0;
          }
          else {
            return res.data.contracts;
          }
        });
      return results;
    }
    this.state = {
      accessContractFunctionWithArgs : this.accessContractFunctionWithArgs,
      accessContractFunction : this.accessContractFunction,
      accessContractViewFunction : this.accessContractViewFunction,
      accessContractFunctionWithValue : this.accessContractFunctionWithValue,
      getFirstAccount: this.getFirstAccount,
      getBalance: this.getBalance,
      getContractsByAddress: this.getContractsByAddress,
      factory: {
        factoryContractAddress: '0xca01400FA8fB96843dedE148Cf4807D5FF8D9262', //9:03 3/24
        factoryContractAbi: [
          {
            "constant": false,
            "inputs": [
              {
                "name": "_newMessage",
                "type": "string"
              }
            ],
            "name": "add_text",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "rainy_day",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_depositor",
                "type": "address"
              },
              {
                "name": "_request_amount",
                "type": "uint256"
              }
            ],
            "name": "service_agreement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "new_contract",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "action_to",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "value",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "action",
                "type": "string"
              }
            ],
            "name": "new_contract",
            "type": "event"
          }
        ],
        childContracts: {
          service_agreement: {
            abi: [
              {
                  "constant": false,
                  "inputs": [],
                  "name": "withdraw_and_terminate_contract",
                  "outputs": [],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "see_contract_owner",
                  "outputs": [
                      {
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [],
                  "name": "deposit_funds",
                  "outputs": [],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "get_balance_of_contract",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [],
                  "name": "agree_upon_services_delivered",
                  "outputs": [],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "see_the_depositor_of_the_contract",
                  "outputs": [
                      {
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [],
                  "name": "cancel",
                  "outputs": [],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "name": "_depositor",
                          "type": "address"
                      },
                      {
                          "name": "_creator",
                          "type": "address"
                      },
                      {
                          "name": "_request_amount",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "constructor"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": false,
                          "name": "action_to",
                          "type": "address"
                      },
                      {
                          "indexed": false,
                          "name": "value",
                          "type": "uint256"
                      },
                      {
                          "indexed": false,
                          "name": "action",
                          "type": "string"
                      },
                      {
                          "indexed": false,
                          "name": "active",
                          "type": "bool"
                      }
                  ],
                  "name": "next_action",
                  "type": "event"
              }
          ],
            steps: ["deposit_funds", "agree_upon_services_delivered", "withdraw_and_terminate_contract"],
            description: "Enter into a Service Agreement with another address on the blockchain. You will be able to ask another address to deposit funds into an escrow, and release them once the services have been delivered."
          },
          rainy_day: {
            abi: [
              {
                  "constant": false,
                  "inputs": [],
                  "name": "issue_refund",
                  "outputs": [],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [],
                  "name": "deposit",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [],
                  "name": "cancel",
                  "outputs": [],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "get_contract_balance",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "name": "_owner",
                          "type": "address"
                      }
                  ],
                  "payable": true,
                  "stateMutability": "payable",
                  "type": "constructor"
              },
              {
                  "anonymous": false,
                  "inputs": [
                      {
                          "indexed": false,
                          "name": "action_to",
                          "type": "address"
                      },
                      {
                          "indexed": false,
                          "name": "value",
                          "type": "uint256"
                      },
                      {
                          "indexed": false,
                          "name": "action",
                          "type": "string"
                      },
                      {
                          "indexed": false,
                          "name": "active",
                          "type": "bool"
                      }
                  ],
                  "name": "next_action",
                  "type": "event"
              }
          ],
            steps: ["deposit_more_funds", "wait_for_rain"],
            description: "A rainy day contract requires a deposit of at least",
            minValue: .69
          },
          add_text: {
            abi: [
              {
                "constant": false,
                "inputs": [
                  {
                    "name": "newMessage",
                    "type": "string"
                  }
                ],
                "name": "set_message",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "get_view_your_message",
                "outputs": [
                  {
                    "name": "",
                    "type": "string"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "message",
                "outputs": [
                  {
                    "name": "",
                    "type": "string"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              },
              {
                "constant": false,
                "inputs": [],
                "name": "cancel",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "name": "_initialMessage",
                    "type": "string"
                  },
                  {
                    "name": "_owner",
                    "type": "address"
                  }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": false,
                    "name": "action_to",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                  },
                  {
                    "indexed": false,
                    "name": "action",
                    "type": "string"
                  },
                  {
                    "indexed": false,
                    "name": "active",
                    "type": "bool"
                  }
                ],
                "name": "next_action",
                "type": "event"
              }
            ],
            steps: ["set_message"],
            description: "Add text content of your choice to the blockchain"
          }
        }
      }
    }
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
