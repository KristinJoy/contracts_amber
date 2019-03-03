import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Web3Provider } from 'react-web3';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SideBar from "./components/SideBar.js";
import CreateNewContract from "./components/CreateNewContract.js";
import ServiceAgreement from "./components/ServiceAgreement.js";
import RainyDay from "./components/RainyDay.js";

ReactDOM.render(<Web3Provider>
  <Router>
  <App />
  {/*<Route exact path="/" component={Home} />
  <Route path="/CreateNewContract" component={CreateNewContract} />
  <Route path="/ServiceAgreement" component={ServiceAgreement} />
  <Route path="/RainyDay" component={RainyDay} />
  {/*}<Route path="/PendingContracts" component={PendingContracts} />
  <Route path="/ContratsToFinalize" component={ContratsToFinalize} />
  <Route path="/AllContracts" component={AllContracts} />*/}

  </Router>
  </Web3Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
