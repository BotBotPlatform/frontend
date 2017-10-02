import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import '../assets/register.css';
import logo from '../assets/botbot-logo.png';
import { connect } from 'react-redux';
import { loginFromJWT } from '../actions/users';

export class RegisterUser extends Component {
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
				        	<form>
							  <input className="email-input" type="text" name="email" placeholder="Email" /><br/>
							  <input className="password-input" type="text" name="password" placeholder="Password" /><br/>
							  <input className="submit-button" type="submit" value="Register Now" />
							</form>
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