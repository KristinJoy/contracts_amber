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
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";


import _ from 'lodash';
import web3 from "../utils/web3.js";

let price = require('crypto-price');


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
		"textOverflow": "ellipsis",
     color: "#EB643A",
	},
	header : {
		"textAlign": "center",
		"background": "rgba(255,255,255,.75)",
		"paddingBottom": 10
	},
	tableHead: {
		background: "#2B0018",
		color: "#fff"
	},
	white: {
		color: "#fff"
	}

});

let id = 0;
function createData(contractAddress, type, actionNeeded, action, value, active, createdOn, contractBetween) {
	// let dollarAmount = price.getCryptoPrice('USD', 'ETH').then(dollar => {
	// 	return value * dollar.price;
	// }).catch(err => {
	// 		console.log(err)
	// });
	value = 'Ξ' + value;
  id += 1;
  return { id, contractAddress, type, actionNeeded, action, value, active, createdOn, contractBetween};
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
		//createData(contractAddress, type, actionNeeded, action, depositedValue, status, createdOn)
		return contracts.map(contract => {
			return createData(contract.contractAddress, contract.contractType, contract.actionNeeded, contract.action, contract.value, contract.active, contract.createdOn, contract.contractBetween);
		});
	}

	render() {
		const { classes } = this.props;
  return (
		this.state.loading ? <Loading message="loading your information..."/> :

		this.state.rows.length === 0 ? <p>You have no contracts - <Link to={`/CreateNewContract`}>Create One!</Link></p> :
       <div>
       <Typography className={classes.header} variant="h4">Your Contracts</Typography>
        <Card raised={true}>
					<Table padding='dense' className={classes.table}>
						<TableHead className={classes.tableHead}>
							<TableRow>
								<TableCell className={classes.white} >Contract ID</TableCell>
								<TableCell className={classes.white} >Contract Type</TableCell>
                <TableCell style={{textAlign: "center"}} className={classes.white} >Action Needed?</TableCell>
								<TableCell className={classes.white} >Next Action</TableCell>
								<TableCell className={classes.white} >All Parties</TableCell>
								<TableCell className={classes.white} >Value</TableCell>
								<TableCell className={classes.white} >Status</TableCell>
								<TableCell className={classes.white} >Date Created</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.rows.map(row => (
								<TableRow key={row.id}>
								{/*contractAddress, type, actionNeeded, action, depositedValue, status, createdOn*/}
									<TableCell className={classes.truncate} ><Link to={`/contracts/${row.contractAddress}`}>{row.contractAddress}</Link></TableCell>
									<TableCell>{fixCase(row.type)}</TableCell>
									<TableCell style={{textAlign: "center"}}>{row.actionNeeded ? <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/200px-Yes_Check_Circle.svg.png" width="20"/> : <img src="http://www.clker.com/cliparts/D/0/R/b/X/W/red-cross-hi.png" width="20"/>}</TableCell>
                  <TableCell>{fixCase(row.action)}</TableCell>
									<TableCell className={classes.truncate} >{row.contractBetween ? row.contractBetween.map(address => <span><Link to={`/usercontracts/${address}`}>{address}</Link><br/></span>) : "Can't find that data"}</TableCell>
									<TableCell>{row.value}</TableCell>
									<TableCell style={row.active ? {backgroundColor: "#5cb85c"} : row.action === 'cancelled' ? {backgroundColor: "#d9534f"} : {backgroundColor: "#428bca"} }className={classes.white} >{row.active ? "Active" : "Inactive"}</TableCell>
									<TableCell>{formatDate(row.createdOn)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Card>
        </div>
  );
}}
let fixCase = (action) => {
  return _.startCase(_.toLower(action));
}

ListContracts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListContracts);
