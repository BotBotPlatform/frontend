import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import { connect } from 'react-redux';
import { loginFromJWT } from '../actions/users';
import '../assets/register.css';
import logo from '../assets/botbot-logo.png';

export class Login extends Component {
	constructor (props) {
        super(props);
        this.state = { redirectToReferrer: false };
    }

	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='25' />

			    <div id="login">
				    <div className="row">
				    	<div className="logo">
				    		<img src={logo} alt="logo"/>
				    	</div>
				        <div className="login-form">
				        	<form>
							  <input className="email-input" type="text" name="email" placeholder="Email" /><br/>
							  <input className="password-input" type="text" name="password" placeholder="Password" /><br/>
							  <input className="submit-button" type="submit" value="Login" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);