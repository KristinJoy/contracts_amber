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
    }
    this.state = {
      escrowFactory: this.escrowFactory
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
