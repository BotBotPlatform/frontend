import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import '../assets/register.css';
import logo from '../assets/botbot-logo.png';
import { connect } from 'react-redux';
import { loginFromJWT } from '../actions/users';
import PasswordResetToken from './PasswordResetToken';
import apiService from '../actions/index.js';

export class PasswordReset extends Component {
	constructor (props) {
        super(props);
        this.state = { 
        	emailExists: false,
            authError:false
        };
    };

resetPass = (data) => {
    	data.preventDefault();
    	let form = new FormData();
    	form.append('email', data.target.email.value);
    	return apiService('user/reset', {
    		method: 'POST',
    		body: form
    	}).then((res) => res.json())
    		.then((json) => {
    			console.log(json);
    			if (json.message == 'success') {
					this.setState({emailExists:true});
    			}
                else{
					this.setState({authError:true});
				}
    		})
    }

	render () {
		if(!this.state.emailExists){
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
							  <input className="email-input" type="text" name="email" placeholder="Email" /><br/>
                              <ErrorMsg authError={this.state.authError} />
							  <input className="submit-button" type="submit" value="Send Verification Email" />
							</form>
				        </div>
                        <div className="register-navigation">
                        	<ul>
                        		<li><a href="./login">Already have an account?</a></li>
                        		<li><a href="./register">Need to Register?</a></li>
                        	</ul>
				        	
				        </div>
				    </div>
				</div>

			  </div>
		);
        } else{
            return <PasswordResetToken />;
        }
	}
}

function ErrorMsg(props){
	 if(props.authError){
		return <p>Invalid email</p>;
	}
	else 
		return <p></p>;
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);