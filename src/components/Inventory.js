import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import '../assets/dashboard.css';


export class Inventory extends Component {

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
        form.append('feature_name', 'shopify_enabled');
        form.append('enabled', enabled);

        apiService('bot/toggleFeature', {
            method: 'POST',
            body: form
        }).then((res) => {
            if (!enabled) this.props.history.push('/dashboard');
        });
    }

    handleInventoryURL = (data) => {
    	data.preventDefault();
    	let form = new FormData();
    	form.append('shop', data.target.shop.value);
    	return apiService('shop/set', {
    		method: 'POST',
    		body: form
    	}).then((res) => res.json())
    		.then((json) => {
    			if (json.message == 'success') {
    				console.log('WOOHOO!');
    			}
    		})
    }

	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='100' />

                <div className="login-form">
		        	<form onSubmit={this.handleInventoryURL}>
					  http://etsy.com/shop/<input className="url-input" type="text" name="shop" placeholder="Etsy Shop Name" /><br/>
					  <input className="submit-button" type="submit" value="Save URL" />
					</form>
		       	</div>

                <button onClick={() => this.toggleFeedback(0)}>Disable Feedback</button><br/>
                <a href="./dashboard">Dashboard</a><br/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);