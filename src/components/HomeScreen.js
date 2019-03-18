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

class HomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value: 0,
			rows: [],
			loading: true
		};
	}

	render() {
  return (
	<SideBar>
      <Grid container spacing={24}>
				<Grid item xs={4}>
					<Widget 
						title="Contracts" 
						secondary="You have xxxx contracts"
						body="These are all the contracts you have interacted with"
						icon={<ListAlt color="primary" style={{ fontSize: 48 }}/>} 
						action="Go To All Contracts" 
						actionLink="/AllContractsList"
						/>
				</Grid>
				<Grid item xs={4}>
						<Widget 
							title="Pending Contracts" 
							secondary="You have xxxx pending contracts"
							body="These are contracts that require you to take some action."
							icon={<DonutLarge color="secondary" style={{ fontSize: 48 }}/>} 
							action="Go To Pending Contracts" 
							actionLink="/PendingContractsList"
							/>
				</Grid>
				<Grid item xs={4}>
					<Widget 
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

export default (HomeScreen);
