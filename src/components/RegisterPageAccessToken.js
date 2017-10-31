import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import '../assets/register.css';
import apiService from '../actions/index.js';
import { Redirect } from 'react-router-dom';
import { loadCookie } from '../utils/cookies';
import { connect } from 'react-redux';
import { loginFromJWT, registerAccessToken } from '../actions/users';

export class RegisterPageAccessToken extends Component {

	constructor(props) {
    	super(props);
	    this.state = {
	      accessValue: ''
	    };
  	}

	handlePageAccessToken = () => {
    	let form = new FormData();
    	form.append('facebook_token', this.state.accessValue);
    	return apiService('user/token', {
    		method: 'POST',
    		body: form
    	}).then((res) => res.json())
    		.then((json) => {
    			console.log(json);
    			if (json.message == 'success') {
    				this.props.registerAccessToken(); 
    				this.props.loginFromJWT(loadCookie('token')); 
    			} 
    		})

	}

	updateInputValue = (e) => {
	    this.setState({
	      accessValue: e.target.value
	    });
  	}

	render () {
		return (
			<div style={{height: '100%'}}>
			    	<ProgressBar progress='66' />
			    	
			    <div id="registration">
			    	<div className="row">
				    	<h3>Enter page access token</h3><br/><br/>
					    <input className="setup-input" value={this.state.accessValue} onChange={e => this.updateInputValue(e)}  placeholder="Page Access Token" />
					    <div>
					    	<input onClick={this.handlePageAccessToken} className="setup-button" type="submit" value="Next" />
					    </div>
					</div>
					</div>

			  </div>
		);
	}
}


function mapStateToProps (state) {
    return {
        authenticated: state.user.authenicated,
        access: state.user.access
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	loginFromJWT: (token) => {
	        dispatch(loginFromJWT(token));
	},
	registerAccessToken() {
            dispatch(registerAccessToken());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageAccessToken);
