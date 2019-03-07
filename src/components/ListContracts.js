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
import axios from 'axios';


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




class ListContracts extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toAddress: '',
      loading: false,
      deployedContractAddress: '',
      contractAddress: ''
    };
  }

  componentWillMount = async () => {
    console.log("props at contract comp mount: ", this.props.contract);
    //get user this.props.contractInfo.getFirstAccount();
    //add user contract array to state
    await this.setState({
      publicAddress: await this.props.contract.getFirstAccount()
    });
    console.log("public address is list contract component: ", this.state.publicAddress);
    const getUser = 'http://localhost:3001/getUser';
    axios.put(getUser, {publicAddress: this.state.publicAddress}).then(
      (res) => {
        console.log("result from getuser: ", res.data);
        if(!res.data.contracts){
          console.log("no contracts found");
          this.setState({success: false});
        }
        else {
          this.setState({
            contracts: res.data.contracts
          });
          console.log("contracts loaded on mount: ", this.state.contracts);
        }
      });
	}

  render() {
    const { classes } = this.props;
    let contracts;
    if(this.state.contracts){
       contracts = this.state.contracts.map(function(contract){
        return <div>
          <h3>{contract.contractAddress}</h3>
          {contract.actionNeeded ? <p>You have pending actions for this contract</p> : null}
          {contract.actionNeeded ? <p>Action: {contract.action}</p> : null}
        </div>
      });
    }
    else { contracts = 'No Contracts Found';}
    return (
      <div>
        {contracts}
      </div>
    );
  }
}

ListContracts.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ListContracts);
