import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fingerprint from '@material-ui/icons/Fingerprint';
import DonutLarge from '@material-ui/icons/DonutLarge';
import ListAlt from '@material-ui/icons/ListAlt';
import Home from '@material-ui/icons/Home';
import amber from './amberLogo.png';
import {Link} from 'react-router-dom';
import SideBarHeader from "./SideBarHeader.js";
import {ContractContext} from "./Providers/ContractProvider";
import ParticleWidget from './ParticleWidget.js';


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
      <ContractContext.Consumer>
        {utilities => <SideBarHeader utilities={utilities}/>}
      </ContractContext.Consumer>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
          >
          <div className="drawer-title-div center">
          <Link to={`/HomeScreen`}><img alt="Amber Logo" src={amber}/></Link>
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
            {['Your Contracts'].map((text, index) => (
               <ListItem button key={text} component={Link} to='/usercontracts/ '>
                <ListItemIcon> <ListAlt color="secondary" /> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <div />

        </Drawer>
				<main className={classes.content}>
        <div className={classes.toolbar} />
        {/*<ParticleWidget color="#EB643A" nodes="150" speed="6"/>*/}
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
