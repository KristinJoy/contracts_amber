import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import web3 from "utils/web3.js";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  textField: {
    marginLeft: "0",
    marginRight: "0"
  },
  dense: {
    marginTop: 16
  }
};
let factory;
const address = "0x2134d55F7E7708F3EF434FD0Bb756459b608B76D";
const abi = [
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
];

class ServiceAgreement extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    factory = new web3.eth.Contract(abi, address);
    console.log("contract, ", factory);
  }

  handleClick = async () => {
    let accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);
    let results = await factory.methods
      .creator("0xEF4a23Eae7F2320082E5bc3b22995e9752e257BC")
      .send({
        from: accounts[0]
      });
    console.log("results", results);
  };
  handleDeployForm = event => {
    event.preventDefault();
    console.log("contract deployed");
    const toAddress = "adressofrecipient";
    const fromAddress = this.props.publicAddress;
    const getUser = "http://localhost:3001/getUser";
    //TODO: create contract object to pass to the addcontract route
    //
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleDeployForm}>
          <label>
            <p>Submit Contract With Button Below:</p>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(ServiceAgreement);
