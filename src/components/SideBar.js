import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Fingerprint from '@material-ui/icons/Fingerprint';
import DonutLarge from '@material-ui/icons/DonutLarge';
import Info from '@material-ui/icons/Info';
import ListAlt from '@material-ui/icons/ListAlt';
import CreateNewContract from "./CreateNewContract.js";
import Home from '@material-ui/icons/Home';
import ServiceAgreement from './ServiceAgreement.js';
import RouteTesting from './RouteTesting/RouteTesting.jsx';
import FunctionComponent from './FunctionComponent.jsx';
import {ContractContext} from "./Providers/ContractProvider";
import Contract from './Contract.js';
import DeployServiceAgreement from './DeployServiceAgreement.js';
import ListContracts from './ListContracts.js';
import Factory from './Factory.js';

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


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class SideBar extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Amber Contracts
            </Typography>

          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Home'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon> <Home /> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Create New Contract', 'Pending Contracts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <Fingerprint /> : <DonutLarge /> }</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Contracts to Finalize',
            'All Contracts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <Info/> : <ListAlt />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />{/*placeholder div padding*/}
          <h1>Deploy Generic Factory Contract:</h1>
          <ContractContext.Consumer>
            {utilities => 
						<Factory 
						utilities={utilities} 
						contractType="service_agreement"
            factoryContractAddress={factoryContractAddress} 
            factoryContractAbi={factoryContractAbi} 
            deployedFactoryContractAbi={deployedFactoryContractAbi}/>}
          </ContractContext.Consumer>
          <h2>List Contracts:</h2>
          <ContractContext.Consumer>
            {utilities => <ListContracts utilities={utilities}/>}
          </ContractContext.Consumer>
        </main>

      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideBar);
/*<RouteTesting />
          <ContractContext.Consumer>
            {contracts => <DeployServiceAgreement contractAddress={this.state.contractAddress} contract={contracts}/>}
          </ContractContext.Consumer>
          <FunctionComponent />
          <h2>Get contract info for yourself here (will load and tell you if you have actions for the contract address):</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" value={this.state.contractAddress} onChange={this.handleChange} />
            </label><br/>
            <input type="submit" value="Submit" />
          </form>
          {this.state.render ?
          <ContractContext.Consumer>
            {contracts => <Contract contractAddress={this.state.contractAddress} contract={contracts}/>}
          </ContractContext.Consumer> : null}
          <ContractContext.Consumer>
            {contracts => <NonDynamicContract contractAddress={this.state.contractAddress} contract={contracts}/>}
          </ContractContext.Consumer>*/
