import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import RainyDay from "./components/RainyDay.js";
import Web3Provider from './components/Providers/Web3Provider';

console.log("web3 provider object: ", Web3Provider);
ReactDOM.render(
            <Web3Provider>
                <Router>
              <App />
                </Router>
            </Web3Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
