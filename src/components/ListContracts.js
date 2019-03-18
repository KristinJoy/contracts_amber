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
import _ from 'lodash';


const styles = theme => ({


  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
	backGround: {
		height: '100vh',
	},
	introFix: {
		'margin-bottom': '3em',
	},
	sectionTop:{
		'margin-top': 'auto',
		padding: '2em',

	},
	sectionBottom: {
		'background-color': '#f5b34d',
		padding: '1em',
	},
	img: {
		height: '88%',
		width: 'auto',
	},
	bottomTitle: {
		'padding-bottom': '1em',
	},
	stepItemSpacing: {
		padding: '1em',
	},
	card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
	table: {
	 minWidth: 700,
 },



});
let id = 0;
function createData(contractAddress, type, actionNeeded, action, depositedValue, status, createdOn) {
  id += 1;
  return { id, contractAddress, type, actionNeeded, action, depositedValue, status, createdOn};
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
	getContracts = async () => {
    let contracts;
    if(this.props.address){
      contracts = await this.props.utilities.getContractsByAddress(this.props.address);
    }
    else {
      contracts = await this.props.utilities.getContractsByAddress();
    }
		//createData(contractAddress, type, actionNeeded, action, depositedValue, status, createdOn)
		return contracts.map(contract => {
			return createData(contract.contractAddress, contract.contractType, contract.actionNeeded, contract.action, contract.depositedValue, contract.status, contract.createdOn);
		});
	}

	render() {
		const { classes } = this.props;
  return (
    <div className={classes.root}>
				{this.state.loading ? <Loading message="loading your information..."/> :
					
					this.state.rows.length === 0 ? <p>You have no contracts - <Link to={`/CreateNewContract`}>Create One!</Link></p> :

					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Contract ID</TableCell>
								<TableCell align="right">Contract Type</TableCell>
                <TableCell align="right">Action Needed?</TableCell>
								<TableCell align="right">Next Action</TableCell>
								<TableCell align="right">Value</TableCell>
								<TableCell align="right">Status</TableCell>
								<TableCell align="right">Date Created</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.rows.map(row => (
								<TableRow key={row.id}>
								{/*contractAddress, type, actionNeeded, action, depositedValue, status, createdOn*/}
									<TableCell component="th" scope="row"><Link to={`/contracts/${row.contractAddress}`}>{row.contractAddress}</Link></TableCell>
									<TableCell align="right">{_.startCase(_.toLower(row.type))}</TableCell>
									<TableCell align="right">{row.actionNeeded ? "Yes" : "No"}</TableCell>
                  <TableCell align="right">{_.startCase(_.toLower(row.action))}</TableCell>
									<TableCell align="right">{row.depositedValue}</TableCell>
									<TableCell align="right">{_.startCase(_.toLower(row.status))}</TableCell>
									<TableCell align="right">{formatDate(row.createdOn)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>}
    </div>
  );
}}


ListContracts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListContracts);
