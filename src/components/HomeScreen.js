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
import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from  '../styles/muiTheme.js';

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
			activeTotal: contracts.active,
			loading: false
		});
	}
	getContractTotal = async () => {
    const contracts = await this.props.utilities.getContractsByAddress();
		let counter = 0;
		let activeCounter = 0;
		contracts.forEach(contract => contract.actionNeeded ? counter++ : 0);
		contracts.forEach(contract => contract.active ? activeCounter++ : 0);
		return {total: contracts.length, actions: counter, active: activeCounter};
	}


	render() {
		const {classes} = this.props;
		const widgetSpan = 4;
  return (
	<SideBar>
<MuiThemeProvider theme={theme}>
      <Grid container className={classes.root} spacing={8}>
				<Grid item xs={12}>
					<Widget
						loading={this.state.loading}
						center
						title="Create New Contract"
						secondary="Get Started and Launch A New Contract"
						body=""
						icon={<Fingerprint style={{ fontSize: 48, color: '#EB643A' }} />}
						action="Create New Contract"
						actionLink="/CreateNewContract"
						/>
				</Grid>
				<Grid item xs={widgetSpan}>
					<Widget
						loading={this.state.loading}
						title="Contracts"
						secondary="These are all of your contracts"
						body={this.state.contractTotal === 1 ? `You have ${this.state.contractTotal} contract.` : `You have ${this.state.contractTotal} contracts.`}
						icon={<ListAlt style={{ fontSize: 48, color: '#EB643A' }}/>}
						action="All Contracts"
						actionLink="/usercontracts/ "
						/>
				</Grid>
				<Grid item xs={widgetSpan}>
						<Widget
							loading={this.state.loading}
							title="Pending"
							secondary="Contracts requiring action"
							body={this.state.actionTotal === 1 ? `You have ${this.state.actionTotal} contract with pending actions.` : `You have ${this.state.actionTotal} contracts with pending actions.`}
							icon={<DonutLarge  style={{ fontSize: 48, color: '#EB643A' }}/>}
							action="Pending Contracts"
							actionLink="/PendingContractsList"
							/>
				</Grid>
				<Grid item xs={widgetSpan}>
						<Widget
							loading={this.state.loading}
							title="Active"
							secondary="These contracts are active on your account"
							body={this.state.activeTotal === 1 ? `You have ${this.state.activeTotal} active contract` : `You have ${this.state.activeTotal} active contracts.`}
							icon={<DonutLarge  style={{ fontSize: 48, color: '#EB643A' }}/>}
							action="Active Contracts"
							actionLink="/useractivecontracts/ "
							/>
				</Grid>
				
				<Grid item xs={12}>
          <ContractContext.Consumer>
						{utilities => <ListContracts utilities={utilities}/>}
					</ContractContext.Consumer>
				</Grid>
      </Grid>
      </MuiThemeProvider>
		</SideBar>
  );
}}


HomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeScreen);
