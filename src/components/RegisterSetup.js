import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import '../assets/register.css';
import RegisterPageAccessToken from './RegisterPageAccessToken';
import apiService from '../actions/index.js';


export class RegisterSetup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasPromptedSetup: false,
			verificationToken: 'loading',
			webhookURL: 'loading'
		};
	}

	componentWillMount() {
		var that = this;
		setTimeout(function() {
			apiService('user/token', { method: 'GET' })
	    	.then((res) => res.json())
	        	.then((json) => { 
	        		if (json['verification_token']) { 
	        			that.setState({verificationToken: json['verification_token']});
	        		}
	        	});

	        apiService('bot', { method: 'GET' })
	    	.then((res) => res.json())
	        	.then((json) => { 
	        		if (json['bot']) {
	        			console.log(json['bot']);
	        			var botURL = 'https://botbot.jakebrabec.me/api/facebook/' + json['bot']['uuid'];
	        			that.setState({webhookURL: botURL});
	        		} else {
	        			apiService('bot', { method: 'POST' })
				    	.then((res) => res.json())
				        	.then((json) => { 
				        		if (json['message'] === 'success') {
				        			var botURL = 'https://botbot.jakebrabec.me/api/facebook/' + json['bot']['uuid'];
	        						that.setState({webhookURL: botURL});
				        		}
				        	});
	        		}
	        	});

	        }, 200);
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
			    	<div className="row">
			    		<h3>Setup Steps</h3>
					    <ul className="registration-setup">
					    	<li><mark className="num">1.</mark> Go to <a href="https://developers.facebook.com/docs/messenger-platform/">Facebook</a> and create a bot application for your Facebook page.</li>
					    	<li><mark className="num">2.</mark> Enter <mark className="info">{this.state.webhookURL}</mark> as your callback URL</li>
					    	<li><mark className="num">3.</mark> Set your verification token to <mark className="info">{this.state.verificationToken}</mark></li>
					    	<li><mark className="num">4.</mark> Click Generate Page Access Token</li>
					    </ul>
				    	<input onClick={this.handleSetup} className="setup-button" type="submit" value="Next" />
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