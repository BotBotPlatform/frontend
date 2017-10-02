import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import logo from '../assets/botbot-logo.png';


export class Dashboard extends Component {
	render () {
		return (
			<div>
    			<ProgressBar progress='80' />
    			Dashboard
  			</div>
		);
	}
}

export default Dashboard;