import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import OpeningScreen from './components/OpeningScreen.js';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import RainyDay from "./components/RainyDay.js";
import Web3Provider from './components/Providers/Web3Provider';
import ContractProvider from './components/Providers/ContractProvider';


ReactDOM.render(
            <Web3Provider>
              <ContractProvider>
                <Router>
                  <App />
                </Router>
              </ContractProvider>
            </Web3Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
