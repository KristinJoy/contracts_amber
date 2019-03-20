import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import web3 from "../utils/web3.js";
import axios from 'axios';
import _ from 'lodash';
import Loading from './Loading.js';
import Card from '@material-ui/core/Card';
import SideBar from "./SideBar.js";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


let contractInstance;


const styles = theme => ({
  root: {
    width: '100%',
		flexGrow: 1
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
    //need to define state in constructor so not null on render
    this.state = {};
  }
  componentWillMount = async () => {
    
  }
  componentDidMount = async () => {
    const {match: {params}} = this.props;
    console.log("match props at contract comp mount: ", params);
    const contractRoute = 'http://localhost:3001/contract';
    let actionFrom = await this.props.utilities.getFirstAccount();
    await axios.put(contractRoute, {
      actionFrom: actionFrom,
      contractAddress: params.contractAddress
    }).then(
      (res) => {
        console.log("contractRoute access complete", res);
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
    console.log("state set: ", this.state);
    if(this.state.abi){
      contractInstance = await new web3.eth.Contract(this.state.abi, this.state.contractAddress);
      console.log("contract instance created: ", contractInstance);
      this.filterAbi();
    }
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
  renderFunctions = (functions) => {
    return functions.map( (method, key) => {
      if(method.stateMutability === 'view'){
        return <View
          key={key} 
          method={method.name}
          utilities={this.props.utilities}
            />
      }
      else {
        if(this.state.actionNeeded && (method.name === this.state.action)){
          return <Action
            input={method.inputs.length}
            method={method.name}
            key={key}
            utilities={this.props.utilities}
            action={this.state.action}
            value={this.state.contractValue}
            contractAddress={this.state.contractAddress}
          />
        }
        else {return <Typography variant="body1" gutterBottom>{_.startCase(_.toLower(method.name))} does not need your attention right now</Typography>;}
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <SideBar>
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Contract: {this.state.contractAddress ? this.state.contractAddress : null}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Actions:
          </Typography>
          <Card>
            <CardContent>
              {this.state.actionFunctions ? this.renderFunctions(this.state.actionFunctions).map(action => action) : null}
            </CardContent>
          </Card>
          <Typography variant="h6" gutterBottom>
            Views:
          </Typography>
          <Card>
            <CardContent>
            <Grid container className={classes.root} spacing={8}>
              {this.state.viewFunctions ? this.renderFunctions(this.state.viewFunctions).map(view => <Grid item xs={4}>{view}</Grid>) : null}
            </Grid>
            </CardContent>
          </Card>
        </div>
      </SideBar>
    );
  }
}

let View = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);
  let getResult = async () => {
    setDisabled(true);
    setLoading(true);
    let result = await props.utilities.accessContractViewFunction(contractInstance, props.method);
    setResult(result);
    setLoading(false);
    console.log("loading value at end of view request: ", loading);
  }
  /*---------------------------------LOOOOOOK OUT FOR THE HACK BELOW: SLICES THE FIRST 4 LETTERS OFF THE VIEW NAME ASSUMING IT'S 'GET' OR 'SEE'-----------------------*/
  return (
    result ? <Typography variant="body1" gutterBottom>{fixCase(props.method).slice(4)}: {result}</Typography> : loading ?  <Loading message="Getting your information..."/> : 
    <Button 
        color={'primary'}
        variant="contained"
        disabled={disabled}
        value={props.method} 
        key={props.key} 
        onClick={() => {
          getResult()}}
          >
        {_.startCase(_.toLower(props.method))}
      </Button>
  );
}

let Action = (props) => {
  console.log("action function props: ", props);
  //remember this is only rendered if there is action needed, now find it:
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(null);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  let accessFunction = async () => {
    setDisabled(true);
    setLoading(true);
    let result = await props.utilities.accessContractFunction(contractInstance, props.method, props.value);
    console.log("contract function accessed in component, results: ", result);
    //send to DB:
    const contractRoute = process.env.REACT_APP_BACK_END_SERVER + 'contract';
    let actionFrom = await props.utilities.getFirstAccount();
    const data = await {
      contractAddress: props.contractAddress,
      actionFrom: actionFrom, 
      actionTo: result.events.NextAction.returnValues.actionTo,
      action: result.events.NextAction.returnValues.action
    }
    axios.put(contractRoute, data).then(
      (res) => {
        console.log("contractRoute access complete, ", res);
        setSuccess(true);
      });
  }
  if(success){
    return(
      <p>Congrats! Your Blockchain Transaction Has Processed :)</p>
    );
  }
  else {
    return (
      loading ? <Loading message="Processing your blockchain transaction..."/> 
      : 
      <div>
        {props.input ? <TextField
              id="outlined-name"
              margin="normal"
              variant="outlined"
              key={props.key}
              value={input}
              onChange={setInput(input)}/> : null}
        <Button 
                  color={'primary'}
                  variant="contained"
                  disabled={disabled} 
                  value={props.method} 
                  key={props.key} 
                  onClick={() => {
                    accessFunction()}}
                    >
                  {fixCase(props.method)}
                </Button>
      </div>
    );
  }
}
let fixCase = (action) => {
  return _.startCase(_.toLower(action));
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
