import React, { Component } from 'react';
import '../assets/progressbar.css';

export class ProgressBar extends Component {
	constructor (props) {
		super(props);

		this.state = {
			progress: this.props.progress
		};
	}
	updateProgress(p) {
		this.setState({progress: p});
	}
	render () {
		return (
			<div className="progress-container">
				<div className="progress" style={{width: this.state.progress.toString() + '%'}}></div>
			</div>
		);
	}
}

export default ProgressBar;