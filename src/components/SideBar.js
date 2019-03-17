import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fingerprint from '@material-ui/icons/Fingerprint';
import DonutLarge from '@material-ui/icons/DonutLarge';
import Info from '@material-ui/icons/Info';
import ListAlt from '@material-ui/icons/ListAlt';
import Home from '@material-ui/icons/Home';
import {ContractContext} from "./Providers/ContractProvider";
import Contract from './Contract.js';
import ListContracts from './ListContracts.js';
import Factory from './Factory.js';
import RainyDay from './RainyDay.js';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import CancelAgreement from './CancelAgreement';
import FinalizeContract from './FinalizeContract';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PendingService from './PendingService';
import PendingContractsList from './PendingContractsList';
import ContractsToFinalizeList from './ContractsToFinalizeList';
import AllContractsList from './AllContractsList';
import HomeScreen from './HomeScreen';
import amber from './amberLogo.png';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NavLink } from "react-router-dom";





const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
	appBar: {
    width: `calc(100% - ${drawerWidth}px)`,

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  grow: {
    flexGrow: 1,
  },

  drawerPaper: {
    width: drawerWidth,

  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

	toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  userAddress: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  etherBalance: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },


});

class SideBar extends React.Component {

    render() {
      const { classes, theme} = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            User Name
          </Typography>
          <div className={classes.userAddress}>
          <Typography variant="h6" color="inherit" noWrap>
            User Address
          </Typography>
              </div>
              <div className={classes.etherBalance}>
              <Typography variant="h6" color="inherit" noWrap>
                Ether Balance
              </Typography>
                  </div>
              <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <DonutLarge/>
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <ListAlt/>
                </Badge>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
            </div>

        </Toolbar>
      </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
          >
          <div className="drawer-title-div">
          <br/>
          <Typography variant="h5" color="black" justifyContent="center" >
            Amber Contracts
          </Typography>
          <br/>
          </div>
          <Divider />
          <List>
            {['Home'].map((text, index) => (
             <ListItem button key={text} component={Link} to='/HomeScreen' color="secondary">
                <ListItemIcon> <Home color="secondary" /> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Create New Contract'].map((text, index) => (
              <ListItem button key={text} component={Link} to='/CreateNewContract'>
                <ListItemIcon> <Fingerprint color="primary" /> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
         <Divider />
          <List>
            {['Pending Contracts'].map((text, index) => (
               <ListItem button key={text} component={Link} to='/PendingContractsList'>
                <ListItemIcon> <DonutLarge color="secondary" /> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['AllContractsList'].map((text, index) => (
               <ListItem button key={text} component={Link} to='/AllContractsList'>
                <ListItemIcon> <ListAlt color="secondary" /> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
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
