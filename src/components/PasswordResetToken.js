import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import { connect } from 'react-redux';
import { loginFromJWT } from '../actions/users';
import '../assets/register.css';
import apiService from '../actions/index.js';
import logo from '../assets/botbot-logo.png';

export class PasswordResetUser extends Component {

	constructor (props) {
        super(props);
        this.state = { redirectToReferrer: false };
    }

    resetPass = (data) => {
    	data.preventDefault();
    	let form = new FormData();
    	form.append('email', data.target.token.value);
        form.append('password', data.target.password.value);
    	return apiService('user/reset/store', {
    		method: 'POST',
    		body: form
    	}).then((res) => res.json())
    		.then((json) => {
    			console.log(json);
    			if (json.message == 'success') {
					this.props.history.push('/login');
    			}
    		})
    }

	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='100' />

			    <div id="login">
				    <div className="row">
				    	<div className="logo">
				    		<img src={logo} alt="logo"/>
				    	</div>
				        <div className="password-reset-form">
				        	<form onSubmit={this.resetPass}>
							  <input className="email-input" type="text" name="email" placeholder="Verification Token" /><br/>
                              <input className="password-input" type="text" name="password" placeholder="New Password" /><br/>
							  <input className="submit-button" type="submit" value="Reset Password" />
							</form>
				        </div>
                        <div className="login-navigation">
				        	<a href="./login">Already have an account?</a>
				        </div>
                        <div className="register-navigation">
				        	<a href="./register">Need to Register?</a>
				        </div>
				    </div>
				</div>

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
	loginFromJWT: (token) => {
	        dispatch(loginFromJWT(token));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetUser);