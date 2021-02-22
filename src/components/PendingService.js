import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

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

function PendingService(props) {
  const { classes } = props;
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Pending Service Agreement
        </Typography>
        <Typography variant="h5" component="h2">
        (Data from database of service provider) created a Service Agreement for
               for you.
               <br />The contract requires (ether input from contract).
               <br/>
               Please approve the amount by entering it in the field below, then click the
               Approve button.
               <br />
               The funds will be taken from your account and stored
               in the contract.
               <br />
               They will not be released without your approval.
               </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Contract Information
        </Typography>
        <TextField
                     id="ETH"
                     label="Ether"
                     margin="normal"
                     variant="outlined"
                     InputProps={{
                     startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
                   }}/>
      </CardContent>
      <CardActions>
        <Button size="small">Approve Contract</Button>
      </CardActions>
    </Card>
  );
}

PendingService.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PendingService);
