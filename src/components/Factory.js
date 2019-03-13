import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import web3 from "../utils/web3.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

let factory;

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

class Factory extends React.Component {
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
    factory = await new web3.eth.Contract(this.props.factoryContractAbi, this.props.factoryContractAddress);
    console.log("factory contract created, ", factory);
  }
  constructorArguments = () => {
    //loops through factory ABI and shows a text field with the proper placeholder
    for (var i = 0; i < this.props.factoryContractAbi.length; i++){
        return this.props.factoryContractAbi[i].inputs.map((input, key) => {
          return <TextField
          id="outlined-name"
          margin="normal"
          variant="outlined"
          key={key}
          placeholder={input.name}
          value={this.state.constructorArgs[key]}
          onChange={e => this.handleInput(e, key)}
          />
        });
      }
  }
  handleInput = (e, key) => {
    //assign old input to new arg to keep value
    let constructorArgs = this.state.constructorArgs;
    // switch values to what user is inputting
    constructorArgs[key] = e.target.value;
    //set that back to args to pass the constructor
    //NOTE!!! WEI CONVERSIONS ARE HANDLED IN THE PROVIDER
    this.setState({
      constructorArgs: constructorArgs
    });
  }

  accessContractFunction = async () => {
    this.setState({
      loading: true
    });
    //contract instance, function name, recipient this.state.toAddress
    const functionName = "create_and_deploy_service_agreement";
    let functionResults = await this.props.contract.accessContractFunctionWithArgs(factory, functionName, this.state.constructorArgs);
    this.setState({
      loading: false,
      //CHANGE THIS TO UNIVERSAL 'newContract' ADDRESS RETURN:
      deployedContractAddress: functionResults.events.NewContract.returnValues._newEscrow,
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
      //CHANGE THIS TO UNIVERSAL functionResults...returnValues.actionTo:
      actionTo: this.state.constructorArgs[0],
      contractAddress: this.state.deployedContractAddress,
      abi: this.props.deployedFactoryContractAbi,
      //FIGURE OUT WHAT TO DO WITH THIS (NECESSARY TO PASS EXPECTED CONTRACT VALUE TO DATABASE):
      //POSSIBLY MAKE A CONTRACT EMIT 'MAX_CONTRACT_VALUE' EVERY TIME A RELEVANT EVENT IS FIRED (ASSIGN DEPOSIT VALUE, DEPOSIT, WITHDRAW, HAVE FOR RECORDS):
      depositedValue: functionResults.events.NewContract.returnValues.weiAmount,
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

Factory.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Factory);
