import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import '../assets/register.css';
import RegisterPageAccessToken from './RegisterPageAccessToken';



export class RegisterSetup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasPromptedSetup: false
		};
	}

	handleSetup = () => {
		this.setState({hasPromptedSetup: true})
	}

	render () {
		return (
			<div>
			<div className={(this.state.hasPromptedSetup) ? "hidden" : "setup"} style={{height: '100%'}}>
			    <ProgressBar progress='33' />

			    <div id="registration">
				    <ul className="registration-setup">
				    	<li>1. Go to <a href="https://developers.facebook.com/docs/messenger-platform/">Facebook</a> and create an application for your Facebook page.</li>
				    	<li>2. Enter botbotplatform.com/webhook as your callback URL</li>
				    	<li>3. Set your verification token to 'verify-token-sample'</li>
				    	<li>4. Click Generate Access Token</li>
				    </ul>
				    <div>
				     <input onClick={this.handleSetup} className="submit-button" type="submit" value="Next" />
				     </div>
				</div>
			  </div>

			  <div className={(!this.state.hasPromptedSetup) ? "hidden" : "pageaccess"}>
			  	<RegisterPageAccessToken />
			  </div>
			  </div>
		);
	}

}

export default RegisterSetup;