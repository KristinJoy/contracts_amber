import React, { Component } from 'react';
import './App.css';
import RouteTesting from './components/RouteTesting/RouteTesting';
import ServiceAgreement from './components/ServiceAgreement';
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
				<RouteTesting />
				<ServiceAgreement/>
				<FunctionComponent/>
      </div>
    );
  }
}

export default App;
