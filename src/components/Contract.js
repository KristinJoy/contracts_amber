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

  componentWillMount() {
    console.log("Contract component props at mount: ", this.props.contractInfo);
		const contractAbi = this.props.contractInfo.abi;
		const contractAddress = this.props.contractInfo.address;
		factory = new web3.eth.Contract(contractAbi, contractAddress);
		console.log("contract abstract at mount", factory);
		// contact = new web3.eth.Contract() //.address, .abi
	}

	// handleContract = async () => {
	// 	let accounts = await web3.eth.getAccounts();
	// 	let txresult = await factory.methods.creator({/*address of account send to*/}).send({
	// 		from: accounts[0]
	// 	}); 
	// };

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
    console.log("handling input!!!", e);
    console.log("index of input: ", index);
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        <ReactJson src={this.props.contractInfo.abi} />
      <form className={classes.container} noValidate autoComplete="off">
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{this.getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                  <TextField
                      id="outlined-name"
                      margin="normal"
                      variant="outlined"
                      onChange={this.handleInput()}
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
