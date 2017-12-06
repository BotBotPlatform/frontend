import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import '../assets/dashboard.css';
import FontAwesome from 'react-fontawesome';
import '../assets/fa.css';

export class Support extends Component {

	constructor (props) {
        super(props);
        this.state = {
        	tickets: []
        }
    }

	handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
		this.props.history.push('/login');
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
		
		this.getTickets();
        this.toggleSupport(1);
	}
 
 	getTickets() {
        apiService('tickets', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                    if (json.tickets) {
                        for (var i in json.tickets) {
                            var a = {};
                            a.mid = json.tickets[i]["messenger_userid"];
                            a.id = json.tickets[i]["id"];
                            a.name = json.tickets[i]["name"];
                            a.msg = json.tickets[i]["message"];
                            a.url = 'https://www.messenger.com/t/' + json.tickets[i]["messenger_userid"].toString();
                            this.setState({ tickets: this.state.tickets.concat([a]) });
                        }
                    }
                }
        })
    }

    toggleSupport(enabled) {
        let form = new FormData();
        form.append('feature_name', 'customer_support_enabled');
        form.append('enabled', enabled);

        apiService('bot/toggleFeature', {
            method: 'POST',
            body: form
        }).then((res) => {
            if (!enabled) this.props.history.push('/dashboard');
        });
    }

    resolveSupport(id) {
    	let uri = 'tickets/' + id + '/resolve';

        apiService(uri, {
            method: 'POST'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                    var newTickets = this.state.tickets.filter(function(el) {
                        return el.id !== id;
                    });
                    this.setState({tickets: newTickets})
                }
        })
    }

	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='100' />
                <div id="dashboard">
                    <div className="row">
                    	<h3>Support</h3>

                    <ul className={(this.state.tickets.length > 0) ? "current-tickets" : "hidden"}>
                        {this.state.tickets.map(function(obj, index){
                            return (
                                <li key={obj.id}><FontAwesome onClick={() => this.resolveSupport(obj.id)} className="resolve" name="times" /> {obj.name}: {obj.msg}</li>
                            );
                        }, this)}
                    </ul>
                    <h5 className={(this.state.tickets.length <= 0) ? "current-tickets" : "hidden"}>No support tickets submitted, yet</h5>


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

export default connect(mapStateToProps, mapDispatchToProps)(Support);