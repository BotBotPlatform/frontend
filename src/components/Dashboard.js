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

	createBot = (b) => {
		b.preventDefault();
		return apiService('bot',{
			method: 'POST'
		})
	}

	botInfo = (b) => {
		b.preventDefault();
		return apiService('bot',{
			method: 'GET'
		})
	}

	deleteBot = (b) => {
		b.preventDefault();
		return apiService('bot',{
			method: 'DELETE'
		})
	}

	render () {
		return (
			<div>
    			<ProgressBar progress='100' />
    			Dashboard<br/><br/>
				<button onClick={this.createBot}>Create bot</button><br/>
				<button onClick={this.botInfo}>Get Bot Info</button><br/>
				<button onClick={this.deleteBot}>Delete bot</button><br/>
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