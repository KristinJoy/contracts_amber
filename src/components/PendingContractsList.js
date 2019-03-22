import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import SideBar from './SideBar';
import Grid from '@material-ui/core/Grid';
import {ContractContext} from "./Providers/ContractProvider";
import ListContracts from './ListContracts.js';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: "33.33%",
    flexShrink: 0
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class PendingContractsList extends React.Component {

render() {
  const { classes } = this.props;
  return (
    <SideBar>
    <div className={classes.root}>
    <Typography variant="h4"> Pending Contracts </Typography>
    <Grid item xs={12}>
      <ContractContext.Consumer>
        {utilities => <ListContracts utilities={utilities}/>}
      </ContractContext.Consumer>
      </Grid>
    </div>
    </SideBar>
  );
}
}

PendingContractsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PendingContractsList);
