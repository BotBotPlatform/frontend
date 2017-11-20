import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import '../assets/dashboard.css';


export class Support extends Component {

	constructor (props) {
        super(props);
        
    }

	handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
		this.props.history.push('/login');
	}

	componentWillMount() {
		
        this.toggleFeedback(1);
	}
 

    toggleFeedback(enabled) {
        let form = new FormData();
        form.append('feature_name', 'customer_support_enabled');
        form.append('enabled', enabled);

        apiService('bot/toggleFeature', {
            method: 'POST',
            body: form
        }).then((res) => {
            if (!enabled) this.props.history.push('/dashboard');
        });
    }

	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='100' />
                <div id="dashboard">
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(Support);