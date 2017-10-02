import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import '../assets/App.css';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (<Component {...props}/>) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={props => (
        !isAuthenticated ? (<Component {...props}/>) : (
            <Redirect to={{
                pathname: '/dashboard',
                state: { from: props.location }
            }}/>
        )
    )}/>
);


const UserRoute = withRouter(connect((state) => ({isAuthenticated: state.user.authenticated}))(PrivateRoute));
const AuthRoute = withRouter(connect((state) => ({isAuthenticated: state.user.authenticated}))(PublicRoute));

const App = () => (
  <div>
      <UserRoute exact path="/" component={Dashboard}/>
      <AuthRoute path='/login' component={Login}/>
      <AuthRoute path='/register' component={Register}/>
      <Route path='/dashboard' component={Dashboard}/>
  </div>
)

export default App;
