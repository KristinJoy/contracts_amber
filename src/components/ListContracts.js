import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Loading from './Loading.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import _ from 'lodash';


const styles = theme => ({
  root: {
    width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflow: 'auto'
  },
  table: {
		width: '100%'
	},
	truncate: {
		"maxWidth": "11vw",
		"whiteSpace": "nowrap",
		"overflow": "hidden",
		"textOverflow": "ellipsis"
	}
});

let id = 0;
function createData(contractAddress, type, actionNeeded, action, depositedValue, status, createdOn, contractBetween) {
  id += 1;
  return { id, contractAddress, type, actionNeeded, action, depositedValue, status, createdOn, contractBetween};
}
function formatDate(date) {
	return date.slice(0,10);
}


class ListContracts extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			rows: [],
			loading: true
		};
	}
	componentDidMount = async () => {
		
		const rows = await this.getContracts();
		this.setState({
			rows: rows,
			loading: false
		});
	}
	componentWillReceiveProps = async () => {
		this.setState({
			loading: true
		});
		const rows = await this.getContracts();
		this.setState({
			rows: rows,
			loading: false
		});
	}
	getContracts = async () => {
		const params = this.props.match ? this.props.match.params.publicAddress : null;
		let contracts;
    if(params && params !== ' '){
      contracts = await this.props.utilities.getContractsByAddress(params);
    }
    else {
      contracts = await this.props.utilities.getContractsByAddress();
		}
		console.log("contracts fetched in list contracts, ", contracts);
		//createData(contractAddress, type, actionNeeded, action, depositedValue, status, createdOn)
		return contracts.map(contract => {
			return createData(contract.contractAddress, contract.contractType, contract.actionNeeded, contract.action, contract.depositedValue, contract.status, contract.createdOn, contract.contractBetween);
		});
	}

	render() {
		const { classes } = this.props;
  return (
		this.state.loading ? <Loading message="loading your information..."/> :
					
		this.state.rows.length === 0 ? <p>You have no contracts - <Link to={`/CreateNewContract`}>Create One!</Link></p> :
				<Paper className={classes.root}>
					<Table padding='dense' className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell >Contract ID</TableCell>
								<TableCell >Contract Type</TableCell>
                <TableCell >Action Needed?</TableCell>
								<TableCell >Next Action</TableCell>
								<TableCell >All Parties</TableCell>
								<TableCell >Value</TableCell>
								<TableCell >Status</TableCell>
								<TableCell >Date Created</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.rows.map(row => (
								<TableRow key={row.id}>
								{/*contractAddress, type, actionNeeded, action, depositedValue, status, createdOn*/}
									<TableCell className={classes.truncate} ><Link to={`/contracts/${row.contractAddress}`}>{row.contractAddress}</Link></TableCell>
									<TableCell >{_.startCase(_.toLower(row.type))}</TableCell>
									<TableCell >{row.actionNeeded ? "Yes" : "No"}</TableCell>
                  <TableCell >{_.startCase(_.toLower(row.action))}</TableCell>
									<TableCell className={classes.truncate} >{row.contractBetween ? row.contractBetween.map(address => <span><Link to={`/usercontracts/${address}`}>{address}</Link><br/></span>) : "Can't find that data"}</TableCell>
									<TableCell >{row.depositedValue}</TableCell>
									<TableCell >{_.startCase(_.toLower(row.status))}</TableCell>
									<TableCell >{formatDate(row.createdOn)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
  );
}}


ListContracts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListContracts);
