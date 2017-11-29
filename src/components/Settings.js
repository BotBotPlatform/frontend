import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import FontAwesome from 'react-fontawesome';
import '../assets/fa.css';
import '../assets/settings.css';


export class Inventory extends Component {

	constructor (props) {
        super(props);
        
    }

    createBot = (b) => {
		b.preventDefault();
		return apiService('bot',{
			method: 'POST'
		})
	}

	botInfo = (b) => {
		b.preventDefault();
		return apiService('bot',{
			method: 'GET'
		}).then((res)=>res.json())
			.then((json) => {
				console.log(json)
			})
	}

	spinUpBot = (b) => {
		b.preventDefault();
		this.setState({botStatus: 'loading'});
		return apiService('bot/spinUp',{
			method:'POST'
		}).then((res)=>res.json())
			.then((json) => {
				setTimeout(() => {
					this.setState({botStatus: 'alive'});
				},2500);
			})
	}

	restartBot = (b) => {
		b.preventDefault();
		this.setState({botStatus: 'loading'});
		return apiService('bot/reloadBot',{
			method:'POST'
		}).then((res)=>res.json())
			.then((json) => {
				console.log(json)
				setTimeout(() => {
					this.setState({botStatus: 'alive'});
				},2000);
			})
	}

	shutdownBot = (b) => {
		b.preventDefault();
		this.setState({botStatus: 'loading'});
		return apiService('bot/shutDown',{
			method:'POST'
		}).then((res)=>res.json())
			.then((json) => {
				console.log(json)
				setTimeout(() => {
					this.setState({botStatus: 'offline'});
				},1500);
			})
	}

	deleteBot = (b) => {
		b.preventDefault();
		return apiService('bot',{
			method: 'DELETE'
		}).then((res)=>res.json())
			.then((json) => {
				console.log(json)
			})
	}

	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='100' />

			    <div id="settings">
			    	<div className="row">
			    		<h3>Bot Settings</h3>
			    		
			    		<ul className="settings-list">
			    			<li><button onClick={this.createBot}>Create bot</button></li>
			    			<li><button onClick={this.botInfo}>Get Bot Info</button></li>
			    			<li><button onClick={this.deleteBot}>Delete bot</button></li>
			    			<li><button onClick={this.spinUpBot}>Start bot</button></li>
			    			<li><button onClick={this.restartBot}>Restart bot</button></li>
			    			<li><button onClick={this.shutdownBot}>Shutdown bot</button></li>
			    		</ul>	
	                </div>
                </div>
                <div id="navigation">
                	<a href="./dashboard"><FontAwesome className='back-button' name='arrow-left' size='1x' /></a>
                </div>
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
	logoutUser: () => {
	        dispatch(logoutUser());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);