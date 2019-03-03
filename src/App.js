import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


// Import widgets being used in this component

import SideBar from "./components/SideBar.js";
import CreateNewContract from "./components/CreateNewContract.js";
import ServiceAgreement from "./components/ServiceAgreement.js";
import RainyDay from "./components/RainyDay.js";


// Add in styles
import './App.css';

class App extends Component {
    render() {
        return (

            <div className="App">

                <SideBar />


            </div>

        );
    }
}

export default App;
