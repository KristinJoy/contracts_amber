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
import ListContracts from './ListContracts.js';


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


class HomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value: 0,
			rows: [],
			loading: true
		};
	}
	
	handleChange = (event, value) => {
    this.setState({ value });
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
					          You Have 
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
										{this.state.rows.length} Contracts
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
					<ContractContext.Consumer>
						{utilities => <ListContracts utilities={utilities}/>}
					</ContractContext.Consumer>
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
