import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import '../assets/App.css';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated
        ? (<Component {...props}/>)
        : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

const UserRoute = withRouter(connect((state) => ({isAuthenticated: false}))(PrivateRoute));

const App = () => (
  <div>
      <UserRoute exact path="/" component={Dashboard}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
  </div>
)

export default App;
