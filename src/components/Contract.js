import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ReactJson from 'react-json-view';
import web3 from "../utils/web3.js";
import axios from 'axios';
let contractInstance;
const address = "0x2134d55F7E7708F3EF434FD0Bb756459b608B76D";
const abi = [
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
];

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});




class Contract extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentWillMount = async () => {
    console.log("props at contract comp mount: ", this.props.contract);
     // send axios call - need to write contract with correct flags to sender and receiver
    // can be done in one call, but split on the back end...
    const contractRoute = 'http://localhost:3001/contract';
    console.log("add contract route accessed on front end");
    //need to search by fromAddress and toAddress, as well as add contract to each user (in addition to flags)
    //{toAddress, fromAddress, receipt, actionNeeded, action}
    let actionFrom = await this.props.contract.getFirstAccount();
    await axios.put(contractRoute, {
      actionFrom: actionFrom, //TODO: make this the accounts[0]
      contractAddress: this.props.contractAddress
    }).then(
      (res) => {
        console.log("contractRoute access complete, ", res);
        this.setState({
          abi: res.data.abi,
          actionNeeded: res.data.actionNeeded,
          action: res.data.action,
          contractAddress: res.data.contractAddress
        });
        console.log("contract loaded, state: ", this.state);
      });
      console.log("creating contract instance w/ state", this.state);
    contractInstance = await new web3.eth.Contract(this.state.abi, this.state.contractAddress);
    console.log("contract instance created: ", contractInstance);
    this.filterAbi();
  }
  
  filterAbi = () => {
    let actionFunctions = this.state.abi.filter(method => {
      if (method.type === "function" && method.stateMutability !== 'view'){
        return method;
      }
    });
    let viewFunctions = this.state.abi.filter(method => {
      if (method.type === "function" && method.stateMutability === 'view'){
        return method;
      }
    });
    let contractEvents = this.state.abi.filter(method => {
      if (method.type === "event"){
        return method;
      }
    });
    this.setState({
      actionFunctions: actionFunctions,
      viewFunctions: viewFunctions,
      events: contractEvents
    });
    console.log("functions parsed, state: ", this.state);

    
  }
  accessContractFunction = async (method) => {
    let result = await this.props.contract.accessContractFunction(contractInstance, method/*todo: add to address here*/);
    console.log("contract function accessed in component, results: ", result);
  }
  handleClick = (e) => {
    console.log(e);
    console.log("clicked!!!");
  }
  getContractFunctionNames = (type) => {
    let functions;
    functions = type.map( (method, key) => {
      return <Button value={method.name} key={key} onClick={() => this.accessContractFunction(method.name)}>{method.name}</Button>;
    });
    return functions;
    //<p>{this.getContractFunctionNames(this.state.actionFunctions).map(functionName =>
    //<p>{functionName}</p>)}</p>
  }

  render() {
    return (
      <div>
        {/*<ReactJson src={this.props.contractInfo.abi} />*/}
        <h2>Load ABI from server:</h2>
        <h3>Actions: </h3>
        <hr/>
        {this.state.actionFunctions ? this.getContractFunctionNames(this.state.actionFunctions) : null}
        <h3>Views: </h3>
        <hr/>
        {this.state.viewFunctions ? this.getContractFunctionNames(this.state.viewFunctions) : null}
        <h3>Events: </h3>
        <hr/>
        {this.state.events ? <ReactJson src={this.state.events} /> : null}

      </div>
    );
  }
}

Contract.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Contract);
