import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import '../assets/register.css';
import logo from '../assets/botbot-logo.png';
import { connect } from 'react-redux';
import { loginFromJWT } from '../actions/users';
import RegisterUser from './RegisterUser';
import RegisterSetup from './RegisterSetup';
import RegisterPageAccessToken from './RegisterPageAccessToken';

export class Register extends Component {
	constructor (props) {
        super(props);
        this.state = { 
        	isRegistered: false,
        	hasAccessToken: false,
        	promptedSetup: false
        };
    };

	render () {
		return (
			<Registration isRegistered={this.state.isRegistered} hasAccessToken={this.state.hasAccessToken} promptedSetup={this.state.promptedSetup}/>
		);
	}
}

function Registration(props) {
    	const isRegistered = props.isRegistered;
    	const hasAccessToken = props.hasAccessToken;
    	const hasBeenPrompted = props.promptedSetup;

    	if (!isRegistered) {
    		return <RegisterUser />;
    	} else if (isRegistered && hasBeenPrompted) {
    		return <RegisterPageAccessToken />;
    	} else if (isRegistered && !hasBeenPrompted) {
    		return <RegisterSetup />;
    	} else {
    		return <RegisterUser />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);