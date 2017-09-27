import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';


const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={ Login }/>
      <Route path='/register' component={ Register }/>
    </Switch>
  </div>
)

export default App;
