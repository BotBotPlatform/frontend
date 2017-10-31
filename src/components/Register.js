import React, { Component } from 'react';
import '../assets/register.css';
import { connect } from 'react-redux';
import { registerAccessToken } from '../actions/users';
import { withRouter} from 'react-router-dom';

import apiService from '../actions/index.js';
import RegisterUser from './RegisterUser';
import RegisterSetup from './RegisterSetup';
import RegisterPageAccessToken from './RegisterPageAccessToken';

export class Register extends Component {
	constructor (props) {
        super(props);
        console.log(this.props.access);
        console.log(this.props.registered);
    };

	render () {
		return (
			<Registration isRegistered={this.props.registered} hasAccessToken={this.props.access} />
		);
	}
}

function Registration(props) {
    	const isRegistered = props.isRegistered;
    	const hasAccessToken = props.hasAccessToken;

    	if (!isRegistered) {
    		return <RegisterUser />;
    	} else if (isRegistered && !hasAccessToken) {
    		return <RegisterSetup />;
    	} else {
    		return <RegisterUser />;
    	}
}



function mapStateToProps (state) {
    return {
        registered: state.user.registered,
        access: state.user.access,
        authenticated: state.user.authenticated
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	registerAccessToken: (token) => {
            dispatch(registerAccessToken(token));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));