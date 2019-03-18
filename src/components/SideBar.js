import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {ContractContext} from "./Providers/ContractProvider";
import SideBarContent from './SideBarContent';


class SideBar extends React.Component {
  constructor(props){
		super(props);
		this.state = {
			loading: true
		};
	}
  render() {
    return (
      <ContractContext.Consumer>
				{utilities => <SideBarContent utilities={utilities} {...this.props}/>}
			</ContractContext.Consumer>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default (SideBar);
