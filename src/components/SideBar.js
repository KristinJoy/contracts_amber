import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import RainyDay from './RainyDay.js';
import CancelAgreement from './CancelAgreement';
import FinalizeContract from './FinalizeContract';
import PendingService from './PendingService';
import PendingContractsList from './PendingContractsList';
import ContractsToFinalizeList from './ContractsToFinalizeList';
import AllContractsList from './AllContractsList';
import HomeScreen from './HomeScreen';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NavLink } from "react-router-dom";




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
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };



  render() {
    const { classes, theme} = this.props;

    return (

      <div className={classes.root}>

        <AppBar
          color="secondary"
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
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
              <NavLink to="/HomeScreen"
              component={HomeScreen}> <ListItem button key={text}>
                <ListItemIcon> <Home /> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem></NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {['Create New Contract'].map((text, index) => (
              <NavLink to="/CreateNewContract"
              component={CreateNewContract}> <ListItem button key={text}>
                <ListItemIcon> <Fingerprint /> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem></NavLink>
            ))}
          </List>

          <List>
            {['Pending Contracts'].map((text, index) => (
              <NavLink to="/PendingContractsList"
              component={PendingContractsList}> <ListItem button key={text}>
                <ListItemIcon> <DonutLarge /> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem></NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {['Contracts to Finalize'].map((text, index) => (
              <NavLink to="/ContractsToFinalizeList"
              component={PendingContractsList}> <ListItem button key={text}>
                <ListItemIcon> <Info/> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem></NavLink>
            ))}
          </List>

          <List>
            {['AllContractsList'].map((text, index) => (
              <NavLink to="/AllContractsList"
              component={PendingContractsList}> <ListItem button key={text}>
                <ListItemIcon> <ListAlt /> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem></NavLink>
            ))}
          </List>
          <Divider />

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            {this.props.children}


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
