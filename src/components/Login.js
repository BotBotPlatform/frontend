import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import { connect } from 'react-redux';
import { loginFromJWT } from '../actions/users';
import '../assets/register.css';
import apiService from '../actions/index.js';
import logo from '../assets/botbot-logo.png';
import { withRouter} from 'react-router-dom';

export class Login extends Component {

	constructor (props) {
        super(props);
        this.state = {
			redirectToReferrer: false,
			authError:false,
			errors: null
		};
    }

    handleLogin = (data) => {
    	data.preventDefault();
    	let form = new FormData();
    	form.append('email', data.target.email.value);
    	form.append('password', data.target.password.value);
    	return apiService('user/auth', {
    		method: 'POST',
    		body: form
    	}).then((res) => res.json())
    		.then((json) => {
    			console.log(json);
    			if (json.message == 'success') {
						this.props.onLogin(json.token);
    			} else {
						this.setState({authError:true, errors:json.errors});
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
				        <div className="login-form">
				        	<form onSubmit={this.handleLogin}>
							  <input className="email-input" type="text" name="email" placeholder="Email" /><br/>
							  <input className="password-input" type="password" name="password" placeholder="Password" /><br/>
							  <ErrorMsg authError={this.state.authError} errors={this.state.errors}/>
							  <input className="submit-button" type="submit" value="Login" />
							</form>
				        </div>
				        <div className="register-navigation">
				        <ul>
				        	<li><a href="./passreset">Forgot your password?</a></li>
				        	<li><a href="./register">Need to Register?</a></li>
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
        authenticated: state.user.authenicated
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onLogin: (token) => {
    dispatch(loginFromJWT(token));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
