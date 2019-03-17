import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';


const Loading = (props) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  }
  return <Dialog
    open={open}
    disableBackdropClick={true}
    disableEscapeKeyDown={false}
    onClose={handleClose}>
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
