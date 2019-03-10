import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactJson from 'react-json-view';
import web3 from "../utils/web3.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

//utility factory gernerated as a module
// import factory from "../utils/factory";

console.log("Web 3 accessed in contract component mount, version:", web3.version);
let factory;
const address = "0x072B4c3F066533c89C023faB066aED95cAa06a3d";
const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_newEscrow",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "weiAmount",
        "type": "uint256"
      }
    ],
    "name": "NewContract",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_depositor",
        "type": "address"
      },
      {
        "name": "_requestAmount",
        "type": "uint256"
      }
    ],
    "name": "create_and_deploy_service_agreement",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
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
      },
      {
        "name": "_requestAmount",
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
        "indexed": true,
        "name": "despositor",
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
        "type": "string"
      },
      {
        "indexed": true,
        "name": "actionToo",
        "type": "address"
      }
    ],
    "name": "NextAction",
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
    "constant": false,
    "inputs": [],
    "name": "deposit_funds",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "agree_upon_services_delievered",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
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
    "name": "get_balance",
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
    "constant": true,
    "inputs": [],
    "name": "see_owner",
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
    "name": "see_depositor",
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
      contractAddress: '',
      constructorArgs: [],
      weiAmount: ''
    };
  }

  componentWillMount = async () => {
    console.log("props at contract comp mount: ", this.props.contract);
    factory = await new web3.eth.Contract(abi, address);
    console.log("factory contract created, ", factory);
  }
  constructorArguments = () => {
    for (var i = 0; i < abi.length; i++){
      if(abi[i].type === "function"){
        return abi[i].inputs.map((input, key) => {
          if(input.type === 'uint256'){
            return <TextField
            id="outlined-name"
            margin="normal"
            variant="outlined"
            key={key}
            placeholder={input.name}
            value={this.state.weiAmount}
            onChange={e => this.handleWeiInput(e, key)}
            />  
          }
          return <TextField
          id="outlined-name"
          margin="normal"
          variant="outlined"
          key={key}
          placeholder={input.name}
          value={this.state.constructorArgs[key]}
          onChange={e => this.handleStringInput(e, key)}
          />
        });
      }
    }
  }
  handleWeiInput = (e, key) => {
    let constructorArgs = this.state.constructorArgs;
    let value = e.target.value;
    if(value[0] === '.'){
      console.log("target value starting with .");
      value = '0' + value;
    }
    constructorArgs[key] = value;
    this.setState({
      constructorArgs: constructorArgs,
      weiAmount: value
    });
  }
  handleStringInput = (e, key) => {
    let constructorArgs = this.state.constructorArgs;
    constructorArgs[key] = e.target.value;
    this.setState({
      constructorArgs: constructorArgs,
      toAddress: e.target.value
    });
  }

  accessContractFunction = async () => {
    this.setState({
      loading: true
    });
    //contract instance, function name, recipient this.state.toAddress
    const functionName = "create_and_deploy_service_agreement";
    let functionResults = await this.props.contract.accessContractFunctionWithArgs(factory, functionName, this.state.toAddress, 0, this.state.constructorArgs);
    this.setState({
      loading: false,
      deployedContractAddress: functionResults.events.NewContract.returnValues[0],
      functionResults: functionResults
    });
    console.log("access contract function, look for events:", functionResults);
    //then add returned value to database
    //TODO: find the 'next event' emission and set that in the thingy
    const contractRoute = process.env.REACT_APP_BACK_END_SERVER + 'contract';
    console.log("add contract route accessed on front end");
    //need to search by fromAddress and toAddress, as well as add contract to each user (in addition to flags)
    //{toAddress, fromAddress, actionNeeded, action}
    let actionFrom = await this.props.contract.getFirstAccount();
    axios.put(contractRoute, {
      actionFrom: actionFrom, 
      actionTo: this.state.toAddress,
      contractAddress: this.state.deployedContractAddress,
      abi: contractAbi,
      depositedValue: this.state.weiAmount,
      action: "deposit_funds"
    }).then(
      (res) => {
        console.log("contractRoute access complete, ", res);
      });
    
  }
  

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/*<ReactJson src={this.props.contractInfo.abi} />*/}
      <div className={classes.root}>
      <p>Use this button to deploy a simple escrow with the depositor as the address in this field:</p>
        {this.constructorArguments()}
        <Button
          variant="contained"
          color="primary"
          onClick={this.accessContractFunction}
          className={classes.button}
        >
          Deploy Contract (Testing)
        </Button>
        
      </div>
      {this.state.loading ?  <CircularProgress className={classes.progress} /> : <p>Example addresses (2): 0x59001902537Fa775f2846560802479EccD7B93Af
        or 0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0 (1)
      </p>}
      
      <p>See deployed contract address here:</p>
      {this.state.deployedContractAddress  ? <p>{this.state.deployedContractAddress}</p> : null}
      </div>
    );
  }
}

ServiceAgreement.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ServiceAgreement);
