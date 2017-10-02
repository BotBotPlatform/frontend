import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import logo from '../assets/botbot-logo.png';
import { logoutUser } from '../actions/users';


export class Dashboard extends Component {

	constructor (props) {
        super(props);
    }

	handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
		this.props.history.push('/login');
	}

	render () {
		return (
			<div>
    			<ProgressBar progress='100' />
    			Dashboard

    			<a href="#" onClick={this.handleLogout}>Logout</a>
  			</div>
		);
	}
}

function mapStateToProps (state) {
    return {
        authenticated: state.user.authenicated
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	logoutUser: () => {
	        dispatch(logoutUser());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);