import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DonutLarge from '@material-ui/icons/DonutLarge';
import ListAlt from '@material-ui/icons/ListAlt';
import Fingerprint from '@material-ui/icons/Fingerprint';
import SideBar from "./SideBar.js";
import {ContractContext} from "./Providers/ContractProvider";
import ListContracts from './ListContracts.js';
import Widget from './Widget.js';

const styles = theme => ({
  root: {
		width: "100%",
		flexGrow: 1
  }
});
class HomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loading: true
		};
	}
	componentDidMount = async () => {
		const contracts = await this.getContractTotal();
		this.setState({
			contractTotal: contracts.total,
			actionTotal: contracts.actions,
			loading: false
		});
	}
	getContractTotal = async () => {
    const contracts = await this.props.utilities.getContractsByAddress();
		let counter = 0;
		contracts.forEach(contract => contract.actionNeeded ? counter++ : 0);
		return {total: contracts.length, actions: counter};
	}
	render() {
		const {classes} = this.props;
  return (
	<SideBar>
		
      <Grid container className={classes.root} spacing={8}>
				
				<Grid item xs={4}>
					<Widget 
						loading={this.state.loading}
						title="Contracts"
						secondary={this.state.contractTotal === 1 ? `You have ${this.state.contractTotal} contract` : `You have ${this.state.contractTotal} contracts`}
						body="These are all the contracts you have interacted with"
						icon={<ListAlt color="primary" style={{ fontSize: 48 }}/>} 
						action="Go To All Contracts" 
						actionLink="/usercontracts/ "
						/>
				</Grid>
				<Grid item xs={4}>
						<Widget 
							loading={this.state.loading}
							title="Pending Contracts" 
							secondary={this.state.actionTotal === 1 ? `You have ${this.state.actionTotal} contract with pending actions` : `You have ${this.state.actionTotal} contracts with pending actions`}
							body="These are contracts that require you to take some action."
							icon={<DonutLarge color="secondary" style={{ fontSize: 48 }}/>} 
							action="Go To Pending Contracts" 
							actionLink="/PendingContractsList"
							/>
				</Grid>
				<Grid item xs={4}>
					<Widget 
						loading={this.state.loading}
						title="Create New Contract" 
						secondary="Get Started and Launch A New Contract"
						body=""
						icon={<Fingerprint color="secondary" style={{ fontSize: 48 }} />} 
						action="Create New Contract" 
						actionLink="/CreateNewContract"
						/>
				</Grid>
				<Grid item xs={12}>
					<ContractContext.Consumer>
						{utilities => <ListContracts utilities={utilities}/>}
					</ContractContext.Consumer>
				</Grid>
      </Grid>
		</SideBar>
  );
}}


HomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeScreen);
