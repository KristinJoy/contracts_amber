import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';


// Import widgets being used in this component

import SideBar from "./components/SideBar.js";
import CreateNewContract from "./components/CreateNewContract.js";
import ServiceAgreement from "./components/ServiceAgreement.js";
import RainyDay from "./components/RainyDay.js";
import CancelAgreement from './components/CancelAgreement';
import FinalizeContract from './components/FinalizeContract';
import PendingService from './components/PendingService';
import PendingContractsList from './components/PendingContractsList';
import ContractsToFinalizeList from './components/ContractsToFinalizeList';
import AllContractsList from './components/AllContractsList';
import HomeScreen from './components/HomeScreen';




// Add in styles
import './App.css';

class App extends Component {
    render() {
        return (
            	<Switch>
          <div className="App">
            <SideBar>
								<Route path="/" component={HomeScreen} />
								<Route path="/CreateNewContract" component={CreateNewContract} />
								<Route path="/ServiceAgreement" component={ServiceAgreement} />
								<Route path="/PendingContractsList" component={PendingContractsList} />
								<Route path="/ContractsToFinalizeList" component={ContractsToFinalizeList} />
								<Route path="/AllContractsList" component={AllContractsList} />
								<Route path="/RainyDay" component={RainyDay} />
								<Route path="/FinalizeContract" component={FinalizeContract} />
								<Route path="/PendingService" component={PendingService} />
            </SideBar>
          </div>
              </Switch>
        );
    }
}

export default App;
