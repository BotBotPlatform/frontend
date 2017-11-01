import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';


export class Dashboard extends Component {

	constructor (props) {
        super(props);
        this.state = {
        	feedback: false,
        	appointments: false,
        	inventory: false,
        	support: false
        } 
    }

    componentWillMount() {
    	this.getActiveFeatures();
    	apiService('bot', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                	if (json.bot['feedback_enabled']) this.setState({feedback: true});
                	if (json.bot['reservations_enabled']) this.setState({appointments: true});
                	if (json.bot['shopify_enabled']) this.setState({inventory: true});
                	if (json.bot['customer_support_enabled']) this.setState({support: true});
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

	spinUpBot = (b) => {
		b.preventDefault();
		return apiService('bot/spinUp',{
			method:'POST'
		})
	}

	spinUpBot = (b) => {
		b.preventDefault();
		return apiService('bot/spinUp',{
			method:'POST'
		})
	}

	restartBot = (b) => {
		b.preventDefault();
		return apiService('bot/restartBot',{
			method:'POST'
		})
	}

	shutdownBot = (b) => {
		b.preventDefault();
		return apiService('bot/shutDown',{
			method:'POST'
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
    					<div className={this.state.feedback ? 'feature active' : 'feature inactive'}><a href="./dashboard/feedback">Feedback</a></div>
    					<div className={this.state.appointments ? 'feature active' : 'feature inactive'}><a href="./dashboard/appointments">Appointments</a></div>
    					<div className={this.state.inventory ? 'feature active' : 'feature inactive'}>Inventory</div>
    					<div className={this.state.support ? 'feature active' : 'feature inactive'}>Support</div>
    				</div>
					
					<button onClick={this.createBot}>Create bot</button>
					<button onClick={this.botInfo}>Get Bot Info</button>
					<button onClick={this.deleteBot}>Delete bot</button>
					<button onClick={this.spinUpBot}>Start bot</button>
					<button onClick={this.resetBot}>Restart bot</button>
					<button onClick={this.shutdownBot}>Shutdown bot</button><br/>
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