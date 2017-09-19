import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProgressBar from './components/ProgressBar'

class App extends Component {
  render() {
    return (
        <div className="App">
          <ProgressBar />
        </div>
    );
  }
}

export default App;
