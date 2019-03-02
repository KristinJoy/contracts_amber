import React, { Component } from 'react';
import './App.css';


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
      </div>
    );
  }
}

export default App;
