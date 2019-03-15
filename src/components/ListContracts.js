import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {ContractContext} from "./Providers/ContractProvider";
import Contract from './Contract.js';


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
    console.log("props at contract comp mount: ", this.props.utilities);
    //get user this.props.utilitiesInfo.getFirstAccount();
    //add user contract array to state
    await this.setState({
      publicAddress: await this.props.utilities.getFirstAccount()
    });
    console.log("public address is list contract component: ", this.state.publicAddress);
    const getUser = process.env.REACT_APP_BACK_END_SERVER + 'getUser';
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
        return <ContractContext.Consumer>
        {utilities => <Contract contractAddress={contract.contractAddress} utilities={utilities}/>}
          </ContractContext.Consumer>
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
