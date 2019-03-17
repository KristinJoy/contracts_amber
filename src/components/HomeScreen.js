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
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import BlockChainInfo from "./BlockChainInfo";
import ViewList from "@material-ui/icons/ViewList";
import CreateNewContract from "./CreateNewContract";
import Fingerprint from '@material-ui/icons/Fingerprint';
import PendingContractsList from './PendingContractsList';
import AllContractsList from './AllContractsList';
import SideBar from "./SideBar.js";
import {ContractContext} from "./Providers/ContractProvider";
import ListContracts from './ListContracts.js';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Factory from './Factory.js';

import amber from './amberLogo.png';

const factoryContractAddress = "0x89C6f43180330A7Ce7F5c95c902eeC9930119778";
const factoryContractAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_newContract",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "actionTo",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "toDeposit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "action",
				"type": "string"
			}
		],
		"name": "NewContract",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_depositor",
				"type": "address"
			},
			{
				"name": "_request_amount",
				"type": "uint256"
			}
		],
		"name": "service_agreement",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const deployedFactoryContractAbi = [
	{
		"inputs": [
			{
				"name": "_depositor",
				"type": "address"
			},
			{
				"name": "_creator",
				"type": "address"
			},
			{
				"name": "_request_amount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "depositor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "weiAmount",
				"type": "uint256"
			}
		],
		"name": "Deposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "depositor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "action",
				"type": "string"
			}
		],
		"name": "Destroyed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "actionTo",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "action",
				"type": "string"
			}
		],
		"name": "NextAction",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "bool"
			}
		],
		"name": "FINISHED",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit_funds",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "agree_upon_services_delivered",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw_and_terminate_contract",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cancel",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_balance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "see_owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "see_depositor",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('0x034958304985039450',"Deposit Money", '0x38933904580394850',  24, "3/5/34"),
  createData('0x034958304985039450',"Finalize", '0x38933904580394850',  37, "3/5/34"),
  createData('0x034958304985039450', "Withdraw Funds",'0x38933904580394850',45,  "3/5/34"),
  createData('0x034958304985039450', "Wait for Rain",'0x38933904580394850',  67, "3/5/34"),
  createData('0x034958304985039450', "Deposit Money",'0x38933904580394850',  49, "3/5/34"),
];


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

class HomeScreen extends React.Component {

	state = {
    value: 0,
  };
	handleChange = (event, value) => {
    this.setState({ value });
  };

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
								<ListAlt color="secondary" style={{ fontSize: 48 }}/>
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
					        <Fingerprint color="primary" style={{ fontSize: 48 }} />
					        <Typography variant="h5" component="h2">
					          Create New Contract
					        </Typography>
					        <Typography className={classes.pos} color="textSecondary">
					          Get Started and Launch A New Contract
					        </Typography>
					      </CardContent>
					      <CardActions>
					        <Button size="small" component={Link} to='/AllContractsList'>Create New Contract</Button>
					      </CardActions>
					    </Card>
        </Grid>
        <Grid item xs={12}>
				<Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Actions Needed Per Contract" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
				{value === 0 && <TabContainer>
					<Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Contract ID</TableCell>
            <TableCell align="right">Actions Needed</TableCell>
            <TableCell align="right">In Contract With</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
					</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
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
