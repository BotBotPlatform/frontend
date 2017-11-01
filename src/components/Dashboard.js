import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';


export class Dashboard extends Component {

	constructor (props) {
        super(props);
    }

    componentWillMount() {
    	this.getActiveFeatures();
    	apiService('bot', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                	console.log(json);
                }
        })

    }

    getActiveFeatures() {

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
			<div style={{height: '100%'}}>
    			<ProgressBar progress='100' />
    			<div id="features">
    				<h3>Dashboard</h3><br/>
    				<div id="feature-set">
    					<div className="feature active"><a href="./dashboard/feedback">Feedback</a></div>
    					<div className="feature"><a href="./dashboard/appointments">Appointments</a></div>
    					<div className="feature">Inventory</div>
    					<div className="feature">Support</div>
    				</div>
					
					<button onClick={this.createBot}>Create bot</button>
					<button onClick={this.botInfo}>Get Bot Info</button>
					<button onClick={this.deleteBot}>Delete bot</button><br/>
	    			<a href="#" onClick={this.handleLogout}>Logout</a><br/>
		    		</div>	
  			</div>
		);
	}
}

function mapStateToProps (state) {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	logoutUser: () => {
	        dispatch(logoutUser());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);