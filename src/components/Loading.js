import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';


const Loading = (props) => {
  return <Dialog
    open={true}
    disableBackdropClick={true}
    disableEscapeKeyDown={true}>
    <DialogContent style={{"text-align": "center"}}>
      <DialogTitle id="simple-dialog-title">Loading...</DialogTitle>
      <img alt="loading" width={100} src="https://media.giphy.com/media/dnoa8RlmGDXpDuj1D9/giphy.gif"/><br/>
      {props.message ? <Typography variant="body1">{props.message}</Typography> : null}
    </DialogContent>
  </Dialog>
}

Loading.propTypes = {
  classes: PropTypes.object,
};

export default (Loading);
