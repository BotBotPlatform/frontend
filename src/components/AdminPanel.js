import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import logo from '../assets/botbot-logo.png';
import { logoutUser } from '../actions/users';
import { requestBots, responseBots } from '../actions/admin.js';
import AdminBotCard from './AdminBotCard.js';

export class AdminPanel extends Component {

	constructor (props) {
        super(props);
    }


	render () {
		let botCardList = null;
		if(!!this.props.myBots) {
			botCardList = this.props.myBots.map((b) => {
				return (
					<div>
						<AdminBotCard bot={b} /> <hr/>
					</div>
				)
			})
		} else {
			botCardList = null;
		}

		return (
			<div>
        Admin Panel
				{ botCardList }
			</div>
		);
	}

	componentDidMount() {
		this.props.fetchBots();
	}
}



function mapStateToProps (state) {
    return {
			myBots: state.admin.bots
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchBots: () => {
		dispatch(requestBots());

		return apiService('bot/admin', {
			method: 'GET',
		}).then((res) => res.json())
			.then((json) => {
				dispatch(responseBots(json));
			})
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
