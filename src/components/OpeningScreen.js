import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import BlockChainInfo from "./BlockChainInfo";
import CreateNewContract from "./CreateNewContract";
import HomeScreen from "./HomeScreen";

// import { Grid } from '@material-ui/core';
import amber from './amberLogo.png';
// const logo = require('../assets/amberLogo.png');



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

function OpeningScreen(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
     <Grid container spacing={40}>
		 	<Grid item xs={12}>
					<Paper className={classes.backGround} elevation={3}>
						<Grid className={classes.sectionTop} container>
							<Grid className={classes.introFix} item md={8} sm={12} xs={12}>
							<div style={{ padding: `1em` }}>
								<Typography variant='h2'>
								Welcome to Amber Contracts
								</Typography>
								<Typography variant="h5" >
								We have created a space for anyone to create and deploy smart contracts to the Etherium Blockchain.
								<br/>
								<br/>
								All you need to do is input conditions and values.  You will then have
						    an immutable contract on a trusted Blockchain.
								</Typography>
								<Button style={{ margin: `1em` }} variant="contained" color="primary" component={Link} to='/BlockChainInfo'>
									About Blockchain
      					</Button>
								<Button variant="contained" color="secondary" component={Link} to='/HomeScreen'>
									Get Started
      					</Button>
								</div>
							</Grid>
							<Grid item md={4} sm={12} xs={12}>
									<img className={classes.img} src={amber} alt=""></img>
							</Grid>
						</Grid>
						<Grid container className={classes.sectionBottom}>
							<Grid item xs={12}>
								<Typography className={classes.bottomTitle} variant="h4">
								How it works
								</Typography>
							</Grid>
							<Grid className={classes.stepItemSpacing} item md={4} xs={12}>
								<Typography variant="h5">Step One</Typography>
								<Typography variant="subtitle2">
								Choose the type of contract you want to deploy from one of our convenient templates.
								</Typography>
							</Grid>
							<Grid className={classes.stepItemSpacing} item md={4} xs={12}>
								<Typography variant="h5">Step Two</Typography>
								<Typography variant="subtitle2">
									The contract template will lead you through the values you need to input.
								</Typography>
							</Grid>
							<Grid className={classes.stepItemSpacing} item md={4} xs={12}>
								<Typography variant="h5">Step Three</Typography>
								<Typography variant="subtitle2">
									Deploy your contract.  Once it is deployed you can interact with it
									via our dashboard.
									<br/>
									When the contract is satisfied, it will self terminate from the Blockchain.

								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
		 </Grid>
    </div>
  );
}

OpeningScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OpeningScreen);
