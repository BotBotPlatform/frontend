import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import '../assets/register.css';
import logo from '../assets/botbot-logo.png';
import apiService from '../actions/index.js';
import { loginFromJWT } from '../actions/users';

export class RegisterUser extends Component {

	handleRegister = (data) => {
    	data.preventDefault();
    	console.log(data);
    	let form = new FormData();
    	form.append('email', data.target.email.value);
    	form.append('password', data.target.password.value); 
    	return apiService('user/register', {
    		method: 'POST',
    		body: form
    	}).then((res) => res.json())
    		.then((json) => {
    			console.log(json);
    			if (json.message == 'success') {
					this.props.loginFromJWT(json.token);
    			}
    		})
    }

	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='100' />

			     <div id="registration">
				    <div className="row">
				    	<div className="logo">
				    		<img src={logo} alt="logo"/>
				    	</div>
				        <div className="registration-form">
				        	<form onSubmit={this.handleRegister}>
							  <input className="email-input" type="text" name="email" placeholder="Email" /><br/>
							  <input className="password-input" type="password" name="password" placeholder="Password" /><br/>
							  <input className="verify-password-input" type="password" name="password-verify" placeholder="Verify Password" /><br/>
							  <input className="submit-button" type="submit" value="Register Now" />
							</form>
				        </div>
				        <div className="login-navigation">
				        	<a href="./login">Already have an account?</a>
				        </div>
				    </div>
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
	loginFromJWT: (token) => {
	        dispatch(loginFromJWT(token));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);