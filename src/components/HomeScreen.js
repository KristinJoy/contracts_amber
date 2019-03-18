import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DonutLarge from '@material-ui/icons/DonutLarge';
import ListAlt from '@material-ui/icons/ListAlt';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Fingerprint from '@material-ui/icons/Fingerprint';
import SideBar from "./SideBar.js";
import {ContractContext} from "./Providers/ContractProvider";
import Loading from './Loading.js';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import amber from './amberLogo.png';



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
	console.log(date);
	return date.slice(0,10);
}


class HomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value: 0,
			rows: []
		};
	}
	
	handleChange = (event, value) => {
    this.setState({ value });
	};
	componentWillMount = async () => {
		console.log("props at component will mount: ", this.props.utilities);
		
	}
	componentDidMount = async () => {
		console.log("about to get contracts did mount");
		const rows = await this.getContracts();
		this.setState({
			rows: rows
		});
	}
	getContracts = async () => {
		const contracts = await this.props.utilities.getContractsByAddress();
		console.log("contracts loaded: ", contracts);
		this.setState({
			contracts: contracts
		});
		console.log("state set: ", this.state.contracts);
		//createData(contractAddress, type, actionNeeded, action, depositedValue, status, createdOn)
		let rows = contracts.map(contract => {
			console.log("contract in question:", contract);
			return createData(contract.contractAddress, contract.contractType, contract.actionNeeded, contract.action, contract.depositedValue, contract.status, contract.createdOn);
		});
		console.log("rows created", rows);
		return rows;
	}

	render() {
		const { classes } = this.props;
		const { value } = this.state;
  return (

	<SideBar>

    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={3}>
					<Card className={classes.card}>
					      <CardContent>
								<DonutLarge color="secondary" style={{ fontSize: 48 }}/>
					        <Typography className={classes.title} color="textSecondary" gutterBottom>
					          You Have (auto populate number)
					        </Typography>
					        <Typography variant="h5" component="h2">
					          Pending Contracts
					        </Typography>
					        <Typography component="p">
					          These are contracts that
					          <br />
					          require you to take some action.
					        </Typography>
					      </CardContent>
					      <CardActions>
					        <Button size="small" component={Link} to='/PendingContractsList'>Go To Contracts</Button>
					      </CardActions>
					    </Card>
        </Grid>
				<Grid item xs={3}>

					<Card className={classes.card}>
					      <CardContent>
								<ListAlt color="primary" style={{ fontSize: 48 }}/>
					        <Typography className={classes.title} color="textSecondary" gutterBottom>
					          You Have
					        </Typography>
					        <Typography variant="h5" component="h2">
					          (auto number) Contracts
					        </Typography>
					        <Typography className={classes.pos} color="textSecondary">
					          that you have interacted with
					        </Typography>
					        <Typography component="p">
					          The total value of these contracts is
					          <br />
					          (Auto populate number)
					        </Typography>
					      </CardContent>
					      <CardActions>
					        <Button size="small" component={Link} to='/AllContractsList'>Got to All Contracts</Button>
					      </CardActions>
					    </Card>
        </Grid>
				<Grid item xs={3}>
					<Card className={classes.card}>
					      <CardContent>
					        <Fingerprint color="secondary" style={{ fontSize: 48 }} />
					        <Typography variant="h5" component="h2">
					          Create New Contract
					        </Typography>
					        <Typography className={classes.pos} color="textSecondary">
					          Get Started and Launch A New Contract
					        </Typography>
					      </CardContent>
					      <CardActions>
					        <Button size="small" component={Link} to='/CreateNewContract'>Create New Contract</Button>
					      </CardActions>
					    </Card>
        </Grid>
        <Grid item xs={12}>
					<Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Contract ID</TableCell>
            <TableCell align="right">Contract Type</TableCell>
            <TableCell align="right">Next Action</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Status</TableCell>
						<TableCell align="right">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
					{this.state.rows.length === 0 ? <Loading message="loading your information..."/> :
          this.state.rows.map(row => (
            <TableRow key={row.id}>
						{/*contractAddress, type, actionNeeded, action, depositedValue, status, createdOn*/}
              <TableCell component="th" scope="row"><Link to={`/contracts/${row.contractAddress}`}>{row.contractAddress}</Link></TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.action}</TableCell>
              <TableCell align="right">{row.depositedValue}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
							<TableCell align="right">{formatDate(row.createdOn)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </Grid>
      </Grid>
    </div>
		</SideBar>
  );
}}


HomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeScreen);
