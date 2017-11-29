import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import FontAwesome from 'react-fontawesome';
import '../assets/fa.css';

export class Dashboard extends Component {

	constructor (props) {
        super(props);
        this.state = {
        	feedback: false,
        	appointments: false,
        	inventory: false,
        	support: false,
			botStatus: 'loading',
        }
    }

    componentWillMount() {
    	this.getActiveFeatures();
    	apiService('bot', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
									if(json.bot) {
										if (json.bot['feedback_enabled']) this.setState({feedback: true});
	                	if (json.bot['reservations_enabled']) this.setState({appointments: true});
	                	if (json.bot['shopify_enabled']) this.setState({inventory: true});
										if (json.bot['customer_support_enabled']) this.setState({support: true});
										if (json.bot['deploy_status']) this.setState({botStatus: json.bot['deploy_status']});
									} else {
										if (json.bot['deploy_status']) this.setState({botStatus: 'no_bot_exists'});
									}

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

	

	render () {
		return (
			<div style={{height: '100%'}}>
    			<ProgressBar progress='100' />
    			<div id="features">
    				<h3>Dashboard</h3><br/>
    				<div id="feature-set">
    					<div className={this.state.feedback ? 'feature active' : 'feature inactive'}><a href="./dashboard/feedback">Feedback</a></div>
    					<div className={this.state.appointments ? 'feature active' : 'feature inactive'}><a href="./dashboard/appointments">Appointments</a></div>
    					<div className={this.state.inventory ? 'feature active' : 'feature inactive'}><a href="./dashboard/inventory">Inventory</a></div>
    					<div className={this.state.support ? 'feature active' : 'feature inactive'}><a href="./dashboard/support">Support</a></div>
    				</div>

					
					<p className="status-text">Bot Health <div id="status" className={this.state.botStatus}></div></p>

	    			<a href="#" onClick={this.handleLogout}>Logout</a><br/>
		    		</div>
		    		<div id="navigation">
                		<a href="./dashboard/settings"><FontAwesome className='settings-button' name='cog' size='1x' /></a>
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
