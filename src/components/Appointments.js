import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import FontAwesome from 'react-fontawesome';
import '../assets/fa.css';
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
            url: '',
            botStatus: 'loading'
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
                    if(json.bot) {
                        if (json.bot['deploy_status']) this.setState({botStatus: json.bot['deploy_status']});
                    } else {
                        if (json.bot['deploy_status']) this.setState({botStatus: 'no_bot_exists'});
                    }

                }
        })

        this.toggleAppointments(1);
        this.getAppointments();
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push('/login');
    }

    getAppointments() {
        apiService('appointment', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                if (json.message === 'success') {
                    if (json.appointments) {
                        for (var i in json.appointments) {
                            var a = {};
                            a.id = json.appointments[i]["id"];
                            var c = new Date(json.appointments[i]["timestamp"]);
                            c.setDate(c.getDate());
                            var d= this.getDateString(c) + c.getHours() + ':00';
                            console.log(d);
                            var time = this.getFormatDateString(d);
                            a.time = time;
                            if (a.time) {
                                this.setState({ appointments: this.state.appointments.concat([a]) });

                            }
                        }
                    }
                }
        })
    }

    getDateString = (date) => {
      let mm = (date.getMonth() + 1).toString();
      mm = mm.length < 2 ? '0' + mm : mm;

      let dd = (date.getDate() + 1).toString();
      dd = dd.length < 2 ? '0' + dd : dd;

      let yyyy = date.getFullYear().toString();

      return mm + '/' + dd + '/' + yyyy + ':';
    }

    getFormatDateString = (str) => {
      var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];

      var day = str.substr(0, str.indexOf(':'));
      var time = str.substr(str.indexOf(':')+1, str.length - 1);


      var d = new Date(day);
      d.setDate(d.getDate() - 2);
      var t = parseInt(time.substr(0, time.indexOf(':')));
      var pm = false;
      pm = (t > 12) ? true : false;
      t = (t > 12) ? (t-12) : t;

      var dateString = monthNames[d.getMonth()] + ' ' + d.getDay() + ', ' + d.getFullYear() + ' at ' + t + (pm ? 'pm' : 'am');
      
      return dateString;
    }

    getTime = (str) => {
        if ( !/:/.test( str ) ) { str += ':00'; }
        return str.replace(/^\d{1}:/, '0$&').replace(/:\d{1}$/, '$&0' );
    }

    getHours = (str) => {
        return str.split(':')[0];
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

    toggleAppointments(enabled) {
        let form = new FormData();
        form.append('feature_name', 'reservations_enabled');
        form.append('enabled', enabled);

        apiService('bot/toggleFeature', {
            method: 'POST',
            body: form
        }).then((res) => {
            if (!enabled) this.props.history.push('/dashboard');
        });
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

                     <h4>Scheduled</h4>
                    <ul className={(this.state.appointments.length > 0) ? "current-appointments" : "hidden"}>
                        {this.state.appointments.map(function(obj, index){
                            return (
                                <li key={obj.id}>{obj.time}</li>
                            );
                        }, this)}
                    </ul>

                     <button className="exportCalendar" onClick={() => this.getCalendarExport()} >Get Exported Calendar</button><br/>

			 
                     <button onClick={() => this.toggleAppointments(0)}>Disable Appointments</button><br/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);