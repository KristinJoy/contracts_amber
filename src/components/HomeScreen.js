import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import BlockChainInfo from "./BlockChainInfo";
import ViewList from "@material-ui/icons/ViewList";
import CreateNewContract from "./CreateNewContract";
import SideBar from "./SideBar.js";
import {ContractContext} from "./Providers/ContractProvider";
import ListContracts from './ListContracts.js';
import Factory from './Factory.js';
import Loading from './Loading.js';

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


const styles = theme => ({
	// root:{
	// 	flexGrow: 1,
	// },
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
});

function HomeScreen(props) {
  const { classes } = props;

  return (

	<SideBar>
	<div className={classes.root}>
		<Paper className={classes.paper}>
			<Grid container spacing={24}>
				<Grid item xs={3}>
					<ButtonBase className={classes.image}>
						<ViewList />
					</ButtonBase>
				</Grid>
				<Grid item xs={3} sm container>
					<Grid item xs container direction="column" spacing={16}>
						<Grid item xs>
							<Typography gutterBottom variant="subtitle1">
								User Name
							</Typography>
							<ContractContext.Consumer>
							{utilities =><ListContracts utilities={utilities}/>}
							</ContractContext.Consumer>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	</div>
		</SideBar>
  );
}

HomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeScreen);
