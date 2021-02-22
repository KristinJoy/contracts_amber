import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function BlockChainInfo(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h2" component="h3">
          Information is Power
        </Typography>
        <Typography variant="h6">
          In short a Blockchain is a decentralized server.
          <br/>
          <br />
          Right now, most data is stored on single massive storage devices
          called servers.
          <br/>
          <br/>
          A Blockchain takes the information traditionally stored on the single machine and gives it to
          EVERYONE.
          <br/>
          In order to change a piece of data on a Blockchain system, a majority consenus
          of every single computer on the chain is required.  So if one computer gets hacked,
          the information is still safe because the rest of the chain doesn't agree with the corrupted
          data.
          <br/>
          <br/>
          The idea is a system of storing information that is safer and not in the hands of a single entity.
          <br/>
          <br/>
          If you want more information, here are some good resourses.

        </Typography>
        <Typography variant="overline">
        <a href="https://www.youtube.com/watch?v=r43LhSUUGTQ" target="_blank" rel="noopener noreferrer">Understand the Blockchain in Two Minutes:</a>  A YouTube video.
        <br/>
        <a href='https://blockchain.wtf/what-the-faq/what-is-blockchain/' target="_blank" rel="noopener noreferrer">What is a Blockchain?:</a>    This is an easy to follow, plain language text.
        <br />
        <a href='https://lisk.io/academy/blockchain-basics/what-is-blockchain' target="_blank" rel="noopener noreferrer">What is Blockchain?:</a>    This source goes more in depth about the
        technology.
        <br />
        <a href="https://itunes.apple.com/us/podcast/the-tim-ferriss-show/id863897795?mt=2&i=1000386194955" target="_blank" rel="noopener noreferrer">
        This is a Fantastic Podcast Episode:</a>  Go to Episode #244.  It's long, but it's worth the listen. It gives a comprehansive overview of blockchain.
        </Typography>

      </Paper>
    </div>
  );
}

BlockChainInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlockChainInfo);
