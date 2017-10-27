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
        this.state = { 
        	hasAccessToken: false
        };
    };

    componentWillMount() {
        apiService('user/token', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json['facebook_token']) {
                    this.setState({ hasAccessToken: true })
                }
        })
    }

	render () {
		return (
			<Registration isRegistered={this.props.registered} hasAccessToken={this.state.hasAccessToken} />
		);
	}
}

function Registration(props) {
    	const isRegistered = props.isRegistered;
    	const hasAccessToken = props.hasAccessToken;
        console.log(isRegistered);
        console.log(hasAccessToken);

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
        access: state.user.access
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	registerAccessToken: (token) => {
            dispatch(registerAccessToken(token));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));