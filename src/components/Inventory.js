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
        this.state = {
            botStatus: 'loading',
            shopName: 'Etsy Shop Name'
        }
        
    }

	handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
		this.props.history.push('/login');
	}

	componentWillMount() {
        apiService('bot', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                    if(json.bot) {
                        if (json.bot['deploy_status']) this.setState({botStatus: json.bot['deploy_status']});
                    } else {
                        if (json.bot['deploy_status']) this.setState({botStatus: 'no_bot_exists'});
                    }
                }
        })

        apiService('shop/name', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                if (json.message === 'success') {
                    this.setState({shopName: json['shop']});
                }
        })

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
        var shop = data.target.shop.value;
    	form.append('shop', shop);
    	return apiService('shop/set', {
    		method: 'POST',
    		body: form
    	}).then((res) => res.json())
    		.then((json) => {
    			if (json.message == 'success') {
    				this.setState({shopName: shop});
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
						  <span className="url-root">http://etsy.com/shop/</span><input className="url-input" type="text" name="shop" placeholder={this.state.shopName} /><br/>
						  <input className="submit-button" type="submit" value="Save URL" />
						</form>
			       	</div>


	                <button onClick={() => this.toggleInventory(0)}>Disable Inventory</button><br/>
	                </div>
	                </div>
                </div>
                <ul id="navigation">
                    <li><a href="./dashboard"><FontAwesome className='back-button' name='arrow-left' /></a></li>
                    <li><a href="#" onClick={this.handleLogout}><FontAwesome className='logout-button' name='sign-out' /></a></li>
                </ul>
                <div title={this.state.botStatus} id="status">
                    <FontAwesome className={this.state.botStatus} name='circle' />
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