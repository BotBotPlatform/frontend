import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import '../assets/App.css';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Feedback from './Feedback';
import Support from './Support';
import PassReset from './PasswordReset';
import Appointments from './Appointments';
import { connect } from 'react-redux';
import AdminPanel from './AdminPanel';

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

const SpecialRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={props => (
        !isAuthenticated ? (<Component {...props}/>) : (
            <Redirect to={{
                pathname: '/dashboard',
                state: { from: props.location }
            }}/>
        )
    )}/>
);


const UserRoute = withRouter(connect((state) => ({isAuthenticated: state.user.authenticated }))(PrivateRoute));
const AuthRoute = withRouter(connect((state) => ({isAuthenticated: state.user.authenticated && state.user.access }))(PublicRoute));
const AdminRoute = withRouter(connect((state) => ({isAuthenticated: state.user.authenticated}))(SpecialRoute));


const App = () => (
  <div>
    <Switch>
      <UserRoute exact path="/" component={Dashboard}/>
      <AuthRoute path="/passreset" component={PassReset}/>
      <AuthRoute path="/login" component={Login}/>
      <AuthRoute path="/register" component={Register}/>
      <AdminRoute path="/admin" component={AdminPanel}/>
      <UserRoute path="/dashboard/feedback" component={Feedback} />
      <UserRoute path="/dashboard/support" component={Support} />
      <UserRoute path="/dashboard/appointments" component={Appointments} />
      <Redirect from="*" to="/"/>
    </Switch>
  </div>
)

export default App;
