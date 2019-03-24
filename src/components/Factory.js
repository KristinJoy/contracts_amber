import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import web3 from "../utils/web3.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import _ from 'lodash';
import Loading from './Loading.js';
import SideBar from "./SideBar.js";
import {Link} from 'react-router-dom';
let price = require('crypto-price');


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
      weiAmount: '',
      price: []
    };
  }

  componentWillMount = async () => {
    const {match: {params}} = this.props;
    this.setState({
      contractType: params.contractType
    });
    factory = await new web3.eth.Contract(this.props.utilities.factory.factoryContractAbi, this.props.utilities.factory.factoryContractAddress);
    console.log("factory contract created, ", factory);
  }
  constructorArguments = () => {
    //loops through factory ABI and shows a text field with the proper placeholder
    for (var i = 0; i < this.props.utilities.factory.factoryContractAbi.length; i++){
      if(this.props.utilities.factory.factoryContractAbi[i].name === this.state.contractType){
        return this.props.utilities.factory.factoryContractAbi[i].inputs.map((input, key) => {
          let type = "text";
          if (input.type === "uint256") {type = "number"}
          return <div>
            <TextField
            id="outlined-name"
            margin="normal"
            variant="outlined"
            key={key}
            type={type}
            placeholder={_.startCase(_.toLower(input.name))}
            value={this.state.constructorArgs[key]}
            onChange={e => this.handleInput(e, key)}
            />
            {type === "number" ? <p>Value in dollars: {this.state.price[key]}</p> : null}
            <br/>
          </div>
        });
      }
    }
  }
  handleInput = async (e, key) => {
    //assign old input to new arg to keep value
    let constructorArgs = this.state.constructorArgs;
    let prices = this.state.price;
    // switch values to what user is inputting
    constructorArgs[key] = e.target.value;
    this.setState({
      constructorArgs: constructorArgs
    });
    let number = Number(e.target.value);
    let amount = await price.getCryptoPrice('USD', 'ETH').then(obj => {
        return number * obj.price;
    }).catch(err => {
        console.log(err)
    });
    prices[key] = amount.toString();
    //set that back to args to pass the constructor
    //NOTE!!! WEI CONVERSIONS ARE HANDLED IN THE PROVIDER
    this.setState({
      price: prices
    });
  }

  accessContractFunction = async () => {
    this.setState({
      loading: true
    });
    let results = await this.props.utilities.accessContractFunctionWithArgs(factory, this.state.contractType, this.state.constructorArgs);
    let contractReturn = results.events.new_contract.returnValues;
    this.setState({
      loading: false,
      deployedContractAddress: contractReturn.new_contract,
      results: results
    });
    const contractRoute = process.env.REACT_APP_BACK_END_SERVER + 'contract';
    //{toAddress, fromAddress, actionNeeded, action}
    let actionFrom = await this.props.utilities.getFirstAccount();
    let value = 0;
    if(contractReturn.value){
      value = web3.utils.fromWei(contractReturn.value, 'ether');
    }
    axios.put(contractRoute, {
      contractType: this.state.contractType,
      contractBetween: [actionFrom, contractReturn.action_to],
      actionFrom: actionFrom, 
      actionTo: contractReturn.action_to,
      contractAddress: this.state.deployedContractAddress,
      abi: this.props.utilities.factory.childContracts[this.state.contractType].abi,
      value: value,
      steps: this.props.utilities.factory.childContracts[this.state.contractType].steps,
      active: true,
      action: contractReturn.action
    }).then(
      (res) => {
        console.log("contractRoute access complete, ", res);
      });
    
  }
  render() {
    const { classes } = this.props;
    return (
      <SideBar>
        <div className={classes.root}>
        <p>{this.props.utilities.factory.childContracts[this.state.contractType].description}</p>
          {this.constructorArguments()}
          <Button
            variant="contained"
            color="primary"
            onClick={this.accessContractFunction}
            className={classes.button}
          >
            Deploy Contract
          </Button>
        </div>
        {this.state.loading ?  <Loading message="Deploying your contract to the blockchain..." /> : <p>Example addresses (2): 0x59001902537Fa775f2846560802479EccD7B93Af
          or 0x72BA71fBB2aAdf452aE63AFB2582aA9AE066eAA0 (1)
        </p>}
        
        <p>See deployed contract address here:
        {this.state.deployedContractAddress  ? <Link to={`/contracts/${this.state.deployedContractAddress}`}>{this.state.deployedContractAddress}</Link> : null}</p>
      </SideBar>
    );
  }
}

Factory.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Factory);
