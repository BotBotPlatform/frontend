import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import '../assets/register.css';


export class RegisterSetup extends Component {
	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='33' />

			    <div id="registration">
				    <ul className="registration-setup">
				    	<li>1. Go to Facebook</li>
				    	<li>2. Enter xyz.com as your callback URL</li>
				    	<li>3. Click Generate Access Token</li>
				    </ul>
				</div>

			  </div>
		);
	}
}

export default RegisterSetup;