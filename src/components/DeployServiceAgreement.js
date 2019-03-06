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
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

//utility factory gernerated as a module
// import factory from "../utils/factory";

console.log("Web 3 accessed in contract component mount, version:", web3.version);
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
const contractAbi = [
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




class ServiceAgreement extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toAddress: '',
      loading: false,
      deployedContractAddress: '',
      contractAddress: ''
    };
  }

  componentWillMount = async () => {
    console.log("props at contract comp mount: ", this.props.contract);
    factory = await new web3.eth.Contract(abi, address);
    console.log("factory contract created, ", factory);
	}

  accessContractFunction = async () => {
    this.setState({
      loading: true
    });
    //contract instance, function name, recipient this.state.toAddress
    let componentResults = await this.props.contract.accessContractFunction(factory, "creator", this.state.toAddress);
    this.setState({
      loading: false,
      deployedContractAddress: componentResults.events.NewContract.returnValues._newEscrow,
      componentResults: componentResults
    });
    console.log("results", componentResults);
    
  }
  addContractRoute = async () => {
    // send axios call - need to write contract with correct flags to sender and receiver
    // can be done in one call, but split on the back end...
    const contractRoute = 'http://localhost:3001/contract';
    console.log("add contract route accessed on front end");
    //need to search by fromAddress and toAddress, as well as add contract to each user (in addition to flags)
    //{toAddress, fromAddress, receipt, actionNeeded, action}
    axios.put(contractRoute, {
      actionFrom: '0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0', //TODO: make this the accounts[0]
      actionTo: this.state.toAddress,
      contractAddress: this.state.deployedContractAddress,
      abi: contractAbi,
      action: "nextAction"
    }).then(
      (res) => {
        console.log("contractRoute access complete, ", res);
      });
  }

  handleInput = (e) => {
    this.setState({
      toAddress: e.target.value
    });
  }
  routeInput = (e) => {
    this.setState({
      deployedContractAddress: e.target.value
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/*<ReactJson src={this.props.contractInfo.abi} />*/}
      <div className={classes.root}>
        <TextField
            id="outlined-name"
            margin="normal"
            variant="outlined"
            value={this.state.toAddress}
            onChange={e => this.handleInput(e)}
            />
            <br/>
        <Button
          variant="contained"
          color="primary"
          onClick={this.accessContractFunction}
          className={classes.button}
        >
          Deploy Contract (Testing)
        </Button>
      </div>
      {this.state.loading ?  <CircularProgress className={classes.progress} /> : <p>Example address (2): 0x59001902537Fa775f2846560802479EccD7B93Af</p>}
      
      <p>See deployed contract address here:</p>
      {this.state.deployedContractAddress  ? <p>{this.state.deployedContractAddress}</p> : null}

      <p>Then put it in here to test weather the route is working:</p>
      <div>
        <TextField
            id="outlined-name"
            margin="normal"
            variant="outlined"
            value={this.state.deployedContractAddress}
            onChange={e => this.routeInput(e)}
            />
            <br/>
        <Button
          variant="contained"
          color="primary"
          onClick={this.addContractRoute}
          className={classes.button}
        >
          Add Contract To Database (Testing)
        </Button>
      </div>
      </div>
    );
  }
}

ServiceAgreement.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ServiceAgreement);
