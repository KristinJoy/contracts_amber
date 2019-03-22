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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CardActions from '@material-ui/core/CardActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ContractInactive from './ContractInactive.js';


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
    this.state = {
      steps: []
    };
  }
  componentDidMount = async () => {
    const {match: {params}} = this.props;
    const contractRoute = process.env.REACT_APP_BACK_END_SERVER + 'contract';
    let actionFrom = await this.props.utilities.getFirstAccount();
    await axios.put(contractRoute, {
      actionFrom: actionFrom,
      contractAddress: params.contractAddress
    }).then(
      (res) => {
        this.setState({
          contract: res.data,
          abi: res.data.abi,
          actionNeeded: res.data.actionNeeded,
          action: res.data.action,
          contractActionTo: res.data.actionTo,
          contractActionFrom: res.data.actionFrom,
          contractAddress: res.data.contractAddress,
          contractValue: res.data.value,
          steps: res.data.steps,
          active: res.data.active,
          activeStep: res.data.steps.indexOf(res.data.action)
        });
      });
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
  renderViewFunctions = (functions) => {
    return functions.map( (method, key) => {
        return <View
          key={key} 
          method={method.name}
          utilities={this.props.utilities}
            />
    });
  }
  renderFunction = (step) => {
    return this.state.actionFunctions.map( (method, key) => {
      if(this.state.actionFunctions[key].name === this.state.steps[step]){
          return <Action
            disabled={!(this.state.actionNeeded && (method.name === this.state.action))}
            input={method.inputs.length}
            method={method.name}
            key={key}
            utilities={this.props.utilities}
            action={this.state.action}
            value={this.state.contractValue}
            contractAddress={this.state.contractAddress}
          />
        }
      else {return null;}
    });
  }
  getSteps = () => {
    return this.state.steps;
  }
  
  getStepContent = (step) => {
    return this.renderFunction(step);
  }
  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };
  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    return (
      <SideBar>
        {this.state.active ? 
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Contract: {this.state.contractAddress ? this.state.contractAddress : null}
          </Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Contract's Actions:
              </Typography>
              {this.state.actionNeeded ? null : <Typography variant="body" gutterBottom>
                You have no pending actions for this contract.
              </Typography>}
              {this.state.actionFunctions && this.state.steps ? 
                <div className={classes.root}>
                  <Stepper activeStep={activeStep}>
                    {this.state.steps.map((label, index) => {
                      const props = {};
                      return (
                        <Step key={label} {...props}>
                          <StepLabel >{fixCase(label)}</StepLabel>
                          {this.state.action === label ? this.state.actionNeeded ? 
                          <Typography variant="h6" gutterBottom>Your attention is required</Typography> : <Typography variant="h6" gutterBottom>Waiting on other parties</Typography> : null}
                        </Step>
                      );
                    })}
                  </Stepper>
                  <div>
                      <div>
                        {this.getStepContent(activeStep)}<br/>
                       
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          {activeStep === this.state.steps.length-1 ? null : 
                          <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                          >
                          Next
                        </Button>}
                        </div>
                      </div>
                  </div>
                  <CardActions>
                        <Action
                          method="cancel"
                          buttonText="Cancel and Withdraw From Contract"
                          confirm
                          key="69"
                          utilities={this.props.utilities}
                          contractAddress={this.state.contractAddress}
                        />
                  </CardActions>
                </div> : null}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Get Information About Your Contract:
              </Typography>
              <Grid container className={classes.root} spacing={8}>
                {this.state.viewFunctions ? this.renderViewFunctions(this.state.viewFunctions).map(view => <Grid item xs={4}>{view}</Grid>) : null}
              </Grid>
            </CardContent>
          </Card>
          
        </div> : <ContractInactive contract={this.state.contract}/>}
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
  //remember this is only rendered if there is action needed, now find it:
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(null);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(props.disabled);
  const [open, setOpen] = useState(false);
  const accessFunction = async () => {
    setDisabled(true);
    setLoading(true);
    let result = await props.utilities.accessContractFunction(contractInstance, props.method, props.value);
    let contractResult = result.events.next_action.returnValues;
    const contractRoute = process.env.REACT_APP_BACK_END_SERVER + 'contract';
    let actionFrom = await props.utilities.getFirstAccount();
    const active = props.method === "cancel" ? false : true;
    const action = props.method === "cancel" ? "cancelled" : contractResult.action;
    const data = await {
      contractAddress: props.contractAddress,
      actionFrom: actionFrom, 
      actionTo: contractResult.action_to,
      action: action,
      active: active
    }
    axios.put(contractRoute, data).then(
      (res) => {
        console.log("contractRoute access complete, ", res);
        setSuccess(true);
      });
  }
  const confirm = () => {
    setOpen(false);
    accessFunction();
  }
  const handleClickOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
   setOpen(false)
  };
  if(success){
    return(
      <p>Congrats! Your Blockchain Transaction Has Processed :)</p>
    );
  }
  else {
    //if(props.method === 'cancel') {setDisabled(false);}
    return (
      loading ? <Loading message="Processing your blockchain transaction..."/> 
      : 
      <div>
        {/*----------------this dialog is only seen if confirm is in the <Action/> props-------------------*/}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure you want to {props.buttonText}?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You cannot undo this action.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No Get Me Out of Here!
            </Button>
            <Button onClick={confirm} color="primary" autoFocus>
              Yes, {props.buttonText}
            </Button>
          </DialogActions>
        </Dialog>
        {/*----------------this dialog is only seen if confirm is in the <Action/> props-------------------*/}
        {props.input ? 
          <TextField
            id="outlined-name"
            margin="normal"
            variant="outlined"
            key={props.key}
            value={input}
            onChange={setInput(input)}/> 
            : null}
        <Button 
          color={'primary'}
          variant="contained"
          disabled={disabled} 
          value={props.method} 
          key={props.key} 
          onClick={props.confirm ? () => {handleClickOpen()} : () => {accessFunction()}}
          >
          {props.buttonText ? props.buttonText : fixCase(props.method)}
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


      //This lists all steps in a grid as a button:
      // renderFunctions = (functions) => {
      //   return functions.map( (method, key) => {
      //     if(this.state.actionNeeded && method.name === this.state.action){
      //         return <Action
      //           input={method.inputs.length}
      //           method={method.name}
      //           key={key}
      //           utilities={this.props.utilities}
      //           action={this.state.action}
      //           value={this.state.contractValue}
      //           contractAddress={this.state.contractAddress}
      //         />
      //       }
      //     else if(method.name === 'cancel'){return null;}
      //     else {return <Typography variant="body1" gutterBottom>{fixCase(method.name)} does not need your attention right now</Typography>;}
      //   });
      // }
      // <Grid container className={classes.root} spacing={8}>
      //           {this.state.actionFunctions && this.state.steps ? this.renderFunctions(this.state.actionFunctions).map(action => <Grid item xs={this.state.steps.length}>{action}</Grid>) : "No action functions or steps"}
      //           </Grid>

export default withStyles(styles)(Contract);
