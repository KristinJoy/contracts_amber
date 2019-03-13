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
import _ from 'lodash';

let contractInstance;

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
      inputs: []
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
      actionFrom: actionFrom,
      contractAddress: this.props.contractAddress
    }).then(
      (res) => {
        console.log("contractRoute access complete, ", res);
        this.setState({
          abi: res.data.abi,
          actionNeeded: res.data.actionNeeded,
          action: res.data.action,
          contractActionTo: res.data.actionTo,
          contractActionFrom: res.data.actionFrom,
          contractAddress: res.data.contractAddress,
          depositedValue: res.data.depositedValue
        });
      });
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
    //render view functions here:
    this.renderViewFunctions();
  }
  accessContractFunction = async (method, key) => {
    const value = this.state.depositedValue;
    console.log("eth value when calling contract function: ", value);
    //instance, name, toAddress (of person to send action to), value
    //let result = await this.props.contract.accessContractFunction(contractInstance, method, this.state.contractActionFrom, value);
    let result = await this.props.contract.accessContractFunction(contractInstance, method, this.state.contractActionFrom, value);
    console.log("contract function accessed in component, results: ", result);
    //add result to database
    console.log("after function access, the next action: ", result.events.NextAction.returnValues[0]);
    console.log("after function access, the address to pass it to: ", result.events.NextAction.returnValues[1]);
    const contractRoute = process.env.REACT_APP_BACK_END_SERVER + 'contract';
    let actionFrom = await this.props.contract.getFirstAccount();
    const routeOptions = await {
      actionFrom: actionFrom, 
      actionTo: result.events.NextAction.returnValues.actionTo,
      contractAddress: this.state.contractAddress,
      action: result.events.NextAction.returnValues.action
    }
    axios.put(contractRoute, routeOptions).then(
      (res) => {
        console.log("contractRoute access complete, ", res);
      });
  }
  accessContractViewFunction = async (method) => {
    //instance, name, toAddress (of person to send action to), value
    //let result = await this.props.contract.accessContractFunction(contractInstance, method, this.state.contractActionFrom, value);
    let result = await this.props.contract.accessContractViewFunction(contractInstance, method);
    console.log("contract function accessed in component, results: ", result);
    //add result to database
    console.log("after view function access, return values: ", result.events.NextAction.returnValues);
  }
  handleInput = (e, key) => {
    let inputs = this.state.inputs;
    inputs[key] = e.target.value;
    this.setState({
      inputs: inputs
    });
  }
  getContractFunctions = (type) => {
    let functions;
    functions = type.map( (method, key) => {
      //the below code renders only the function specified by the current action - if there is none, it returns null (this.state.actionNeeded should be handled inline in the render statement)
      if(this.state.actionNeeded){
        if(this.state.action === method.name){
          return <div>
            {/*if there are inputs to input:*/}
            {method.inputs.length > 0 ? 
            <div>
            <TextField
              id="outlined-name"
              margin="normal"
              variant="outlined"
              key={key}
              value={this.state.inputs[key] ? this.state.inputs[key] : ""}
              onChange={e => this.handleInput(e, key)}/>
            <br/>
            </div> : null}
            <Button 
                color={'primary'}
                variant="contained"
                disabled={this.state.action !== method.name} 
                value={method.name} 
                key={key} 
                onClick={() => this.accessContractFunction(method.name, key)}>
                {_.startCase(_.toLower(method.name))}
            </Button>  
          </div>
        }
      }
      //the below code renders ALL ABI FUNCTIONS
      // if(this.state.actionNeeded){
      //   if(method.inputs.length > 0) {
      //     return <div>
      //       <TextField
      //         id="outlined-name"
      //         margin="normal"
      //         variant="outlined"
      //         key={key}
      //         value={this.state.inputs[key] ? this.state.inputs[key] : ""}
      //         onChange={e => this.handleInput(e, key)}
      //         />
      //         <br/>
      //       <Button 
      //       color={'primary'}
      //       variant="contained"
      //       disabled={this.state.action !== method.name} 
      //       value={method.name} 
      //       key={key} 
      //       onClick={() => this.accessContractFunction(method.name, key)}>
      //       {_.startCase(_.toLower(method.name))}
      //       </Button>  
      //       </div>;
      //   }
      //   //if no inputs:
      //   else {
      //     return <div>
      //       <Button 
      //       color={'primary'} 
      //       variant="contained"
      //       disabled={this.state.action !== method.name} 
      //       value={method.name} 
      //       key={key} 
      //       onClick={() => this.accessContractFunction(method.name, key)}>
      //       {_.startCase(_.toLower(method.name))}
      //       </Button>
      //       </div>;
      //     {/*to see it in action: {_.startCase(_.toLower(method.name))}*/}
      //   }
      // }
      else if (!this.state.actionNeeded){
      return null;
    }
    });
    return functions;
  }
  renderViewFunctions = () => {
    let functions;
    functions = this.state.viewFunctions.map( (method, key) => {
          return <div>
              <Button 
                color={'primary'}
                variant="contained"
                disabled={false} 
                value={method.name} 
                key={key} 
                onClick={() => this.accessContractViewFunction(method.name)}>
                {_.startCase(_.toLower(method.name))}
              </Button>
          </div>
    });
    this.setState({
      viewFunctions: functions,
      viewFunctionsSet: true
    })
    return functions;
  }

  render() {
    return (
      <div>
        <h2>Contract: {this.state.contractAddress}</h2>
        <h3>Actions: </h3>
        <hr/>
        {this.state.actionNeeded ? 
        <div>{this.state.actionFunctions ? 
        <div>

          {this.getContractFunctions(this.state.actionFunctions)}</div> 
          : null} </div> 
          : <p>You have no pending actions for this contract</p>}
        {/*this.state.viewFunctions ? <div>
          
           {this.getContractViews(this.state.viewFunctions)}</div> 
        : null*/}
        <h3>Views: </h3>
          <hr/>
        {this.state.viewFunctionsSet ? 
          this.state.viewFunctions : null}
      </div>
    );
  }
}

Contract.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Contract);
