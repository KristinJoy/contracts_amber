import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DonutLarge from '@material-ui/icons/DonutLarge';
import ListAlt from '@material-ui/icons/ListAlt';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';


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

class SideBarHeader extends React.Component {

    render() {
      const { classes, theme} = this.props;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            User Address
          </Typography>
          <Typography variant="h6" color="inherit" noWrap>
            Ether Balance
          </Typography>
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
    );
  }
}

SideBarHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(SideBarHeader);
