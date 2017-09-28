import React, { Component } from 'react';
import ProgressBar from './ProgressBar';

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