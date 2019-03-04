import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
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
};

function FinalizeContract(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Finalize Contract
        </Typography>
        <Typography variant="h5" component="h2">
        I agree that the contracted services have been rendered.
        <br />
        I will release the funds of this contract to the provider of the service.
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Contract Information
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Finalize Contract</Button>
      </CardActions>
    </Card>
  );
}

FinalizeContract.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(FinalizeContract);
