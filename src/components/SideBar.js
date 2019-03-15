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
import AmberAppBar from './AmberAppBar.js'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NavLink } from "react-router-dom";




const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class SideBar extends React.Component {
  consstructor(props){
  }
    render() {
      const { classes, theme} = this.props;

    return (
      <div className={classes.root}>
      <AmberAppBar />
        <Drawer
          variant="permanent"
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left">
          <div className={classes.toolbar}/>

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
            {['Contracts to Finalize'].map((text, index) => (
             <ListItem button key={text} component={Link} to='/ContractsToFinalizeList'>
                <ListItemIcon> <Info color="primary"/> </ListItemIcon>
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
