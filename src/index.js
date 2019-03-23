import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Web3Provider from './components/Providers/Web3Provider';
import ContractProvider from './components/Providers/ContractProvider';


ReactDOM.render(
            <Web3Provider>
              <ContractProvider>
              <link href="https://fonts.googleapis.com/css?family=Playfair+Display+SC" rel="stylesheet"/>
                <Router>
                  <App />
                </Router>
              </ContractProvider>
            </Web3Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
