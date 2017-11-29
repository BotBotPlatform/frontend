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
        this.state = {
        	botStatus: 'loading'
        }
        
    }

    componentWillMount() {
    	apiService('bot', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
					if(json.bot) {
						if (json.bot['deploy_status']) this.setState({botStatus: json.bot['deploy_status']});
					} else {
						if (json.bot['deploy_status']) this.setState({botStatus: 'no_bot_exists'});
					}
                }
        })

    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push('/login');
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
                <ul id="navigation">
                    <li><a href="./dashboard"><FontAwesome className='back-button' name='arrow-left' /></a></li>
                    <li><a href="#" onClick={this.handleLogout}><FontAwesome className='logout-button' name='sign-out' /></a></li>
                </ul>
                <div title={this.state.botStatus} id="status">
                    <FontAwesome className={this.state.botStatus} name='circle' />
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