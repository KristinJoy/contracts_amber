import React, { Component } from 'react';

// Import widgets being used in this component
import NumberWidgetContainer from './components/NumberWidgetContainer.js';
import ListWidgetContainer from './components/ListWidgetContainer.js';
import Widget from "./components/Widget";


// Add in styles
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Widget />
            </div>
        );
    }
}

export default App;
