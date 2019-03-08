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
console.log("Web 3 accessed in contract component mount, version:", web3.version);
let factory;
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




class ServiceAgreement extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeStep: 0,
      input: []
    };
  }

  componentWillMount = async () => {
    console.log("props at contract comp mount: ", this.props.contract);
    factory = await new web3.eth.Contract(abi, address);
	}

  accessContractFunction = async () => {
    let componentResults = this.props.contract.accessContractFunction(factory, "creator", "0xEF4a23Eae7F2320082E5bc3b22995e9752e257BC");
    console.log("results", componentResults); //make await
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
   getSteps = () => {
    let contractFunctions = abi.filter(method => {
      if (method.type === "function"){
      //  console.log("returning method: ", method);
        return method;
      }
      // if (method.stateMutability === "payable"){
      //   console.log("returning method: ", method);
      //   return method;
      // }
      //return null;
    });
    return contractFunctions.map(method => {
      return method.name;
    });

    return ['Who Are You Entering This Contract With', 'What Service Are You Providing', 'Cost of Service'];
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return `Please enter the public key of the person you are entering into this contract with.`;
      case 1:
        return 'Please enter the service you will be providing.';
      case 2:
        return `Enter the amount of ether have agreed that the contract will hold.`;
      default:
        return 'Unknown step';
    }
  }
  handleInput = (e, index) => {
    let input = this.state.input;
    input[index] = e.target.value;
    this.setState({
      input: input
    });
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        {/*<ReactJson src={this.props.contractInfo.abi} />*/}
      <form className={classes.container} noValidate autoComplete="off">
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {/*<Typography>{this.getStepContent(index)}</Typography>*/}
                <div className={classes.actionsContainer}>
                  <div>
                  <TextField
                      id="outlined-name"
                      margin="normal"
                      variant="outlined"
                      value={this.state.input[index]}
                      onChange={e => this.handleInput(e, index)}
                      />
                      <br />
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={this.accessContractFunction}
          className={classes.button}
        >
          Deploy Contract (Testing)
        </Button>
      </div>
      </form>
      </div>
    );
  }
}

ServiceAgreement.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ServiceAgreement);
