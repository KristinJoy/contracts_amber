import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';



const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});




const Loading = (props) => {
  return <Dialog
    open={true}
    disableBackdropClick={true}
    disableEscapeKeyDown={true}
  >
  <img alt="loading" width={100} src="https://media.giphy.com/media/dnoa8RlmGDXpDuj1D9/giphy.gif"/>
  </Dialog>
}

Loading.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Loading);
