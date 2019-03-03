import React, { Component } from 'react';

// Import widgets being used in this component

import SideBar from "./components/SideBar.js"


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
