import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Amber from './Amber.png';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 150,
  },
  image: {
    height: 150,
    width: 150
  },
});

function HomeScreen(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={40}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <Typography > <h1>We are Amber Contracts </h1> </Typography>

          </Paper>
          <Card className={classes.media}>
          <CardActionArea>
          <CardMedia
          className={classes.image}
          image={Amber}
        />
        </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>

      </Grid>
    </div>
  );
}

HomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeScreen);
