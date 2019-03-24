import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import LoadingSmall from "./LoadingSmall.js";
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';




const Widget = (props) => {
  const style = {
    height: "100%",
    textAlign: "center"
  };
  const font = {
    fontWeight: "bold"
  }
  return props.loading ?  <LoadingSmall/> :
    <Fade style={style} in={!props.loading} timeout={{enter: 600}}>
      <Card raised={true} style={style}>

        <CardContent>
          {props.icon}
          <Typography style={font} variant="h5">
            {props.title}
          </Typography>
          <Typography style={font} variant="subtitle2">
            {props.secondary}
          </Typography>
          <Typography variant="body2">
            {props.body}
          </Typography>
        </CardContent>
				<CardActions style={{ 'justifyContent': 'center' }}>
          <Button variant="contained" color="primary" size="small" component={Link} to={props.actionLink}>{props.action}</Button>
        </CardActions>
      </Card>
    </Fade>;

};
export default Widget;
