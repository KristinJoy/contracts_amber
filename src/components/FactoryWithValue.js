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
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
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
  center: {
    textAlign: "center"
  }
});

class FactoryWithValue extends React.Component {
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
          <Typography variant="body1">{fixCase(input.name)} {fixCase(input.name) === 'Depositor' ? "'s Address" : null}</Typography>
          <TextField
          id="outlined-name"
          margin="normal"
          variant="outlined"
          key={key}
          type={type}
          placeholder={fixCase(input.name)}
          value={this.state.constructorArgs[key]}
          onChange={e => this.handleInput(e, key)}
          />
          {type === "number" ? this.state.price.length ? <Typography variant="body1">Value in dollars: {this.state.price[key]}</Typography> : null : null}
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
  updateValue = async (e) => {
    this.setState({value: e.target.value});
    let number = Number(e.target.value);
    let amount = await price.getCryptoPrice('USD', 'ETH').then(obj => {
        return number * obj.price;
    }).catch(err => {
        console.log(err)
    });
    //set that back to args to pass the constructor
    //NOTE!!! WEI CONVERSIONS ARE HANDLED IN THE PROVIDER
    this.setState({
      valuePrice: amount.toString()
    });
  }
  accessContractFunction = async () => {
    this.setState({
      loading: true
    });
    let results = await this.props.utilities.accessContractFunctionWithValue(factory, this.state.contractType, this.state.value);
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
        <Card raised={true} className={classes.root}>
          <CardContent>
          {this.state.deployedContractAddress ?
              <div>
                <Typography variant="h6">
                  See Your Deployed {fixCase(this.state.contractType)} Contract Here:
                </Typography>
                <Link to={`/contracts/${this.state.deployedContractAddress}`}>
                  {this.state.deployedContractAddress}
                </Link>
              </div>
            : 
            <div>
            <Typography style={{ textAlign: "center" }} variant="h3">
              {fixCase(this.state.contractType)}
            </Typography>
            <Typography style={{ textAlign: "center" }} variant="h6">
              {
                this.props.utilities.factory.childContracts[
                  this.state.contractType
                ].description
              }
              {
                this.props.utilities.factory.childContracts[
                  this.state.contractType
                ].minValue
              }
              ether
            </Typography>
            <TextField
              id="outlined-name"
              margin="normal"
              variant="outlined"
              placeholder="Value to Add..."
              value={this.state.value}
              onChange={e => this.updateValue(e)}
            />
            <br />
            {this.state.valuePrice ? (
              <Typography variant="body1">
                Value in dollars: $
                {Number(this.state.valuePrice).toFixed(2)}
              </Typography>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              onClick={this.accessContractFunction}
              className={classes.button}
            >
              Deploy Contract
            </Button></div>}
          </CardContent>
        </Card>
        {this.state.loading ? (
          <Loading message="Deploying your contract to the blockchain..." />
        ) : null}
      </SideBar>
    );
  }
}
let fixCase = (action) => {
  return _.startCase(_.toLower(action));
}
FactoryWithValue.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(FactoryWithValue);
