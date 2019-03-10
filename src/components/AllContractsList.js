import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('0x099290vd0988092048502', "Service Agreement", "John", 75, "Closed"),
  createData('0x09289572009390xf09580', "Rainy Day", "Null", 85, "Open"),
  createData('0x092092390582802890f89', "Service Agreement", "Jill", 243, "Closed"),
  createData('0x092394570894985702094', "Service Agreement", "Buster", 875, "Open"),
  createData('0x09w840983498349080934', "Rainy Day", "Null", 20, "Open"),
];

function AllContractsList(props) {
  const { classes } = props;

  return (

<div className={classes.root}>
<Typography variant="h4"> All Contracts </Typography>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Contract Id</TableCell>
            <TableCell align="right">Contract Type</TableCell>
            <TableCell align="right">Second Party</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </div>
  );
}

AllContractsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllContractsList);
