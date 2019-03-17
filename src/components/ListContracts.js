import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {ContractContext} from "./Providers/ContractProvider";
import Contract from './Contract.js';
import {Link} from 'react-router-dom';


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
        }
      });
	}

  render() {
    const { classes } = this.props;
    let contracts;
    const publicAddress = this.state.publicAddress;
    if(this.state.contracts){
       contracts = this.state.contracts.map(function(contract){
        console.log("contract address: " + contract.contractAddress + " user public address: " + publicAddress + " contract actionto: " + contract.actionTo);
         if(contract.actionTo === publicAddress){
           
           return<div><Link to={`/contracts/${contract.contractAddress}`}>{contract.contractAddress}</Link><br/><p>Action is Required on the Above Contract</p></div>;     
         }
         else{
          return <div><Link to={`/contracts/${contract.contractAddress}`}>{contract.contractAddress}</Link><br/></div>;
         }
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
// return <ContractContext.Consumer>
//         {utilities => <Contract contractAddress={contract.contractAddress} utilities={utilities}/>}
//           </ContractContext.Consumer>