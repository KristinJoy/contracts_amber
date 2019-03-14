import React, { useState } from 'react';
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
        console.log("contractRoute access complete");
        this.setState({
          abi: res.data.abi,
          actionNeeded: res.data.actionNeeded,
          action: res.data.action,
          contractActionTo: res.data.actionTo,
          contractActionFrom: res.data.actionFrom,
          contractAddress: res.data.contractAddress,
          contractValue: res.data.depositedValue
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
      contractEvents: contractEvents
    });
  }
  accessContractFunction = async (method, key) => {
    let result = await this.props.contract.accessContractFunction(contractInstance, method, this.state.depositedValue);
    console.log("contract function accessed in component, results: ", result);
    //add result to database
    const contractRoute = process.env.REACT_APP_BACK_END_SERVER + 'contract';
    let actionFrom = await this.props.contract.getFirstAccount();
    const data = await {
      contractAddress: this.state.contractAddress,
      actionFrom: actionFrom, 
      actionTo: result.events.NextAction.returnValues.actionTo,
      action: result.events.NextAction.returnValues.action
    }
    axios.put(contractRoute, data).then(
      (res) => {
        console.log("contractRoute access complete, ", res);
      });
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

      else if (!this.state.actionNeeded){
        return null;
      }

    });
    return functions;
  }
  renderFunctions = (functions) => {
    console.log("about to render functions: ", functions);
    return functions.map( (method, key) => {
      if(method.stateMutability === 'view'){
        return <View
          key={key} 
          method={method.name}
          utils={this.props.contract}
            />
      }
      else {
        if(this.state.actionNeeded && (method.name === this.state.action)){
          return <Action
            input={method.inputs.length}
            method={method.name}
            key={key}
            utils={this.props.contract}
            action={this.state.action}
            value={this.state.contractValue}
          />
        }
        else {return null;}
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Contract: {this.state.contractAddress}</h2>
        <h3>Actions: </h3>
        <hr/>
        {this.state.actionFunctions ? this.renderFunctions(this.state.actionFunctions).map(view => view) : null}
        {this.state.actionNeeded ? 
        <div>{this.state.actionFunctions ? 
        <div>
          {this.getContractFunctions(this.state.actionFunctions)}</div> 
          : null} </div> 
          : <p>You have no pending actions for this contract</p>}
        <h3>Views: </h3>
          <hr/>
        {this.state.viewFunctions ? this.renderFunctions(this.state.viewFunctions).map(view => view) : null}

      </div>
    );
  }
}
let View = (props) => {
  //user state - it is remembered on mount, and can be changed as we need:
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  let getResult = async () => {
    setLoading(true);
    let result = await props.utils.accessContractViewFunction(contractInstance, props.method);
    setResult(result);
    setLoading(false);
    console.log("loading value at end of view request: ", loading);
  }
  return (
    <div>
      <Button 
                color={'primary'}
                variant="contained"
                disabled={false} 
                value={props.method} 
                key={props.key} 
                onClick={() => {
                  getResult()}}
                  >
                {_.startCase(_.toLower(props.method))}
              </Button>
              {loading ? <img alt="loading" width={25} src="https://media.giphy.com/media/MVgBbtMBGQTi6og4mF/giphy.gif"/> : result}
    </div>
  );
}
let Action = (props) => {
  console.log("action function props: ", props);
  //remember this is only rendered if there is action needed, now find it:
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(null);
  let accessFunction = async () => {
    setLoading(true);
    let result = await props.utils.accessContractFunction(contractInstance, props.method, props.value);
    console.log("contract function accessed in component, results: ", result);
  }
  if(props.input){
    return (
      <div>
        <TextField
              id="outlined-name"
              margin="normal"
              variant="outlined"
              key={props.key}
              value={input}
              onChange={setInput(input)}/>
        <Button 
                  color={'primary'}
                  variant="contained"
                  disabled={false} 
                  value={props.method} 
                  key={props.key} 
                  onClick={() => {
                    accessFunction()}}
                    >
                  {_.startCase(_.toLower(props.method))}
                </Button>
                {loading ? <img alt="loading" width={25} src="https://media.giphy.com/media/MVgBbtMBGQTi6og4mF/giphy.gif"/> : null}
      </div>
    );
  }
  else {
    return (
      <Button 
        color={'primary'}
        variant="contained"
        disabled={false} 
        value={props.method} 
        key={props.key} 
        onClick={() => {
          accessFunction()}}
          >

      {_.startCase(_.toLower(props.method))}

      </Button>
    );
  }
}


Contract.propTypes = {
  classes: PropTypes.object,
};

//the below code renders ALL ABI FUNCTIONS WHEN PLACED IN THE GETCONTRACTFUNCTIONS() FUNCTION
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

export default withStyles(styles)(Contract);
