import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import FontAwesome from 'react-fontawesome';
import '../assets/fa.css';
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
        this.toggleInventory(1);
	}
 

    toggleInventory(enabled) {
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

			    <div id="dashboard">
			    <div className="row">
			    <h3>Inventory</h3>
			    <div className="inventory">
	                <div className="inventory-form">
			        	<form onSubmit={this.handleInventoryURL}>
						  <span className="url-root">http://etsy.com/shop/</span><input className="url-input" type="text" name="shop" placeholder="Etsy Shop Name" /><br/>
						  <input className="submit-button" type="submit" value="Save URL" />
						</form>
			       	</div>


	                <button onClick={() => this.toggleInventory(0)}>Disable Inventory</button><br/>
	                </div>
	                </div>
                </div>
                <div id="navigation">
                	<a href="./dashboard"><FontAwesome className='back-button' name='arrow-left' size='1x' /></a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);