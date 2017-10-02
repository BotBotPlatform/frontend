import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import '../assets/register.css';


export class RegisterPageAccessToken extends Component {
	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='66' />

			    <div id="registration">
				    <input placeholder="Page Access Token" />
				</div>

			  </div>
		);
	}
}

export default RegisterPageAccessToken;