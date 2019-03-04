import React from 'react';
import axios from "axios";

export var ContractContext = React.createContext();

class ContractProvider extends React.Component {
  constructor(props) {
    super(props);
    //updateGame method takes a user id, and uses the /update Express route
    //to reset the GameProvider state w/ new user and current circuit data from the server
    this.escrowFactory = {
      address: "0x2134d55F7E7708F3EF434FD0Bb756459b608B76D",
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_depositor",
              type: "address"
            }
          ],
          name: "creator",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              name: "_newEscrow",
              type: "address"
            }
          ],
          name: "NewContract",
          type: "event"
        }
      ]
    }//closes escrowFactory
    this.escrow = {
      abi: [
          {
            "inputs": [
              {
                "name": "_depositor",
                "type": "address"
              },
              {
                "name": "_creator",
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
                "indexed": true,
                "name": "payee",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "weiAmount",
                "type": "uint256"
              }
            ],
            "name": "Deposited",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "creator",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "weiAmount",
                "type": "uint256"
              }
            ],
            "name": "Withdrawn",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "",
                "type": "bool"
              }
            ],
            "name": "FINISHED",
            "type": "event"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "payee",
                "type": "address"
              }
            ],
            "name": "depositsOf",
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
            "inputs": [
              {
                "name": "payee",
                "type": "address"
              }
            ],
            "name": "deposit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "setFinished",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getBalance",
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
            "name": "cancel",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "seeOwner",
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
            "constant": true,
            "inputs": [],
            "name": "seeDepositor",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          }
        ]
    }
    this.state = {
      escrowFactory: this.escrowFactory,
      escrow: this.escrow
    };
  }


  render() {
    //<UserProvider> component returns the <UserContext.Provider> object
    //with the value passing to anything inside of it the state contained
    //in the initial and subsequent setting of this Component's state
    return (
      <ContractContext.Provider value={this.state}>
        {this.props.children}
      </ContractContext.Provider>
    );
  }
}

export default ContractProvider;
