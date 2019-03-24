import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SideBar from "./SideBar.js";
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class NewContractCards extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <SideBar>
        <div className={classes.root}>
        
        <Typography variant="h4">Create New Contract</Typography>
        
        <Card className={classes.card}>
          <CardContent>
              <Typography className={classes.heading}>
                Service Contract
              </Typography>
              <Typography>
                This contract allows you enter into a service agreement with
                another party. The person performing the service creates the
                contract. Once it’s deployed, the person receiving the service will
                add funds to the contract. Once the work is completed, both
                parties will finalize the contract, via your dashboards and funds
                will be released.
              </Typography>
            <Button variant="contained" color="primary" className={classes.button} component={Link} to='/deploy/service_agreement'>
              Create This Contract
            </Button>
          </CardContent>
        </Card>

          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.heading}>
                Rainy Day Contract
              </Typography>
              <Typography className={classes.secondaryHeading} />
              <Typography>
                This contract allows you to hold money for a rainy day in which
                ever city you specify. Once the weather report shows that it’s
                raining, the money is transferred into your account and you are
                free to enjoy your rainy day.
              </Typography>
              <Button variant="contained" color="primary" className={classes.button} component={Link} to='/deploywithvalue/rainy_day'>
                  Create This Contract
              </Button>
            </CardContent>
          </Card>

        </div>
      </SideBar>
    );
  }
}

NewContractCards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewContractCards);

