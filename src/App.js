import React, { Component } from 'react';
import './App.css';
import RouteTesting from './components/RouteTesting/RouteTesting';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			message: "this would be your account number but no web3 yet"
		}
	}

  render() {
    return (
      <div className="App">
        <p>This is a test!</p>
				<p>{this.state.message}</p>
				<RouteTesting />
      </div>
    );
  }
}

export default App;
