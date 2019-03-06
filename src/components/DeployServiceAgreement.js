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
import CircularProgress from '@material-ui/core/CircularProgress';

console.log("Web 3 accessed in contract component mount, version:", web3.version);
let factory;
const address = "0x2134d55F7E7708F3EF434FD0Bb756459b608B76D";
const abi = [
  {
    constant: false,
    inputs: [
      {
        name: "_depositor",
        type: "address"
      }
    ],
    name: "creator",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "_newEscrow",
        type: "address"
      }
    ],
    name: "NewContract",
    type: "event"
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
      loading: false
    };
  }

  componentWillMount = async () => {
    console.log("props at contract comp mount: ", this.props.contract);
    factory = await new web3.eth.Contract(abi, address);
    console.log("factory contract created, ", factory);
	}

  accessContractFunction = async () => {
    this.setState({
      loading: true
    });
    //contract instance, function name, recipient this.state.toAddress
    let componentResults = await this.props.contract.accessContractFunction(factory, "creator", this.state.toAddress);
    this.setState({
      loading: false
    });
    console.log("results", componentResults); //make await
  }

  handleInput = (e) => {
    this.setState({
      toAddress: e.target.value
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/*<ReactJson src={this.props.contractInfo.abi} />*/}
      <div className={classes.root}>
        <TextField
            id="outlined-name"
            margin="normal"
            variant="outlined"
            value={this.state.toAddress}
            onChange={e => this.handleInput(e)}
            />
            <br/>
        <Button
          variant="contained"
          color="primary"
          onClick={this.accessContractFunction}
          className={classes.button}
        >
          Deploy Contract (Testing)
        </Button>
      </div>
      {this.state.loading ?  <CircularProgress className={classes.progress} /> : <p>Example address (2): 0x59001902537Fa775f2846560802479EccD7B93Af</p>}
      </div>
    );
  }
}

ServiceAgreement.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ServiceAgreement);
