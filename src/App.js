import React, { Component } from 'react';
import { BrowserRouter as  Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import OpeningScreen from "./components/OpeningScreen.js";
import AmberAppBar from "./components/AmberAppBar.js"
import SideBar from "./components/SideBar.js";
import CreateNewContract from "./components/CreateNewContract.js";

import RainyDay from "./components/RainyDay.js";
import CancelAgreement from './components/CancelAgreement';
import FinalizeContract from './components/FinalizeContract';
import PendingService from './components/PendingService';
import PendingContractsList from './components/PendingContractsList';
import ContractsToFinalizeList from './components/ContractsToFinalizeList';
import AllContractsList from './components/AllContractsList';
import HomeScreen from './components/HomeScreen.js';
import BlockChainInfo from './components/BlockChainInfo.js';
import Contract from './components/Contract.js';
import {ContractContext} from "./components/Providers/ContractProvider";
// Add in styles
 import theme from  './styles/muiTheme.js';

class App extends Component {
    render() {
        return (
          
          <MuiThemeProvider theme={theme}>
					<Switch>
						<div className="App">

                <Route path="/home" component={OpeningScreen} />
                <Route path="/BlockChainInfo" component={BlockChainInfo}/>
                {/*<Route path="/SideBar" component={SideBar} />*/}
                <Route path="/HomeScreen" component={HomeScreen} />
                <ContractContext.Consumer>
                {utilities => <Route path="/contracts/:contractAddress" render={(props) => <Contract utilities={utilities} {...props}/>} />}
                </ContractContext.Consumer>
                <Route path="/PendingContractsList" component={PendingContractsList} />
                <Route path="/ContractsToFinalizeList" component={ContractsToFinalizeList} />
                <Route path="/AllContractsList" component={AllContractsList} />
                <Route path="/RainyDay" component={RainyDay} />
                <Route path="/FinalizeContract" component={FinalizeContract} />
                <Route path="/PendingService" component={PendingService} />
                <Route path="/CreateNewContract" component={CreateNewContract}/>
                <Redirect from="/" to="/home" />
                {/*<Route path="/Contract/:param" component={<Contract contractAddress={param}/>}*/}

						</div>
					</Switch>
          </MuiThemeProvider>
        );
    	}
		}
export default App;
