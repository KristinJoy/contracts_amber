import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SideBar from "./components/SideBar.js";
import CreateNewContract from "./components/CreateNewContract.js";
import ServiceAgreement from "./components/ServiceAgreement.js";
import RainyDay from "./components/RainyDay.js";
import RouteTesting from './components/RouteTesting/RouteTesting';
import FunctionComponent from './components/FunctionComponent';

class App extends Component {
  constructor(props){
		super(props);
		this.state = {
			message: "this would be your account number but no web3 yet"
		}
	}
	componentWillMount() {
		console.log("App state: ", this.state);
		console.log("App props: ", this.props);
	}
    render() {
        return (

            <div className="App">

                <SideBar />


            </div>

        );
    }
	}

export default App;
