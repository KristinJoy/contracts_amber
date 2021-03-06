import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DonutLarge from '@material-ui/icons/DonutLarge';
import AddBox from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ParticleWidget from './ParticleWidget.js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import { NONAME } from 'dns';


const drawerWidth = 240;
const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    display: 'flex',
  },
	appBar: {
    width: `calc(100% - ${drawerWidth}px)`

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
  sectionUserEther: {
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

	toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  truncate: {
		"maxWidth": "11vw",
		"whiteSpace": "nowrap",
		"overflow": "hidden",
		"textOverflow": "ellipsis"
	}


});

class SideBarHeader extends React.Component {
  constructor(props){
		super(props);
		this.state = {
			rows: [],
			loading: true,
      anchorEL: null
		};


	}
	componentDidMount = async () => {
    const contracts = await this.getContracts();
    const publicAddress = await this.props.utilities.getFirstAccount();
    const balance = await this.props.utilities.getBalance();
		this.setState({
      contracts: contracts,
      balance: balance,
      publicAddress: publicAddress,
      pending: contracts.length,
			loading: false
		});
	}
	getContracts = async () => {
    let contracts = await this.props.utilities.getContractsByAddress();
		return contracts.filter(contract => {
			return contract.active;
		});
	}
  handleClickAdd = event => {
    this.setState({ 
      anchorEl: event.currentTarget,
      addOpen: true
    });
  };
  handleClickPending = event => {
    this.setState({ 
      anchorEl: event.currentTarget,
      pendingOpen: true });
  };

  handleClose = () => {
    this.setState({ 
      anchorEl: null,
      pendingOpen: false,
      addOpen: false });
  };
    render() {
      const { classes, theme} = this.props;
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);
    return (
      <AppBar position="fixed" className={classes.appBar}>
        {/* <ParticleWidget color="#fff" nodes="30" speed="3" zIndex="0"/> */}
        <Toolbar>
        <div>
        <span className="mui--divider-right">
          <Typography variant="h6" color="inherit" noWrap>
            {this.state.publicAddress ? this.state.publicAddress : null}
          </Typography>
          </span>
          <span>
          <Typography variant="h6" color="inherit" noWrap>
          Ether Balance Ξ {this.state.balance ? this.state.balance.slice(this.state.balance.indexOf('.')-2, this.state.balance.indexOf('.')+4) : null}
          </Typography>
          </span>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <IconButton
            color="inherit"
            aria-owns={open ? 'long-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClickAdd}>
                <AddBox/>
            </IconButton>
            <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={this.state.addOpen}
            onClose={this.handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            getContentAnchorEl={null}
            PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              paddingRight: 0
            }}}>
            <MenuItem>
              <Typography variant="h5" gutterBottom style={{outline: 'none'}} component={Link} to='/CreateNewContract/ '>
                Create New Contract:
              </Typography>
            </MenuItem>
            <MenuItem>
              <Link to={`/deploy/service_agreement`}>Create a New Service Agreement Contract</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/deploywithvalue/rainy_day`}>Create a New Rainy Day Contract</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/deploy/add_text`}>Add Text to the Blockchain</Link>
            </MenuItem>
        </Menu>
        <IconButton
        color="inherit"
        aria-owns={open ? 'long-menu' : undefined}
        aria-haspopup="true"
        onClick={this.handleClickPending}>
          <Badge badgeContent={this.state.pending} color="secondary">
            <DonutLarge/>
          </Badge>
        </IconButton>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={this.state.pendingOpen}
            onClose={this.handleClose}
            PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 8,
              width: 400,
            },
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            getContentAnchorEl={null}>
          <MenuItem>
        <Typography variant="h5" gutterBottom style={{outline: 'none'}} component={Link} to='/useractivecontracts/ '>
            Your Active Contracts:
          </Typography>
          </MenuItem>
          {this.state.contracts ? this.state.contracts.map((contract, key) => (
            <MenuItem key={key}>
            <Link className={classes.truncate} to={`/contracts/${contract.contractAddress}`}>{contract.contractAddress}</Link>
            <p>{fixCase(contract.contractType)}</p>
            </MenuItem>
          )) : null}
        </Menu>

          </div>
          <div className={classes.sectionMobile}>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
let fixCase = (action) => {
  return _.startCase(_.toLower(action));
}

SideBarHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(SideBarHeader);
