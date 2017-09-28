import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import { connect } from 'react-redux';
import { loginFromJWT } from '../actions/users';

export class Login extends Component {
	constructor (props) {
        super(props);
        this.state = { redirectToReferrer: false };
    }
    
	render () {
		return (
			<div>
			  <ProgressBar progress='80' />
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