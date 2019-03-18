import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import LoadingSmall from "./LoadingSmall.js";

const Widget = (props) => {
    return props.loading ? <Card > <LoadingSmall/> </Card> :
            <Card > 
              <CardContent>
                {props.icon}
                <Typography variant="h3">
                  {props.title}
                </Typography>
                <Typography variant="h5">
                  {props.secondary}
                </Typography>
                <Typography variant="p">
                  {props.body}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={props.actionLink}>{props.action}</Button>
              </CardActions>
            </Card>
};
export default Widget;