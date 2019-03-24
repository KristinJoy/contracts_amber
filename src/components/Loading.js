import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import ParticleWidget from './ParticleWidget.js';



const Loading = (props) => {
	const [open, setOpen] = React.useState(true);
	const styles_s = { "width": '30vw', 'color': 'white', 'text-align': 'center' };
	const styles = {'color': 'white', 'text-align': 'center'};
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Dialog
      open={open}
      disableBackdropClick={true}
      disableEscapeKeyDown={false}
      onClose={handleClose}
      style={{ "pointer-events": "none" }}
    >
		
      <DialogContent style={styles_s}>
        <DialogTitle id="simple-dialog-title">
          <Typography style={styles} variant="h5">
            Loading...
          </Typography>
        </DialogTitle>
        <img
          alt="loading"
          width={100}
          src="https://media.giphy.com/media/dnoa8RlmGDXpDuj1D9/giphy.gif"
        />
        <br />
        
          {props.message ? (
            <Typography style={styles} variant="body1">
              {props.message}
            </Typography>
          ) : null}
      </DialogContent>
    </Dialog>
  );
}

Loading.propTypes = {
  classes: PropTypes.object,
};

export default (Loading);
