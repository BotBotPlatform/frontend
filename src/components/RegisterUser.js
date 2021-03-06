import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import '../assets/register.css';
import logo from '../assets/botbot-logo.png';
import apiService from '../actions/index.js';
import { loginFromJWT, registerUser, registerAccessToken } from '../actions/users';
import { withRouter} from 'react-router-dom';
import { setCookie } from '../utils/cookies';


export class RegisterUser extends Component {

	constructor (props) {
        super(props);
        this.state = { 
			authError:false,
			errors: null
		};
    }

    hasAccess() {
		var access = false;
	    apiService('user/token', { method: 'GET' })
	    	.then((res) => res.json())
	        	.then((json) => { if (json['facebook_token']) { console.log('here'); this.props.onRegisterAccess(); }});
	}

	handleRegister = (data) => {
    	data.preventDefault();
    	let form = new FormData();
    	form.append('email', data.target.email.value);
    	form.append('password', data.target.password.value); 
    	return apiService('user/register', {
    		method: 'POST',
    		body: form
    	}).then((res) => res.json())
    		.then((json) => {
    			if (json.message == 'success') {
    				this.props.registerUser(json.token);
    			}
				else{
					this.setState({ authError:true, errors:json.errors });
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
							  <ErrorMsg authError={this.state.authError} errors={this.state.errors}/>
							  <input className="submit-button" type="submit" value="Register Now" />
							</form>
				        </div>
				        <div className="register-navigation">
				        	<ul>
				        		<li><a href="./login">Already have an account?</a></li>
				        	</ul>
				        </div>
				    </div>
				</div>


			  </div>
		);
	}
}

function ErrorMsg(props){
	 if(props.authError){
	 	var err = '';
	 	for (var e in props.errors) {
	 		err += props.errors[e] + '\n';
	 	}
		return <p>{err}</p>;
	}
	else 
		return <p></p>;
}

function mapStateToProps (state) {
    return {
        registered: state.user.registered,
        access: state.user.access,
        authenticated: state.user.authenticated
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	registerUser: (token) => {
	        dispatch(registerUser(token));
	},
	onRegisterAccess() {
		dispatch(registerAccessToken());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterUser));