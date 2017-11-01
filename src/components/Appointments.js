import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import '../assets/dashboard.css';


export class Feedback extends Component {

	constructor (props) {
        super(props);
        this.state = {
            startTime: '00:00',
            endTime: '00:00',
            appointments: [],
            changePending: false,
            uuid: '',
            url: ''
        }
    }

    componentWillMount() {
        apiService('appointment/hours', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                    var min = this.getTime(json['min_hour'].toString());
                    var max = this.getTime(json['max_hour'].toString());
                    this.setState({startTime: min});
                    this.setState({endTime: max});
                }
        })

        apiService('bot', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                    this.setState({uuid: json['bot']['uuid'].toString()});
                    this.getCalendar();

                }
        })

    }

    getTime = (str) => {
        if ( !/:/.test( str ) ) { str += ':00'; }
        return str.replace(/^\d{1}:/, '0$&').replace(/:\d{1}$/, '$&0' );
    }

    getHours = (str) => {
        return str.split(':')[0];
    }

    getDateString = (date, hours) => {
        let mm = (date.getMonth() + 1).toString();
        mm = mm.length < 2 ? '0' + mm : mm;

        let dd = date.getDate().toString();
        dd = dd.length < 2 ? '0' + dd : dd;

        let yyyy = date.getFullYear().toString();

        let hh = hours;
        hh = hh.length < 2 ? '0' + hh : hh;

        return mm + '/' + dd + '/' + yyyy + ':' + hh + ':00';
    }

    getDate = (str) => {
        return this.getDateString(new Date(), this.getHours(str));
    }

    changeStart = (e) => {
        this.setState({startTime: e.target.value});
        this.setState({changePending: true});
    }

    changeEnd = (e) => {
        this.setState({endTime: e.target.value});
        this.setState({changePending: true});
    }

    changeAvailability = (pending) => {
        if (!pending) return;
        var newStart = parseInt(this.getHours(this.state.startTime));
        var newEnd = parseInt(this.getHours(this.state.endTime));

        let form = new FormData();
        form.append('min_hour', newStart);
        form.append('max_hour', newEnd);

        apiService('appointment/hours', {
            method: 'POST',
            body: form
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                    this.setState({changePending: false});
                }
        })
    }

    getCalendar() {
        let uri = 'appointment/calendar/' + this.state.uuid;
        apiService(uri, {
            method: 'GET'
        }).then((res) => this.setState({url: res.url})) 
    }

    getCalendarExport() {
        window.open(this.state.url);
    }

	render () {
		return (
			<div style={{height: '100%'}}>
			    <ProgressBar progress='100' />
                <div id="dashboard">
                    <div className="row">
			         <h3>Appointments</h3>
                     <span className="apt-prompt">Appointment Scheduling Availability:</span> <input type="time" className="start" onChange={this.changeStart.bind(this)} value={this.state.startTime}/> <span className="apt-prompt">to </span>  
                     <input type="time" className="end" onChange={this.changeEnd.bind(this)} value={this.state.endTime}/>

                     <input type="submit" className={this.state.changePending ? "submitTime" : "inactiveSubmitTime"} value="Change Availability" onClick={() =>this.changeAvailability(this.state.changePending)} /><br/>

                     <button className="exportCalendar" onClick={() => this.getCalendarExport()} >Get Exported Calendar</button><br/>

			 

                <a href="./dashboard">Dashboard</a><br/>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);