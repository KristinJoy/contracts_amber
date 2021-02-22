import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

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

function Inactive(props) {
  let fixCase = (action) => {
    return _.startCase(_.toLower(action));
  }
  const { classes } = props;
  console.log("inactive contract props: ", props);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {props.contract.action === "cancelled" ? "Cancelled " + fixCase(props.contract.contractType) : "Completed " + fixCase(props.contract.contractType)}
        </Typography>
        <Typography variant="h6" >
          Contract Address: {props.contract.contractAddress}
        </Typography>
        <Typography variant="h6" >
          Contract Value: {props.contract.value}
        </Typography>
        <Typography variant="body1">
          Created On: {props.contract.createdOn}
        </Typography>
        <Typography variant="body1">
          Concerned parties: {props.contract.contractBetween ? props.contract.contractBetween.map(address => <div>{address}<br/></div>) : null}
        </Typography>
      </CardContent>

    </Card>
  );
}

Inactive.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inactive);
