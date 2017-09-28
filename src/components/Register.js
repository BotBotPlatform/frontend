import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import '../assets/register.css';
import logo from '../assets/botbot-logo.png'

const Register = () => (
  <div style={{height: '100%'}}>
    <ProgressBar progress='25' />

    <div id="registration">
	    <div className="row">
	    	<div className="logo">
	    		<img src={logo} alt="logo"/>
	    	</div>
	        <div className="registration-form">
	        	<form>
				  <input className="email-input" type="text" name="email" placeholder="Email" /><br/>
				  <input className="password-input" type="text" name="password" placeholder="Password" /><br/>
				  <input className="submit-button" type="submit" value="Register Now" />
				</form>
	        </div>
	    </div>
	</div>

  </div>
)

export default Register;